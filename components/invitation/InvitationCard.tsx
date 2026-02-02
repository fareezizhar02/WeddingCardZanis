'use client';

import { motion } from 'framer-motion';
import CoverPage from './CoverPage';

/**
 * InvitationCard Component
 * 
 * Centered card container with elegant styling, rounded corners,
 * and subtle shadow. Provides the main visual frame for the invitation.
 */
export default function InvitationCard() {
  // Card entrance animation - subtle fade and scale
  const cardVariants = {
    initial: { 
      opacity: 0,
      scale: 0.95,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="
        relative
        w-full
        max-w-2xl
        mx-auto
        bg-gradient-to-br from-cream-50 to-amber-50/30
        rounded-2xl md:rounded-2xl
        sm:rounded-none
        shadow-[0_8px_30px_rgb(139,92,46,0.12)]
        border border-amber-100/50
        sm:border-0
        overflow-hidden
        aspect-[4/5]
        h-[100dvh] max-h-[100dvh]
        sm:h-auto sm:max-h-none
      "
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 pointer-events-none"></div>
      
      {/* Card content with elegant padding */}
      <div className="relative h-full w-full">
        <CoverPage />
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-amber-200/40 rounded-tl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-amber-200/40 rounded-br-2xl"></div>
    </motion.div>
  );
}
