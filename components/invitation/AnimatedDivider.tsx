'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedDividerProps {
  delay?: number;
}

/**
 * AnimatedDivider Component
 * 
 * Elegant animated horizontal divider that expands from center
 * when scrolled into view. Creates a smooth, cinematic separation
 * between content sections.
 */
export default function AnimatedDivider({ delay = 0 }: AnimatedDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-50px" 
  });

  return (
    <div ref={ref} className="flex items-center justify-center py-1">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{
          duration: 1,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent origin-center"
      />
    </div>
  );
}