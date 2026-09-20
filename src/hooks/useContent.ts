import { useEffect, useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import { listContent, type ContentTable } from '../services/content';

export function useContent<T>(table: ContentTable, fallback: T[] = []) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!isSupabaseConfigured) return;
    setLoading(true);
    void listContent(table).then(({ data: rows, error: queryError }) => {
      if (!mounted) return;
      if (queryError) setError(queryError.message);
      else setData((rows ?? []) as T[]);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [table]);

  return { data, loading, error };
}
