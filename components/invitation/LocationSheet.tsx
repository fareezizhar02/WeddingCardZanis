'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X } from 'lucide-react'

interface LocationSheetProps {
  isOpen: boolean
  onClose: () => void
}

export default function LocationSheet({ isOpen, onClose }: LocationSheetProps) {
  const title = 'Lokasi'
  const address = `No. 6, Jalan Tasik Senangin 12/2,
Seksyen 12, Bandar Tasik Senangin,
71750 Lenggeng, Negeri Sembilan.`

  const WAZE_URL = 'https://waze.com/ul/hw1p25kcg1'
  const GMAPS_URL = 'https://maps.app.goo.gl/Ugw3eNvG3oc4kKyn9?g_st=iw'

  const openLink = (url: string) => window.open(url, '_blank')

  const sheetVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const actionBtnCls = `
    w-full rounded-2xl px-4 py-5
    border border-stone-200/70
    bg-white/70 backdrop-blur-sm
    shadow-sm hover:shadow-md transition
    flex flex-col items-center gap-3
    focus:outline-none focus:ring-2 focus:ring-stone-300/40
  `

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          />

          {/* Sheet */}
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 right-0 z-50 px-4 pb-2 bottom-16 sm:bottom-20"
          >
            <div
              className="
                max-w-2xl mx-auto
                rounded-t-3xl
                overflow-hidden
                border-t border-x border-stone-200/70
                bg-white/75
                backdrop-blur
                shadow-[0_-10px_40px_rgba(0,0,0,0.10)]
              "
            >
              {/* Header */}
              <div
                className="
                  flex items-center justify-between
                  px-6 py-4
                  border-b border-stone-200/70
                  bg-gradient-to-r
                  from-cream-50/80
                  via-white
                  to-cream-100/60
                "
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/70 border border-stone-200/70 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-stone-600" strokeWidth={2} />
                  </div>
                  <h3 className="font-playfair text-[18px] sm:text-[20px] text-stone-700">
                    {title}
                  </h3>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-stone-100/70 transition focus:outline-none focus:ring-2 focus:ring-stone-300/40"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-stone-500" strokeWidth={2} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-5">
                {/* Address Card */}
                <div className="rounded-2xl border border-stone-200/70 bg-white/60 backdrop-blur-sm p-5 text-center">
                  <p className="font-playfair text-[16px] sm:text-[17px] text-stone-700">
                    {address.split('\n').map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <p className="mt-2 font-montserrat text-[12px] tracking-[0.10em] text-stone-500">
                    Klik untuk arah tuju
                  </p>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Waze */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openLink(WAZE_URL)}
                    className={actionBtnCls}
                    aria-label="Buka Waze"
                  >
                    <img
                      src="/images/Waze.png"
                      alt="Waze"
                      className="h-12 w-full object-contain"
                    />
                    <p className="font-montserrat text-[13px] tracking-[0.06em] text-stone-700">
                      Waze
                    </p>
                  </motion.button>

                  {/* Google Maps */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openLink(GMAPS_URL)}
                    className={actionBtnCls}
                    aria-label="Buka Google Maps"
                  >
                    <img
                      src="/images/GMaps.png"
                      alt="Google Maps"
                      className="h-11 w-full object-contain"
                    />
                    <p className="font-montserrat text-[13px] tracking-[0.06em] text-stone-700">
                      Google Maps
                    </p>
                  </motion.button>
                </div>

                <p className="text-center font-montserrat text-[12px] leading-relaxed text-stone-500">
                  Tip: Gunakan Google Maps untuk navigasi yang lebih tepat.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
