<script setup lang="ts">
import { ref } from "vue";

defineProps<{}>();

const message = ref("");
const emit = defineEmits(["submit"]);

const submit = () => {
  emit("submit", message.value);
  message.value = "";
};
</script>

<template>
  <div class="card">
    <form @submit.prevent="submit">
      <input v-model="message" placeholder="Enter title" />
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
