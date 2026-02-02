'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'scale' | 'slide-left' | 'slide-right';

interface AnimatedSectionProps {
  children: ReactNode;
  type?: AnimationType;
  delay?: number;
}

/**
 * AnimatedSection Component
 * 
 * Wraps content with scroll-triggered animations.
 * Animates into view when scrolled into viewport.
 * 
 * Animation types:
 * - fade-up: Fades in while moving up (default)
 * - fade-down: Fades in while moving down
 * - scale: Fades in with scale effect
 * - slide-left: Slides in from left
 * - slide-right: Slides in from right
 */
export default function AnimatedSection({ 
  children, 
  type = 'fade-up',
  delay = 0 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, // Only animate once
    margin: "-80px" // Trigger 80px before element enters viewport
  });

  // Animation variants for different types
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-down': {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1 },
    },
    'slide-left': {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    'slide-right': {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[type]}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for elegance
      }}
    >
      {children}
    </motion.div>
  );
}