import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wrccbgbhqajpfwjcsyvw.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyY2NiZ2JocWFqcGZ3amNzeXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTc5NjAsImV4cCI6MjA1NzI5Mzk2MH0.AVzAj0rbS8h9Ts6hFXALmUKXKleWj-7y_AcAPEruBR0'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;