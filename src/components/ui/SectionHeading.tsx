import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  /** Two-digit section number, e.g. "03". */
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  /** Extra content pinned to the right of the heading on wide screens. */
  aside?: ReactNode;
}

export default function SectionHeading({
  index,
  label,
  title,
  description,
  aside,
}: SectionHeadingProps) {
  return (
    <div className="border-t border-line pt-6">
      <Reveal>
        <p className="eyebrow">
          {index} <span className="px-2 text-line-strong">/</span> {label}
        </p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Reveal delay={0.05}>
          <h2 className="display max-w-[16ch]">{title}</h2>
        </Reveal>

        {(description || aside) && (
          <Reveal delay={0.1} className="lg:max-w-sm lg:pb-2">
            {description && <p className="lede">{description}</p>}
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  );
}
