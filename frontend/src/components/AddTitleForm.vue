<script setup lang="ts">
import { ref } from "vue";

const query = ref("");
const emit = defineEmits<{
  (e: "submit", value: string): void;
}>();

const submit = () => {
  emit("submit", query.value);
};
</script>

<template>
  <form class="search-form" @submit.prevent="submit">
    <div class="search-input-wrapper">
      <span class="search-icon">🔍</span>
      <input
        v-model="query"
        type="text"
        placeholder="Search for movies or TV shows..."
        class="search-input"
      />
    </div>
    <button type="submit" class="primary search-btn">Search</button>
  </form>
</template>

<style scoped>
.search-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  opacity: 0.5;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  font-size: 1rem;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-btn {
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .search-form {
    flex-direction: column;
  }

  .search-btn {
    width: 100%;
  }
}
</style>
