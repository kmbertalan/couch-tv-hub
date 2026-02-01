<script setup lang="ts">
import TitleCard from "./TitleCard.vue";
import type { MediaRecord } from "../tmdb";

defineProps<{
  titles: MediaRecord[];
}>();
</script>

<template>
  <div class="list">
    <TitleCard
      v-for="title in titles"
      :key="`${title.type}-${title.tmdb_id}`"
      :record="title"
    />
  </div>
</template>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
</style>
