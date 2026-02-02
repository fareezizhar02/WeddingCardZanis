'use client'

import { motion } from 'framer-motion'
import type { RSVPResponse } from './Kehadiran'

interface UcapanProps {
  responses?: RSVPResponse[]
  maxHeightClassName?: string // default max-h-[60vh]
}

export default function Ucapan({ responses = [], maxHeightClassName }: UcapanProps) {
  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const items = responses
    .map((r) => ({
      nama: (r.nama || '').toString().trim(),
      ucapan: (r.ucapan || '').toString().trim(),
      createdAt: r.createdAt ?? null,
    }))
    .filter((x) => x.ucapan.length > 0)
    .sort((a, b) => {
      // latest first if createdAt exists
      if (a.createdAt == null && b.createdAt == null) return 0
      if (a.createdAt == null) return 1
      if (b.createdAt == null) return -1
      const ta = typeof a.createdAt === 'number' ? a.createdAt : Date.parse(String(a.createdAt))
      const tb = typeof b.createdAt === 'number' ? b.createdAt : Date.parse(String(b.createdAt))
      if (!Number.isFinite(ta) || !Number.isFinite(tb)) return 0
      return tb - ta
    })

  const maxH = maxHeightClassName || 'max-h-[60vh]'

  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full">
      <motion.div
        variants={itemVariants}
        className="
          relative
          w-full
          overflow-hidden
          rounded-2xl
          border border-stone-200/70
          bg-white/45
          backdrop-blur-sm
          shadow-[0_8px_30px_rgba(0,0,0,0.04)]
        "
      >
        <div
          className="
            sticky top-0 z-20
            flex items-center justify-center
            border-b border-stone-200/60
            bg-white/85
            backdrop-blur
            px-5 py-3
          "
        >
          <p className="font-montserrat text-[12px] sm:text-[13px] tracking-[0.26em] uppercase text-stone-600">
            Ucapan
          </p>
        </div>

        {/* minimalist fade indicators */}
        <div className="pointer-events-none absolute left-0 right-0 top-[44px] z-10 h-6 bg-gradient-to-b from-white/90 to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 z-10 h-7 bg-gradient-to-t from-white/85 to-transparent" />

        <div className={`scroll-minimal ${maxH} overflow-y-auto px-5 py-5 sm:px-6 sm:py-6`}>
          {items.length === 0 ? (
            <motion.p
              variants={itemVariants}
              className="text-center font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-500"
            >
              Belum ada ucapan lagi.
            </motion.p>
          ) : (
            <div className="space-y-5">
              {items.map((x, idx) => (
                <motion.div key={`${x.nama}-${idx}`} variants={itemVariants} className="text-center">
                  <p className="font-montserrat text-[13px] sm:text-[14px] italic leading-relaxed text-stone-600">
                    “{x.ucapan}”
                  </p>

                  <p className="mt-2 font-playfair text-[16px] sm:text-[17px] text-stone-700">
                    {x.nama || 'Tetamu'}
                  </p>

                  {idx !== items.length - 1 && (
                    <div className="mt-4 flex items-center justify-center">
                      <div className="h-px w-full max-w-[240px] bg-gradient-to-r from-transparent via-stone-300/60 to-transparent" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
