import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, still } from '../../lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element starts revealing. */
  delay?: number;
}

/**
 * Reveals its children once they scroll into view. Honours
 * prefers-reduced-motion by rendering the end state immediately.
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduceMotion ? still : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -80px 0px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
