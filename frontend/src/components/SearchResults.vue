<script setup lang="ts">
import type { MediaRecord } from "../tmdb";

defineProps<{
  results: MediaRecord[];
}>();

const emit = defineEmits<{
  (e: "select", record: MediaRecord): void;
}>();

const selectRecord = (record: MediaRecord) => {
  emit("select", record);
};
</script>

<template>
  <div class="results-grid">
    <div
      v-for="record in results"
      :key="`${record.type}-${record.tmdb_id}`"
      class="result-card"
      @click="selectRecord(record)"
    >
      <div class="poster-wrapper">
        <img
          v-if="record.poster_url"
          :src="record.poster_url"
          :alt="record.title"
          class="poster"
        />
        <div v-else class="poster placeholder">
          <span>No image</span>
        </div>
        <div class="overlay">
          <span class="add-icon">+</span>
        </div>
      </div>

      <div class="content">
        <h3 class="title">{{ record.title }}</h3>
        <div class="meta-row">
          <span class="badge">{{ record.type }}</span>
          <span class="rating">⭐ {{ record.vote_average.toFixed(1) }}</span>
          <span class="year">{{ record.release_date?.slice(0, 4) ?? "—" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.result-card {
  cursor: pointer;
  background: var(--surface-1);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid var(--border-strong);
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.result-card:active {
  transform: scale(0.98);
}

.poster-wrapper {
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.result-card:hover .poster {
  transform: scale(1.05);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-2);
  color: var(--text-muted);
  font-size: 0.9rem;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.result-card:hover .overlay {
  opacity: 1;
}

.add-icon {
  font-size: 3rem;
  color: white;
  font-weight: 300;
}

.content {
  padding: 0.75rem;
}

.title {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  line-height: 1.3;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.badge {
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: var(--surface-2);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.rating {
  color: #fbbf24;
}

.year {
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>
