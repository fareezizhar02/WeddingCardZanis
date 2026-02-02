'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function DoaContent({
  onUserScrollDoa,
}: {
  onUserScrollDoa?: () => void;
}) {
  const containerVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [showScrollCue, setShowScrollCue] = useState(true)

  // Show cue only if content is actually scrollable
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const check = () => {
      const scrollable = el.scrollHeight > el.clientHeight + 8
      // show only at top position
      setShowScrollCue(scrollable && el.scrollTop < 6)
    }

    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)

    window.addEventListener('resize', check)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', check)
    }
  }, [])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    // hide once user scrolls a bit
    setShowScrollCue(el.scrollTop < 6)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full"
    >
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
        {/* Sticky mini title */}
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
            DOA
          </p>
        </div>

        {/* ✅ Scroll cue (appears only when scrollable + still at top) */}
        {showScrollCue && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute left-0 right-0 top-[44px] z-20 flex justify-center"
          >
            <div className="mt-2 flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 backdrop-blur-md border border-white/50 shadow-[0_10px_25px_rgba(0,0,0,0.08)] text-stone-700">
              <span className="font-montserrat text-[10px] tracking-[0.22em] uppercase">
                Swipe untuk baca doa
              </span>

              <motion.span
                aria-hidden
                animate={{ y: [0, 3, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[14px] leading-none"
              >
                ↓
              </motion.span>
            </div>
          </motion.div>
        )}

        {/* Scroll fade indicators */}
        <div className="pointer-events-none absolute left-0 right-0 top-[44px] z-10 h-6 bg-gradient-to-b from-white/90 to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 z-10 h-7 bg-gradient-to-t from-white/85 to-transparent" />

        {/* Scroll area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          data-doa-scroll="true" 
          className="scroll-minimal max-h-[52vh] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6"
        >
          <div className="space-y-5 text-center">
            {/* Bismillah */}
            <motion.p
              variants={itemVariants}
              className="font-playfair text-[20px] sm:text-[22px] text-stone-700"
              style={{ direction: "rtl" }}
            >
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600"
            >
              Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang
            </motion.p>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center py-1"
            >
              <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
            </motion.div>

            {/* Intro */}
            <motion.p
              variants={itemVariants}
              className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600"
            >
              Ya Allah Ya Rahman Ya Rahim,
              <br />
              kami memohon kepada-Mu agar Engkau limpahkan keberkatan dan rahmat
              ke atas perkahwinan:
            </motion.p>

            {/* Names */}
            <motion.div variants={itemVariants} className="space-y-2 pt-1">
              <p className="font-playfair text-[18px] sm:text-[20px] text-stone-700">
                Muhammad Fareez Izhar Bin Mohd Fadzil
              </p>
              <p className="font-montserrat text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-stone-500">
                dan pasangannya
              </p>
              <p className="font-playfair text-[18px] sm:text-[20px] text-stone-700">
                Nur Syafinatulzanis Binti Ishak
              </p>
            </motion.div>

            {/* Hadith */}
            <motion.p
              variants={itemVariants}
              className="font-montserrat mx-auto max-w-[520px] text-[13px] sm:text-[14px] leading-relaxed text-stone-600"
            >
              Sebagaimana doa Rasulullah ﷺ kepada pasangan yang baru mendirikan
              rumah tangga:
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-playfair text-[18px] sm:text-[20px] text-stone-700"
              style={{ direction: "rtl" }}
            >
              بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي
              الْخَيْرِ
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600"
            >
              “Semoga Allah memberkati kamu, melimpahkan keberkatan ke atas
              perkahwinan kamu, dan menghimpunkan kamu berdua dalam kebaikan.”
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-montserrat text-[12px] sm:text-[13px] tracking-[0.06em] text-stone-500"
            >
              (Hadis Riwayat Tirmizi, Hadis Hasan Sahih)
            </motion.p>

            {/* Continuous doa */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600">
                Ya Allah, jadikanlah perkahwinan mereka kekal hingga ke akhir
                hayat, peliharalah mereka daripada perpisahan dan perselisihan.
              </p>

              <p className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600">
                Kurniakanlah kepada mereka hati yang saling memahami, mampu
                bergelak tawa bersama, dan bersabar serta setia dalam susah dan
                senang.
              </p>

              <p className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600">
                Lapangkanlah rezeki mereka, berkatilah setiap usaha dan langkah
                kehidupan mereka, serta kurniakan kejayaan di dunia dan di
                akhirat.
              </p>

              <p className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600">
                Ya Allah, jadikanlah perkahwinan ini sumber kebaikan kepada
                agama-Mu, memberi manfaat kepada keluarga, serta membawa
                kebaikan dan contoh yang baik kepada masyarakat.
              </p>

              <p className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600">
                Dan sekiranya Engkau kurniakan mereka zuriat, maka jadikanlah
                anak-anak mereka elok rupa parasnya, mulia akhlaknya, taat
                kepada ibu bapa, serta berjuang dan beristiqamah di jalan-Mu.
              </p>
            </motion.div>

            {/* Quran */}
            <motion.div variants={itemVariants} className="space-y-3 pt-1">
              <p
                className="font-playfair text-[18px] sm:text-[20px] text-stone-700"
                style={{ direction: "rtl" }}
              >
                رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ
                أَعْيُنٍ
                <br />
                وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
              </p>

              <p className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600">
                “Wahai Tuhan kami, kurniakanlah kepada kami pasangan dan zuriat
                sebagai penyejuk mata, dan jadikanlah kami pemimpin bagi
                orang-orang yang bertakwa.”
              </p>

              <p className="font-montserrat text-[12px] sm:text-[13px] tracking-[0.06em] text-stone-500">
                (Surah Al-Furqan, 25:74)
              </p>
            </motion.div>

            {/* Ameen */}
            <motion.p
              variants={itemVariants}
              className="font-playfair text-[18px] sm:text-[20px] text-stone-700 pt-1"
              style={{ direction: "rtl" }}
            >
              آمِيْن يَا رَبَّ العَالَمِيْن
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-montserrat text-[13px] sm:text-[14px] leading-relaxed text-stone-600"
            >
              Kabulkanlah doa kami,
              <br />
              wahai Tuhan sekalian alam.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
