'use client'

import { motion } from 'framer-motion'

export default function MukadimahContent() {
  const containerVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.14, delayChildren: 0.2 },
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
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full"
    >
      <div className="w-full space-y-6 sm:space-y-8">
        {/* Bismillah */}
        <motion.p
          variants={itemVariants}
          className="font-playfair text-[20px] sm:text-[22px] text-stone-700"
          style={{ direction: 'rtl' }}
        >
          بسم الله الرحمن الرحيم
        </motion.p>

        {/* Salam */}
        <motion.p
          variants={itemVariants}
          className="font-montserrat text-[14px] sm:text-[15px] tracking-[0.06em] text-stone-600"
        >
          Assalamualaikum dan Salam Sejahtera
        </motion.p>

        {/* Parents Names */}
        <motion.div variants={itemVariants} className="space-y-2 pt-2">
          <p className="font-playfair text-[18px] sm:text-[20px] text-stone-700">
            Ishak Bin Hashim
          </p>

          <p className="font-montserrat text-[16px] font-medium tracking-widest text-stone-500">
            &
          </p>

          <p className="font-playfair text-[18px] sm:text-[20px] text-stone-700">
            Che Rozzanni Binti Zakaria
          </p>
        </motion.div>

        {/* Invitation Text */}
        <motion.p
          variants={itemVariants}
          className="font-montserrat mx-auto max-w-[520px] px-1 text-[13px] sm:text-[14px] leading-relaxed text-stone-600"
        >
          sekeluarga menjemput
          <br/>
          {' '}
          <span className="font-medium text-stone-700">Dato | Datin | Tuan | Puan | Cik</span> 
          <br/>
          ke majlis perkahwinan anakanda kami dan pasangannya :
        </motion.p>

        {/* Divider */}
        <motion.div variants={itemVariants} className="flex items-center justify-center py-1">
          <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
        </motion.div>

        {/* Couple Names */}
        <motion.div variants={itemVariants} className="space-y-3">
          <p className="font-greatvibes text-[30px] sm:text-[36px] leading-snug text-stone-700">
            Nur Syafinatulzanis Binti Ishak
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-stone-300/70" />
            <span className="font-montserrat text-[16px] font-medium tracking-widest text-stone-500">
              &
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-stone-300/70" />
          </div>

          <p className="font-greatvibes text-[30px] sm:text-[36px] leading-snug text-stone-700">
            Muhammad Fareez Izhar Bin Mohd Fadzil
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
