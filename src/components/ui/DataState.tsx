import type { ReactNode } from 'react';

export default function DataState({ loading, error, children }: { loading: boolean; error: string | null; children: ReactNode }) {
  if (loading) return <p className="border border-dashed border-line px-6 py-10 text-center text-sm text-muted">Loading content...</p>;
  if (error) return <p className="border border-dashed border-line px-6 py-10 text-center text-sm text-muted">Content unavailable right now.</p>;
  return children;
}
