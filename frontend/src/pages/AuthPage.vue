<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../supabaseClient";

const email = ref("");
const password = ref("");
const errorMsg = ref("");

const signUp = async () => {
  errorMsg.value = "";
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    errorMsg.value = error.message;
  } else {
    alert("Signup successful! You can now log in.");
  }
};

const signIn = async () => {
  errorMsg.value = "";
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    errorMsg.value = error.message;
  } else {
    window.location.href = "/";
  }
};
</script>

<template>
  <div class="auth-page">
    <h1>Login / Sign Up</h1>

    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="signIn">Login</button>
    <button @click="signUp">Sign Up</button>

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

button {
  padding: 0.5rem;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
