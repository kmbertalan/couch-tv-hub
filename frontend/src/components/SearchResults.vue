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
  <div v-if="results.length" class="results-grid">
    <div
      v-for="record in results"
      :key="`${record.type}-${record.tmdb_id}`"
      class="result-card"
      @click="selectRecord(record)"
    >
      <img
        v-if="record.poster_url"
        :src="record.poster_url"
        :alt="record.title"
        class="poster"
      />
      <div v-else class="poster placeholder">No image</div>

      <div class="content">
        <h3>{{ record.title }}</h3>
        <div class="meta-row">
          <span class="badge">{{ record.type }}</span>
          <span>⭐ {{ record.vote_average.toFixed(1) }}</span>
          <span>{{ record.release_date?.slice(0, 4) ?? "—" }}</span>
        </div>
      </div>
    </div>
  </div>

  <p v-else>No results found.</p>
</template>

<style scoped>
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.result-card {
  cursor: pointer;
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.result-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

.result-card:active {
  transform: scale(0.98);
}

.poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #222;
  color: #777;
  font-size: 0.9rem;
}

.content {
  padding: 0.5rem;
}

h3 {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.2;
  color: #fff;
}

.meta-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.75rem;
  color: #aaa;
}

.badge {
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
  border-radius: 999px;
  background: #1f2937;
  color: #cbd5e1;
  text-transform: uppercase;
}
</style>
