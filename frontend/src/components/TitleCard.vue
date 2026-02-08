<script setup lang="ts">
import type { DBMediaRecord } from "../types";

const { record } = defineProps<{ record: DBMediaRecord }>();

const emit = defineEmits<{
  (e: "delete", record: DBMediaRecord): void;
}>();

const deleteRecord = () => {
  emit("delete", record);
};

const year = record.release_date ? record.release_date.slice(0, 4) : "—";
</script>

<template>
  <div class="card">
    <button class="delete-btn" @click.stop="deleteRecord">Delete</button>
    <div class="poster-wrapper">
      <img
        v-if="record.poster_url"
        :src="record.poster_url"
        :alt="record.title"
        class="poster"
      />
      <div v-else class="poster placeholder">No image</div>
    </div>

    <div class="content">
      <div class="header">
        <h3 class="title">{{ record.title }}</h3>
        <span class="badge">{{ record.type }}</span>
      </div>

      <div class="meta">
        <span>{{ year }}</span>
        <span v-if="record.vote_average">
          ⭐ {{ record.vote_average.toFixed(1) }}
        </span>
      </div>

      <p class="overview">
        {{ record.overview }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.poster-wrapper {
  aspect-ratio: 2 / 3;
  background: #222;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 0.9rem;
}

.content {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.title {
  font-size: 0.95rem;
  line-height: 1.2;
  margin: 0;
}

.overview {
  font-size: 0.8rem;
  color: #ccc;
  line-height: 1.3;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.delete-btn {
  width: 100%;
  border: none;
  background: #b91c1c;
  color: white;
  padding: 0.4rem;
  cursor: pointer;
}

.delete-btn:hover {
  background: #dc2626;
}

.card {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  background: #111;
  color: #fff;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  border: 1px solid #1f1f1f;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.6);
}

.badge {
  font-size: 0.65rem;
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #1f2937;
  color: #cbd5e1;
}

.meta {
  font-size: 0.75rem;
  color: #aaa;
  display: flex;
  gap: 0.6rem;
  align-items: center;
}
</style>
