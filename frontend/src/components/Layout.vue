<script setup lang="ts">
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const { signOut } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  await signOut();
  router.push("/auth");
};
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="container">
        <router-link to="/" class="logo">
          <span class="logo-icon">🛋️</span>
          <span class="logo-text">Couch TV</span>
        </router-link>
        <nav class="nav">
          <router-link to="/" class="nav-link" active-class="active">
            Search
          </router-link>
          <router-link to="/watchlist" class="nav-link" active-class="active">
            Watchlist
          </router-link>
          <button class="logout-btn" @click="handleLogout">Logout</button>
        </nav>
      </div>
    </header>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--surface-1);
  border-bottom: 1px solid var(--border-strong);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--surface-2);
}

.nav-link.active {
  color: var(--accent);
  background: var(--accent-subtle);
}

.logout-btn {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;
}

.logout-btn:hover {
  background: var(--danger-subtle);
  border-color: var(--danger);
  color: var(--danger);
}

.main {
  flex: 1;
  padding: 2rem 1.5rem;
}

@media (max-width: 640px) {
  .container {
    padding: 0 1rem;
  }

  .logo-text {
    display: none;
  }

  .nav-link {
    padding: 0.4rem 0.75rem;
    font-size: 0.875rem;
  }

  .main {
    padding: 1rem;
  }
}
</style>
