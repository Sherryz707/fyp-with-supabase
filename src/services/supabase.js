import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bbmswmuxuithjsexbwyw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibXN3bXV4dWl0aGpzZXhid3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NjE5NjEsImV4cCI6MjA2NDMzNzk2MX0.E_grRpPPSFKf75kRd97wuO_NB-r1jjDvfTfIB3zJeTM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
