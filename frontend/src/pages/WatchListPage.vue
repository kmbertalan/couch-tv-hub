<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useTitles } from "../composables/useTitles";
import Layout from "../components/Layout.vue";
import ListTitles from "../components/ListTitles.vue";
import type { DBMediaRecord } from "../types";

const { titles, loading, deleteTitle, deleteAll, loadTitles, getFilteredTitles } = useTitles();
const filter = ref<"all" | "movie" | "tv">("all");
const showDeleteConfirm = ref(false);

const filteredTitles = computed(() => getFilteredTitles(filter.value));

const handleDelete = async (record: DBMediaRecord) => {
  await deleteTitle(record.id);
};

const confirmDeleteAll = () => {
  showDeleteConfirm.value = true;
};

const cancelDeleteAll = () => {
  showDeleteConfirm.value = false;
};

const executeDeleteAll = async () => {
  await deleteAll();
  showDeleteConfirm.value = false;
};

onMounted(() => {
  loadTitles();
});
</script>

<template>
  <Layout>
    <div class="container page">
      <div class="page-header">
        <h1>My Watchlist</h1>
        <p>{{ titles.length }} {{ titles.length === 1 ? 'title' : 'titles' }} saved</p>
      </div>

      <div class="toolbar">
        <div class="filters">
          <button
            @click="filter = 'all'"
            :class="['filter-btn', { active: filter === 'all' }]"
          >
            All
          </button>
          <button
            @click="filter = 'movie'"
            :class="['filter-btn', { active: filter === 'movie' }]"
          >
            Movies
          </button>
          <button
            @click="filter = 'tv'"
            :class="['filter-btn', { active: filter === 'tv' }]"
          >
            TV Shows
          </button>
        </div>

        <button
          v-if="titles.length > 0"
          class="danger delete-all-btn"
          @click="confirmDeleteAll"
        >
          Clear All
        </button>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <span>Loading your watchlist...</span>
      </div>

      <ListTitles
        v-else-if="filteredTitles.length > 0"
        :titles="filteredTitles"
        @delete="handleDelete"
      />

      <div v-else class="empty-state">
        <div class="empty-state-icon">📺</div>
        <p>Your watchlist is empty</p>
        <router-link to="/" class="browse-link">Browse titles to add</router-link>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteConfirm" class="modal-overlay" @click="cancelDeleteAll">
        <div class="modal" @click.stop>
          <h3>Clear Watchlist?</h3>
          <p>This will remove all {{ titles.length }} titles from your watchlist. This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="secondary" @click="cancelDeleteAll">Cancel</button>
            <button class="danger" @click="executeDeleteAll">Clear All</button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.page {
  padding-bottom: 2rem;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-header h1 {
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.filters {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.delete-all-btn {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 4rem;
  color: var(--text-secondary);
}

.empty-state {
  text-align: center;
  padding: 4rem 1.5rem;
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.browse-link {
  color: var(--accent);
  font-weight: 500;
}

.browse-link:hover {
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  max-width: 400px;
  width: 100%;
}

.modal h3 {
  margin-bottom: 0.75rem;
}

.modal p {
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.modal-actions button {
  padding: 0.625rem 1rem;
}

@media (max-width: 640px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    justify-content: center;
  }
}
</style>
