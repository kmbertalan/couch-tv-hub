import { ref, computed } from "vue";
import { supabase } from "../supabaseClient";
import type { DBMediaRecord, Provider } from "../types";
import type { MediaRecord } from "../tmdb";
import { fetchProviders } from "../tmdbProviders";

export function useTitles() {
  const titles = ref<DBMediaRecord[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadTitles = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: supabaseError } = await supabase
        .from("titles")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;
      titles.value = data || [];
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to load titles";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addTitle = async (record: MediaRecord): Promise<boolean> => {
    const exists = titles.value.some(
      (t) => t.tmdb_id === record.tmdb_id && t.type === record.type
    );

    if (exists) {
      error.value = "Already in watchlist";
      return false;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      error.value = "No user session available";
      return false;
    }

    try {
      const { data: inserted, error: insertError } = await supabase
        .from("titles")
        .insert([
          {
            ...record,
            release_date: record.release_date || null,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (insertError || !inserted) {
        throw insertError || new Error("Failed to insert");
      }

      let providers: Provider[] = [];
      try {
        providers = await fetchProviders(record.tmdb_id, record.type, "HU");
      } catch (err) {
        console.error("Failed to fetch providers:", err);
      }

      let updatedRecord = inserted;
      if (providers.length > 0) {
        const { data: updated, error: updateError } = await supabase
          .from("titles")
          .update({ providers })
          .eq("id", inserted.id)
          .select()
          .maybeSingle();

        if (updateError) {
          console.error("Failed to update providers:", updateError);
        } else if (updated) {
          updatedRecord = updated;
        }
      }

      titles.value.unshift(updatedRecord);
      error.value = null;
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to add title";
      console.error(err);
      return false;
    }
  };

  const deleteTitle = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from("titles")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      titles.value = titles.value.filter((t) => t.id !== id);
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to delete";
      return false;
    }
  };

  const deleteAll = async () => {
    try {
      const { error: deleteError } = await supabase
        .from("titles")
        .delete()
        .not("id", "is", null);

      if (deleteError) throw deleteError;
      titles.value = [];
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to delete all";
      return false;
    }
  };

  const getFilteredTitles = (filter: "all" | "movie" | "tv") => {
    if (filter === "all") return titles.value;
    return titles.value.filter((t) => t.type === filter);
  };

  return {
    titles: computed(() => titles.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    loadTitles,
    addTitle,
    deleteTitle,
    deleteAll,
    getFilteredTitles,
  };
}
