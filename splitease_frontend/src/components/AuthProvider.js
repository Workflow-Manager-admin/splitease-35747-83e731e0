import React, { useContext, useEffect, useState, createContext } from "react";
import { createClient } from "@supabase/supabase-js";

// See README: Set these in your .env file for actual deployment!
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || "https://YOUR_SUPABASE_URL.supabase.co";
const SUPABASE_ANONKEY = process.env.REACT_APP_SUPABASE_ANONKEY || "YOUR_SUPABASE_ANON_KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANONKEY);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // PUBLIC_INTERFACE
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, supabase }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
