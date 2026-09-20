import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in the middle of the viewport so the
 * navbar can highlight the matching link.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key.split('|');

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [key]);

  return active;
}
