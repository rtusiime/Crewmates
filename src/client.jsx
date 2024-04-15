import { createClient } from '@supabase/supabase-js';
const URL = 'https://djvtjqqqhkietkroyeub.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdnRqcXFxaGtpZXRrcm95ZXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NzY3NDcsImV4cCI6MjAyODU1Mjc0N30.6NAs2VhM-qq8fsDVtXTmaCcq_QLtqXeP4tvsw2lhVMY';
const supabase = createClient(URL, API_KEY);
export default supabase;