import type { ReactNode } from 'react';

export default function DataState({ loading, error, children }: { loading: boolean; error: string | null; children: ReactNode }) {
  if (loading) return <p className="border border-dashed border-line px-6 py-10 text-center text-sm text-muted">Loading content...</p>;
  return <>
    {error && <p role="status" className="mb-6 border border-dashed border-line px-6 py-4 text-center text-sm text-muted">Live content is unavailable. Showing saved chapter content where available.</p>}
    {children}
  </>;
}
