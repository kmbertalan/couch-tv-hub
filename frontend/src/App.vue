<script setup lang="ts">
import { onMounted, ref } from "vue";
import AddTitleForm from "./components/AddTitleForm.vue";
import ListTitles from "./components/ListTitles.vue";
import { supabase } from "./supabaseClient";

const titles = ref<string[]>([]);

const loadTitles = async () => {
  const { data, error } = await supabase.from("titles").select("title");
  if (error) console.error(error);
  else titles.value = data.map((item) => item.title);
};

const addTitle = async (newTitle: string) => {
  if (!newTitle.trim()) return;

  const { data, error } = await supabase
    .from("titles")
    .insert([{ title: newTitle.trim() }]);

  if (error) console.error(error);
  else titles.value.push(newTitle.trim());
};

onMounted(() => {
  loadTitles();
});
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <AddTitleForm @submit="addTitle" />
  <ListTitles :titles="titles" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
