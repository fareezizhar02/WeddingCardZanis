"use client";

import { motion } from "framer-motion";

/**
 * AturCaraContent Component
 *
 * Page: Atur Cara Majlis
 * Clean card layout with consistent wedding typography and gentle motion.
 */
export default function AturCaraContent() {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative w-full bg-transparent">
      {/* subtle paper-like glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_55%)]" />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 mx-auto flex h-full w-full max-w-[520px] flex-col items-center justify-center px-6 py-14 text-center sm:py-20"
      >
        {/* Inner Card */}
        <motion.div
          variants={itemVariants}
          className="
            w-full
            rounded-2xl
            border border-amber-200/50
            bg-white/70
            px-6 py-8
            shadow-[0_6px_20px_rgba(139,92,46,0.08)]
            backdrop-blur-sm
          "
        >
          <div className="space-y-6">
            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="font-playfair text-[22px] sm:text-[24px] tracking-[0.2em] uppercase text-amber-800"
            >
              Atur Cara Majlis
            </motion.h2>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center"
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
            </motion.div>

            {/* Schedule */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-col items-center gap-1">
                <p className="font-montserrat text-[13px] tracking-[0.2em] uppercase text-amber-700/70">
                  Majlis Bermula
                </p>
                <p className="font-playfair text-[20px] text-amber-900">
                  12.00 pm
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="font-montserrat text-[13px] tracking-[0.2em] uppercase text-amber-700/70">
                  Majlis Tamat
                </p>
                <p className="font-playfair text-[20px] text-amber-900">
                  6.00 pm
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
