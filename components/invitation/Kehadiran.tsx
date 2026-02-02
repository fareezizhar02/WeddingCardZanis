'use client'

import { motion } from 'framer-motion'

export type RSVPResponse = {
  nama?: string | null
  ucapan?: string | null
  kehadiran?: string | null
  pax?: string | number | null
  createdAt?: string | number | null
}

interface KehadiranProps {
  responses?: RSVPResponse[]
}

export default function Kehadiran({ responses = [] }: KehadiranProps) {
  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const norm = (v?: string | null) => (v || '').toString().trim().toUpperCase()

  const attendingPax = responses.reduce((sum, r) => {
    if (norm(r.kehadiran) !== 'HADIR') return sum

    const raw = r.pax ?? 0
    const n =
      typeof raw === 'number'
        ? raw
        : parseInt(raw.toString().replace(/[^\d]/g, ''), 10)

    return sum + (Number.isFinite(n) && n > 0 ? n : 0)
  }, 0)

  const notAttendingCount = responses.reduce((count, r) => {
    return count + (norm(r.kehadiran) === 'TIDAK HADIR' ? 1 : 0)
  }, 0)

  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full">
      <div className="w-full text-center space-y-4">
        <motion.p
          variants={itemVariants}
          className="font-montserrat text-[12px] sm:text-[13px] tracking-[0.26em] uppercase text-stone-600"
        >
          Kehadiran
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="
            grid grid-cols-2 gap-4 sm:gap-6
            rounded-2xl
            border border-stone-200/70
            bg-white/45
            backdrop-blur-sm
            px-5 py-5 sm:px-6 sm:py-6
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
          "
        >
          <div className="space-y-2">
            <p className="font-playfair text-[44px] sm:text-[52px] leading-none text-stone-700 tabular-nums">
              {attendingPax}
            </p>
            <p className="font-montserrat text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-stone-500">
              Hadir
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-playfair text-[44px] sm:text-[52px] leading-none text-stone-700 tabular-nums">
              {notAttendingCount}
            </p>
            <p className="font-montserrat text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-stone-500">
              Tidak Hadir
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <div className="h-px w-full max-w-[320px] bg-gradient-to-r from-transparent via-stone-300/60 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  )
}
