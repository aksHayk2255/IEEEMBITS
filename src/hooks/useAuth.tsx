import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthContextValue {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    const checkAdmin = async (nextSession: Session | null) => {
      if (!nextSession) { setIsAdmin(false); return; }
      try {
        const { data, error } = await supabase!.rpc('is_admin');
        setIsAdmin(!error && data === true);
      } catch {
        setIsAdmin(false);
      }
    };
    void supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await checkAdmin(data.session);
      setLoading(false);
    }).catch(() => {
      setSession(null);
      setIsAdmin(false);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(true);
      void checkAdmin(nextSession).finally(() => setLoading(false));
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const value: AuthContextValue = {
    session,
    isAdmin,
    loading,
    configured: isSupabaseConfigured,
    signIn: async (email, password) => {
      if (!supabase) return { error: 'Supabase is not configured.' };
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error ? { error: error.message } : {};
      } catch {
        return { error: 'Cannot connect to Supabase. Check VITE_SUPABASE_URL and restart the dev server.' };
      }
    },
    signOut: async () => {
      if (supabase) await supabase.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
