import { createRouter, createWebHistory } from "vue-router";
import WatchListPage from "./pages/WatchListPage.vue";
import HomePage from "./pages/HomePage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/watchlist", name: "Watchlist", component: WatchListPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
