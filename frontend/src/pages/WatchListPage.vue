<script setup lang="ts">
import { onMounted, ref } from "vue";
import { supabase } from "../supabaseClient";
import type { DBMediaRecord } from "../types";
import ListTitles from "../components/ListTitles.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};

const titles = ref<DBMediaRecord[]>([]);

const loadTitles = async () => {
  const { data, error } = await supabase
    .from("titles")
    .select("*")
    .order("created_at", { ascending: false });
  if (!error && data) titles.value = data as DBMediaRecord[];
};

const deleteTitle = async (record: DBMediaRecord) => {
  const { error } = await supabase.from("titles").delete().eq("id", record.id);

  if (error) {
    console.error(error);
    return;
  }

  titles.value = titles.value.filter((t) => t.id !== record.id);
};

const deleteAll = async () => {
  if (!confirm("Delete entire watchlist?")) return;

  const { error } = await supabase
    .from("titles")
    .delete()
    .not("id", "is", null);

  if (error) {
    console.error(error);
    return;
  }

  titles.value = [];
};

onMounted(loadTitles);
</script>

<template>
  <div class="header">
    <router-link to="/">Search</router-link>
    <button class="logout" @click="logout">Logout</button>
  </div>
  <h1>My Watchlist</h1>
  <button v-if="titles.length > 0" class="delete-all" @click="deleteAll">
    Delete all
  </button>
  <ListTitles :titles="titles" @delete="deleteTitle" />
</template>

<style scoped>
.delete-all {
  margin: 1rem 0;
  padding: 0.6rem 1rem;
  background: #7f1d1d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.delete-all:hover {
  background: #991b1b;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.logout {
  padding: 0.5rem 0.9rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.logout:hover {
  background: #444;
}
</style>
