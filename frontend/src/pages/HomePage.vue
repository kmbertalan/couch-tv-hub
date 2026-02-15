<script setup lang="ts">
import { onMounted } from "vue";
import { useTitles } from "../composables/useTitles";
import { useSearch } from "../composables/useSearch";
import Layout from "../components/Layout.vue";
import AddTitleForm from "../components/AddTitleForm.vue";
import SearchResults from "../components/SearchResults.vue";
import type { MediaRecord } from "../tmdb";

const { addTitle, loadTitles, error: titleError } = useTitles();
const { results, loading, search, clearResults } = useSearch();

const handleSelect = async (record: MediaRecord) => {
  const success = await addTitle(record);
  if (success) {
    clearResults();
  }
};

const handleSearch = (query: string) => {
  if (!query.trim()) {
    clearResults();
    return;
  }
  search(query);
};

onMounted(() => {
  loadTitles();
});
</script>

<template>
  <Layout>
    <div class="container page">
      <div class="page-header">
        <h1>Find Movies & TV Shows</h1>
        <p>Search for titles to add to your watchlist</p>
      </div>

      <AddTitleForm @submit="handleSearch" />

      <div v-if="titleError" class="error-message mt-2">{{ titleError }}</div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <span>Searching...</span>
      </div>

      <SearchResults
        v-else-if="results.length"
        :results="results"
        @select="handleSelect"
      />

    </div>
  </Layout>
</template>

<style scoped>
.page {
  padding-bottom: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-secondary);
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem;
  color: var(--text-secondary);
}

.loading-state .spinner {
  width: 24px;
  height: 24px;
}
</style>
