<script setup lang="ts">
import { onMounted, ref } from "vue";
import { supabase } from "../supabaseClient";
import type { DBMediaRecord } from "../types";
import ListTitles from "../components/ListTitles.vue";

const titles = ref<DBMediaRecord[]>([]);

const loadTitles = async () => {
  const { data, error } = await supabase
    .from("titles")
    .select("*")
    .order("created_at", { ascending: false });
  if (!error && data) titles.value = data as DBMediaRecord[];
};

onMounted(loadTitles);
</script>

<template>
  <router-link to="/">Back to Search</router-link>
  <h1>My Watchlist</h1>
  <ListTitles :titles="titles" />
</template>
