import { ref, computed } from "vue";
import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    user.value = data.session?.user || null;
    return !!data.session;
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    loading.value = true;
    error.value = null;
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      await checkAuth();
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Sign in failed";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    loading.value = true;
    error.value = null;
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Sign up failed";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async (): Promise<boolean> => {
    try {
      await supabase.auth.signOut();
      user.value = null;
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Sign out failed";
      return false;
    }
  };

  return {
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isAuthenticated: computed(() => !!user.value),
    checkAuth,
    signIn,
    signUp,
    signOut,
  };
}
