'use client'

import MusicPlayer from './MusicPlayer'

interface MusicSectionProps {
  audioRef: React.RefObject<HTMLAudioElement>
  isPlaying: boolean
  onPlayPause: () => void
}

/**
 * MusicSection Component
 *
 * Music player section - themed to match the wedding card style.
 */
export default function MusicSection({ audioRef, isPlaying, onPlayPause }: MusicSectionProps) {
  return (
    <div
      className="
        relative
        w-full
        max-w-2xl
        mx-auto
        overflow-hidden
        rounded-2xl
        border border-stone-200/60
        bg-white/70
        backdrop-blur
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        p-7
        sm:p-10
        md:p-12
      "
    >
      {/* Soft gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-50/90 via-white to-cream-100/70" />

      {/* Subtle radial depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_55%)]" />

      {/* Subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDE2djE2SDB6IiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDMiLz48L3N2Zz4=')]" />

      <div className="relative space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="font-montserrat text-[11px] tracking-[0.22em] uppercase text-stone-500">
            Lagu
          </p>

          <h2 className="font-playfair text-[26px] sm:text-[30px] text-stone-700">
            Lagu Kami
          </h2>

          <p className="font-montserrat text-[12px] sm:text-[13px] tracking-wide text-stone-500">
            Sebuah melodi yang dekat di hati
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center pt-2">
            <div className="h-px w-full max-w-[280px] bg-gradient-to-r from-transparent via-stone-300/60 to-transparent" />
          </div>
        </div>

        {/* Music Player */}
        <MusicPlayer audioRef={audioRef} isPlaying={isPlaying} onPlayPause={onPlayPause} />
      </div>
    </div>
  )
}
