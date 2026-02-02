'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail } from 'lucide-react'
import RSVPSheet from './RSVPSheet'

type RSVPContentProps = {
  /**
   * Optional ref used by auto-scroll engine to center the RSVP CTA button.
   */
  ctaRef?: React.Ref<HTMLButtonElement>
}

export default function RSVPContent({ ctaRef }: RSVPContentProps) {
  const [isRSVPSheetOpen, setIsRSVPSheetOpen] = useState(false)

  const containerVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full">
      <div className="w-full space-y-6 sm:space-y-7 text-center">
        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="font-montserrat text-[13px] sm:text-[14px] tracking-[0.24em] uppercase text-stone-600"
        >
          Maklumat Kehadiran
        </motion.h2>

        {/* Important Notice Container */}
        <motion.div variants={itemVariants}>
          <div
            className="
              relative
              rounded-2xl
              border border-rose-200/70
              bg-rose-50/70
              px-5 py-5 sm:px-6
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              backdrop-blur-sm
            "
          >
            {/* subtle glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.08),transparent_60%)]" />

            <p className="relative z-10 font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-700">
              Sila sahkan kehadiran anda sebelum{' '}
              <span className="font-semibold text-rose-700">26 Mac 2026</span>.
              <br />
              Klik butang di bawah untuk RSVP.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="flex items-center justify-center py-1">
          <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
        </motion.div>

        {/* RSVP Button */}
        <motion.div variants={itemVariants}>
          <button
            ref={ctaRef}
            type="button"
            onClick={() => setIsRSVPSheetOpen(true)}
            className="
              mx-auto
              inline-flex w-full items-center justify-center gap-2
              rounded-2xl
              border border-stone-300/60
              bg-white/60
              px-4 py-3
              font-montserrat text-[13px] sm:text-[14px]
              font-medium tracking-[0.10em]
              text-stone-700
              shadow-sm
              backdrop-blur
              transition
              hover:bg-white/75
              active:scale-[0.99]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/30
            "
            aria-label="Buka borang RSVP"
          >
            <Mail className="h-4 w-4" />
            RSVP
          </button>
        </motion.div>

        {/* RSVP Sheet */}
        <RSVPSheet isOpen={isRSVPSheetOpen} onClose={() => setIsRSVPSheetOpen(false)} />
      </div>
    </motion.div>
  )
}
