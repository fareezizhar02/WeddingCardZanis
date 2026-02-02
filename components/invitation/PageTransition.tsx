'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  type: 'cover' | 'music';
}

/**
 * PageTransition Component
 * 
 * Reusable wrapper for page transitions with cinematic fade effect.
 * Cover pages zoom in and fade out.
 * Music pages fade in with subtle scale.
 */
export default function PageTransition({ children, type }: PageTransitionProps) {
  // Cover Page Animation (Outgoing)
  const coverVariants = {
    initial: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom cinematic easing
      }
    }
  };

  // Music Page Animation (Incoming)
  const musicVariants = {
    initial: {
      opacity: 0,
      scale: 0.96,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3, // Start before cover finishes (overlap)
        ease: [0.43, 0.13, 0.23, 0.96],
      }
    }
  };

  const variants = type === 'cover' ? coverVariants : musicVariants;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}