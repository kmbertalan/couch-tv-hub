import { createRouter, createWebHistory } from "vue-router";
import WatchListPage from "./pages/WatchListPage.vue";
import HomePage from "./pages/HomePage.vue";
import AuthPage from "./pages/AuthPage.vue";
import { supabase } from "./supabaseClient";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/watchlist", name: "Watchlist", component: WatchListPage },
  { path: "/auth", name: "Auth", component: AuthPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const { data } = await supabase.auth.getSession();
  const isLoggedIn = !!data.session;

  if (!isLoggedIn && to.name !== "Auth") {
    next("/auth");
    return;
  }

  if (isLoggedIn && to.name === "Auth") {
    next("/");
    return;
  }

  next();
});
