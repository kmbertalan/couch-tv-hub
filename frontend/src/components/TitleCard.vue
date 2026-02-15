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
      <button class="delete-btn" @click.stop="deleteRecord" title="Remove from watchlist">
        <span class="delete-icon">×</span>
      </button>
    </div>

    <div class="content">
      <div class="header">
        <h3 class="title">{{ record.title }}</h3>
        <span class="badge">{{ record.type }}</span>
      </div>

      <div class="meta">
        <span class="year">{{ year }}</span>
        <span v-if="record.vote_average" class="rating">
          ⭐ {{ record.vote_average.toFixed(1) }}
        </span>
      </div>

      <p class="overview">
        {{ record.overview }}
      </p>
    </div>

    <div class="providers" v-if="record.providers?.length">
      <img
        v-for="provider in record.providers"
        :key="provider.name"
        :src="provider.logo_url ?? ''"
        :alt="provider.name"
        class="provider-logo"
        :title="provider.name"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid var(--border-strong);
  height: 100%;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.poster-wrapper {
  position: relative;
  aspect-ratio: 2 / 3;
  background: var(--surface-2);
  overflow: hidden;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .poster {
  transform: scale(1.03);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  width: 100%;
  height: 100%;
}

.delete-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  opacity: 0;
  transition: all 0.2s ease;
}

.card:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: var(--danger);
  transform: scale(1.1);
}

.delete-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.content {
  padding: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.title {
  font-size: 0.95rem;
  line-height: 1.3;
  margin: 0;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.badge {
  flex-shrink: 0;
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--surface-2);
  color: var(--text-secondary);
}

.meta {
  font-size: 0.8rem;
  color: var(--text-secondary);
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.year {
  color: var(--text-muted);
}

.rating {
  color: #fbbf24;
}

.overview {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.providers {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  padding: 0 0.875rem 0.875rem;
}

.provider-logo {
  height: 36px;
  width: auto;
  object-fit: contain;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 2px;
  background: var(--surface-2);
}

@media (max-width: 640px) {
  .delete-btn {
    opacity: 1;
    width: 28px;
    height: 28px;
  }

  .provider-logo {
    height: 32px;
  }
}
</style>
