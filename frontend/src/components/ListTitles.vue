<script setup lang="ts">
defineProps<{ titles: string[] }>();
</script>

<template>
  <div class="card">
    <ul>
      <li v-for="title in titles" :key="title">{{ title }}</li>
    </ul>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
