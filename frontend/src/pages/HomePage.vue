<script setup lang="ts">
import { onMounted, ref } from "vue";
import AddTitleForm from "./../components/AddTitleForm.vue";
import SearchResults from "./../components/SearchResults.vue";
import { supabase } from "./../supabaseClient";
import { searchMovie, searchTV, type MediaRecord } from "./../tmdb";
import type { DBMediaRecord } from "./../types";

const titles = ref<DBMediaRecord[]>([]);
const searchResults = ref<MediaRecord[]>([]);

const loadTitles = async () => {
  const { data, error } = await supabase.from("titles").select("*");
  if (error) console.error(error);
  else titles.value = data;
};

const addTitle = async (record: MediaRecord): Promise<boolean> => {
  if (!record) return false;

  const exists = titles.value.some(
    (t) => t.tmdb_id === record.tmdb_id && t.type === record.type
  );

  if (exists) {
    alert("Already in watchlist");
    return false;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("No user session available");
    return false;
  }

  try {
    const { data, error } = await supabase
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

    if (error) {
      console.error("Failed to insert:", error);
      return false;
    }

    titles.value.push(data as DBMediaRecord);
    return true;
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
};

const handleSelect = async (record: MediaRecord) => {
  const success = await addTitle(record);

  if (success) searchResults.value = [];
};

const scoreRecord = (record: MediaRecord, query: string): number => {
  let score = 0;

  score += record.popularity * 1.5;

  score += record.vote_average * 10;

  if (record.release_date) {
    const year = Number(record.release_date.slice(0, 4));
    score += Math.max(0, year - 2000);
  }

  if (record.title.toLowerCase().startsWith(query.toLowerCase())) {
    score += 100;
  }

  return score;
};

const searchTitle = async (newTitle: string) => {
  if (!newTitle.trim()) return;

  const movies = await searchMovie(newTitle);
  const tvShows = await searchTV(newTitle);

  const combined = [...movies, ...tvShows];

  const filtered = combined.filter((r) => r.poster_url && r.popularity > 1);

  filtered.sort((a, b) => scoreRecord(b, newTitle) - scoreRecord(a, newTitle));

  searchResults.value = filtered.slice(0, 20);
};

onMounted(() => {
  loadTitles();
});
</script>

<template>
  <router-link to="/watchlist">Go to Watchlist</router-link>
  <AddTitleForm @submit="searchTitle" />
  <SearchResults :results="searchResults" @select="handleSelect" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
