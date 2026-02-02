'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { useState } from 'react'
import CalendarSheet from './CalendarSheet'

export default function DetailsContent() {
  const containerVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
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

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const labelCls =
    'font-montserrat text-[12px] sm:text-[13px] tracking-[0.22em] uppercase text-stone-600'
  const valueCls =
    'font-playfair text-[16px] sm:text-[17px] leading-relaxed text-stone-700'

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full"
    >
      <div className="w-full space-y-6 sm:space-y-7 text-center">
        {/* Lokasi */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className={labelCls}>Lokasi</p>
          <p
            className={`${valueCls} font-montserrat text-[14px] sm:text-[15px] leading-7`}
          >
            Lot 8, Kampung Baru Pulau Sayak,
            <br />
            08500 Kota Kuala Muda,
            <br />
            Kedah
          </p>
        </motion.div>

        {/* Tarikh */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className={labelCls}>Tarikh</p>
          <p className={valueCls}>Sabtu, 28 Mac 2026</p>
        </motion.div>

        {/* Masa */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className={labelCls}>Masa</p>
          <p className={valueCls}>12.00 PM - 6.00 PM</p>
        </motion.div>

        {/* Small divider */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center py-1"
        >
          <div className="h-px w-full max-w-[280px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
        </motion.div>

        {/* Button (UI sahaja) */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(true)}
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
            aria-label="Simpan tarikh"
          >
            <Calendar className="h-4 w-4" />
            Simpan Tarikh
          </button>
        </motion.div>
        <CalendarSheet
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
        />
      </div>
    </motion.div>
  );
}
