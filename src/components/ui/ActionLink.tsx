import { ArrowRight } from 'lucide-react';

interface ActionLinkProps {
  href: string;
  children: string;
  /** 'solid' is the accent button, 'outline' is the quieter companion. */
  variant?: 'solid' | 'outline';
  className?: string;
}

const base =
  'group inline-flex items-center gap-2.5 rounded-sm px-6 py-3.5 text-sm font-medium transition-colors duration-300';

const styles = {
  solid: 'bg-accent text-bg hover:bg-ink',
  outline: 'border border-line text-ink hover:border-line-strong hover:bg-surface',
} as const;

export default function ActionLink({
  href,
  children,
  variant = 'solid',
  className = '',
}: ActionLinkProps) {
  return (
    <a href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      <ArrowRight
        size={16}
        strokeWidth={1.75}
        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        aria-hidden="true"
      />
    </a>
  );
}
