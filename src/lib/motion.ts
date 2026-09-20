import type { Variants } from 'framer-motion';

/** Shared easing so every transition in the site feels like one system. */
export const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/** Parent wrapper that releases its children one after another. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Used when the reader prefers reduced motion: state changes, no travel. */
export const still: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};
