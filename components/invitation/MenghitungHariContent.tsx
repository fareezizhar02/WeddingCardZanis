'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * MenghitungHariContent
 *
 * Countdown page to wedding date (18 April 2026)
 * Style & font consistent with MukadimahContent
 */

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const TARGET_DATE = new Date('2026-03-28T00:00:00')

export default function MenghitungHariContent() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = TARGET_DATE.getTime() - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

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
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative w-full text-center"
    >
      <div className="mx-auto flex max-w-[520px] flex-col items-center px-6 py-14 sm:py-20 space-y-8">
        {/* Hashtag */}
        <motion.p
          variants={itemVariants}
          className="font-greatvibes text-[22px] sm:text-[24px] text-stone-600"
        >
          #SatuSyafDibelakangFareez
        </motion.p>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="font-playfair text-[22px] sm:text-[24px] uppercase tracking-[0.25em] text-amber-800"
        >
          Menghitung Hari
        </motion.h2>

        {/* Countdown */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-4 gap-6 sm:gap-8"
        >
          {/* Hari */}
          <div className="flex flex-col items-center">
            <span className="font-playfair text-[32px] sm:text-[36px] text-amber-900">
              {timeLeft.days}
            </span>
            <span className="font-montserrat text-[12px] tracking-[0.2em] uppercase text-amber-700/70">
              Hari
            </span>
          </div>

          {/* Jam */}
          <div className="flex flex-col items-center">
            <span className="font-playfair text-[32px] sm:text-[36px] text-amber-900">
              {timeLeft.hours}
            </span>
            <span className="font-montserrat text-[12px] tracking-[0.2em] uppercase text-amber-700/70">
              Jam
            </span>
          </div>

          {/* Minit */}
          <div className="flex flex-col items-center">
            <span className="font-playfair text-[32px] sm:text-[36px] text-amber-900">
              {timeLeft.minutes}
            </span>
            <span className="font-montserrat text-[12px] tracking-[0.2em] uppercase text-amber-700/70">
              Minit
            </span>
          </div>

          {/* Saat */}
          <div className="flex flex-col items-center">
            <span className="font-playfair text-[32px] sm:text-[36px] text-amber-900">
              {timeLeft.seconds}
            </span>
            <span className="font-montserrat text-[12px] tracking-[0.2em] uppercase text-amber-700/70">
              Saat
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
