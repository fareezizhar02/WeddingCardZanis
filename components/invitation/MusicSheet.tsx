'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Music2, X } from 'lucide-react'
import { useMemo } from 'react'

interface MusicSheetProps {
  isOpen: boolean
  onClose: () => void
}

export default function MusicSheet({ isOpen, onClose }: MusicSheetProps) {
  // YouTube video
  const youtubeUrl = 'https://youtu.be/R5-j5cpFp1c?si=Bf5OyRTaskbBDnTV'
  const startAt = 20

  const videoId = useMemo(() => extractYouTubeId(youtubeUrl), [youtubeUrl])

  // Embed params: start at 20s, modest branding, minimal UI
  const embedSrc = useMemo(() => {
    if (!videoId) return ''
    const params = new URLSearchParams({
      start: String(startAt),
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      controls: '1',
      // NOTE: autoplay often blocked on mobile unless muted + user gesture
      autoplay: '0',
    })
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }, [videoId, startAt])

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
              {/* Header (macam gambar, tapi theme kita) */}
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
                    <Music2 className="h-5 w-5 text-stone-600" strokeWidth={2} />
                  </div>

                  <div className="text-left">
                    <h3 className="font-playfair text-[18px] sm:text-[20px] text-stone-700">
                      Music
                    </h3>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="
                    p-2 rounded-full
                    hover:bg-stone-100/70 transition
                    focus:outline-none focus:ring-2 focus:ring-stone-300/40
                  "
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-stone-500" strokeWidth={2} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-4">
                {/* Video Card */}
                <div
                  className="
                    rounded-2xl
                    border border-stone-200/70
                    bg-white/60
                    backdrop-blur-sm
                    overflow-hidden
                    shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                  "
                >
                  <div className="relative w-full aspect-video bg-stone-100">
                    {embedSrc ? (
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={embedSrc}
                        title="Wedding Music"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="font-montserrat text-sm text-stone-500">
                          Video tidak dapat dimuatkan.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mini info row (optional, still minimal) */}
                  <div className="px-4 py-3 text-center">
                    <p className="font-montserrat text-[12px] tracking-[0.10em] text-stone-500">
                      Bermula pada saat <span className="font-medium text-stone-700">00:{String(startAt).padStart(2, '0')}</span>
                    </p>
                  </div>
                </div>

                {/* Hint text */}
                <p className="text-center font-montserrat text-[12px] leading-relaxed text-stone-500">
                  Tip: Jika video tak bermula pada saat 20, cuba refresh atau tekan play semula.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function extractYouTubeId(url: string) {
  try {
    // Supports: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
    const u = new URL(url)

    if (u.hostname.includes('youtu.be')) {
      return u.pathname.replace('/', '').trim() || null
    }

    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v) return v
      const parts = u.pathname.split('/').filter(Boolean)
      const embedIdx = parts.indexOf('embed')
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1]
    }

    return null
  } catch {
    return null
  }
}
