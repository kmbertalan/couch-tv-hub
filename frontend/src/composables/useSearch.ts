import { ref, computed } from "vue";
import { searchMovie, searchTV, type MediaRecord } from "../tmdb";

export function useSearch() {
  const results = ref<MediaRecord[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

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

  const search = async (query: string): Promise<void> => {
    if (!query.trim()) {
      results.value = [];
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const [movies, tvShows] = await Promise.all([
        searchMovie(query),
        searchTV(query),
      ]);

      const combined = [...movies, ...tvShows];
      const filtered = combined.filter((r) => r.poster_url && r.popularity > 1);
      filtered.sort((a, b) => scoreRecord(b, query) - scoreRecord(a, query));

      results.value = filtered.slice(0, 20);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Search failed";
      results.value = [];
    } finally {
      loading.value = false;
    }
  };

  const clearResults = () => {
    results.value = [];
    error.value = null;
  };

  return {
    results: computed(() => results.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    search,
    clearResults,
  };
}
