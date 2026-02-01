<script setup lang="ts">
import type { Title } from "../types";

defineProps<{ titles: Title[] }>();
</script>

<template>
  <div class="grid">
    <div v-for="item in titles" :key="item.id" class="card">
      <img :src="item.poster_url" alt="poster" />
      <h3>{{ item.title }}</h3>
      <p>{{ item.type }} | {{ item.release_date }}</p>
      <p>{{ item.overview }}</p>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
