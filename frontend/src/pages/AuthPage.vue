<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const { signIn, signUp, loading, error } = useAuth();

const email = ref("");
const password = ref("");
const isSignUp = ref(false);
const successMessage = ref("");

const handleSubmit = async () => {
  successMessage.value = "";

  if (isSignUp.value) {
    const success = await signUp(email.value, password.value);
    if (success) {
      successMessage.value = "Account created! Please sign in.";
      isSignUp.value = false;
    }
  } else {
    const success = await signIn(email.value, password.value);
    if (success) {
      router.push("/");
    }
  }
};

const toggleMode = () => {
  isSignUp.value = !isSignUp.value;
  successMessage.value = "";
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <span class="logo-icon">🛋️</span>
        <h1>{{ isSignUp ? "Create Account" : "Welcome Back" }}</h1>
        <p>{{ isSignUp ? "Sign up to start building your watchlist" : "Sign in to manage your watchlist" }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="your@email.com"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            :disabled="loading"
          />
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

        <button type="submit" class="primary submit-btn" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>{{ isSignUp ? "Create Account" : "Sign In" }}</span>
        </button>
      </form>

      <div class="auth-footer">
        <p>
          {{ isSignUp ? "Already have an account?" : "Don't have an account?" }}
          <button type="button" class="link-btn" @click="toggleMode">
            {{ isSignUp ? "Sign In" : "Sign Up" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: var(--bg-primary);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.auth-header h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.auth-footer p {
  font-size: 0.875rem;
}

.link-btn {
  background: none;
  border: none;
  padding: 0;
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}

.link-btn:hover {
  color: var(--accent-hover);
  text-decoration: underline;
  transform: none;
}

.success-message {
  padding: 0.75rem 1rem;
  background: var(--success-subtle);
  border: 1px solid var(--success);
  border-radius: var(--radius-md);
  color: var(--success);
  font-size: 0.875rem;
}
</style>
