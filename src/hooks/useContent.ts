import { useEffect, useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import { listContent, type ContentTable } from '../services/content';

export function useContent<T>(table: ContentTable, fallback: T[] = []) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!isSupabaseConfigured) {
      setData(fallback);
      setLoading(false);
      return () => { mounted = false; };
    }

    setLoading(true);
    setError(null);
    void listContent(table).then(({ data: rows, error: queryError }) => {
      if (!mounted) return;
      if (queryError) {
        setError(queryError.message);
        setData(fallback);
      } else {
        setData((rows ?? []) as T[]);
      }
      setLoading(false);
    }).catch((queryError: unknown) => {
      if (!mounted) return;
      setError(queryError instanceof Error ? queryError.message : 'Could not load content.');
      setData(fallback);
      setLoading(false);
    });

    return () => { mounted = false; };
  }, [table]);

  return { data, loading, error };
}
