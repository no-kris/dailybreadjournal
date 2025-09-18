import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dgkalleieqflxwkaeyrm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRna2FsbGVpZXFmbHh3a2FleXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNDYwNDcsImV4cCI6MjA3MzcyMjA0N30.5-KS73N9H68tRsklLUEbDCmh54_5M3nej4oToZgIkcw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
