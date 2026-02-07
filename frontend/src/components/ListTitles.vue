<script setup lang="ts">
import TitleCard from "./TitleCard.vue";
import type { DBMediaRecord } from "../types";

defineProps<{
  titles: DBMediaRecord[];
}>();

const emit = defineEmits<{
  (e: "delete", record: DBMediaRecord): void;
}>();

const forwardDelete = (record: DBMediaRecord) => {
  emit("delete", record);
};
</script>

<template>
  <div class="list">
    <TitleCard
      v-for="title in titles"
      :key="`${title.type}-${title.tmdb_id}`"
      :record="title"
      @delete="forwardDelete"
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
