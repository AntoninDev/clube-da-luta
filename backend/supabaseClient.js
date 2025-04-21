// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// 🔹 Pegue essas informações no painel do Supabase
const supabaseUrl = 'https://hopczdmufqqtaldivhto.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcGN6ZG11ZnFxdGFsZGl2aHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjA5NDQsImV4cCI6MjA1OTE5Njk0NH0.PEhle6nDQA1xIXsJpwb-PTuIy1GobTRZqmXk5A18EBE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
