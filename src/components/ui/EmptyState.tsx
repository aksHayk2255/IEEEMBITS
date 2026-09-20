import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface EmptyStateProps {
  /** Icon element, usually a lucide-react icon. */
  icon: ReactNode;
  title: string;
  hint: string;
  /** Path of the data file to edit, shown as guidance for the maintainer. */
  file?: string;
}

/**
 * Shown by every data-driven section while its data file is still empty.
 * It states what is missing and where to add it rather than apologising.
 */
export default function EmptyState({ icon, title, hint, file }: EmptyStateProps) {
  return (
    <Reveal>
      <div className="flex flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-line bg-panel/50 px-6 py-20 text-center sm:py-28">
        <span className="text-accent/70" aria-hidden="true">
          {icon}
        </span>
        <p className="font-display text-2xl text-ink sm:text-3xl">{title}</p>
        <p className="max-w-sm text-sm text-muted">{hint}</p>
        {file && (
          <code className="mt-2 rounded-sm border border-line px-3 py-1.5 text-xs tracking-wide text-muted">
            {file}
          </code>
        )}
      </div>
    </Reveal>
  );
}
