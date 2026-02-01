import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ajsdbylgyqcxnvueuets.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqc2RieWxneXFjeG52dWV1ZXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTAzNjEsImV4cCI6MjA4NTUyNjM2MX0.X4UETIayapq2a0gGzwXINueQ7n8mp-n1nvrfh61R3Hc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
