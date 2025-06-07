/// PUBLIC_INTERFACE
/**
 * Supabase Client Initialization
 * This file sets up the Supabase client for use throughout the SplitEase application.
 *
 * - Uses environment variables for security:
 *   - REACT_APP_SUPABASE_URL:        URL for your Supabase project (rest endpoint)
 *   - REACT_APP_SUPABASE_ANON_KEY:   Public "anon" key for your Supabase project
 *
 * Features enabled by this client (future use):
 *   - Authentication (sign up, sign in, Google OAuth, etc.)
 *   - Database access (CRUD for users, receipts, items, payment status)
 *   - Storage (receipt uploads, downloads)
 *
 * Usage (in any React component or utility):
 *   import { supabase } from './supabaseClient';
 *   // Use supabase.auth, supabase.from('table'), etc.
 */

import { createClient } from '@supabase/supabase-js';

// Secure: Read from .env file (do not hard-code keys or URLs)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Throws if no env values, helping detect config issues early.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables! ' +
    'Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your .env file.'
  );
}

/**
 * The Supabase client object.
 * Export this for use in API calls, authentication, and storage operations.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example: Future Auth usage
// supabase.auth.signInWithPassword({ email, password });

// Example: Future Storage usage
// supabase.storage.from('receipts').upload(...);

// Example: Future Database query
// supabase.from('receipts').select('*');

