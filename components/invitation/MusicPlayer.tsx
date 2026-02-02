'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import Image from 'next/image'

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>
  isPlaying: boolean
  onPlayPause: () => void
}

/**
 * MusicPlayer Component
 *
 * Themed vinyl player (soft wedding aesthetic).
 * Keeps existing logic, refined UI to match the invitation theme.
 */
export default function MusicPlayer({ audioRef, isPlaying, onPlayPause }: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateTime)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateTime)
    }
  }, [audioRef])

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex flex-col items-center space-y-7 sm:space-y-8">
      {/* Vinyl */}
      <div className="relative">
        {/* Outer ring */}
        <div
  className="
    relative
    w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96
    rounded-full
    bg-gradient-to-br from-stone-800 via-stone-900 to-black
    border border-white/10
    shadow-[0_20px_60px_rgba(0,0,0,0.35)]
    flex items-center justify-center
  "
>
          {/* Soft vignette */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.06)_100%)]" />

          {/* Grooves (subtle) */}
          <div className="pointer-events-none absolute inset-0 rounded-full opacity-[0.10]">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-stone-700/20"
                style={{ margin: `${i * 9}px` }}
              />
            ))}
          </div>

          {/* Rotating disc */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 3.4,
              repeat: isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
            className="
              relative
              w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72
              rounded-full
              bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900
              shadow-[inset_0_0_40px_rgba(0,0,0,0.55)]
              flex items-center justify-center
            "
          >
            {/* Inner label */}
            <div
              className="
                relative
                w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56
                rounded-full
                overflow-hidden
                bg-gradient-to-br from-cream-50 to-white
                border border-white/30
                shadow-[inset_0_6px_18px_rgba(0,0,0,0.15)]
              "
            >
              <Image
                src="/images/Izanis.jpeg"
                alt="Album Cover"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Center hole */}
            <div className="absolute w-7 h-7 rounded-full bg-stone-200/90 shadow-[inset_0_2px_8px_rgba(0,0,0,0.25)] border border-stone-300/60" />
          </motion.div>

          {/* Tonearm */}
          <motion.div
            animate={{ rotate: isPlaying ? -22 : -6 }}
            transition={{ duration: 0.45 }}
            className="
              absolute
              top-8 right-10
              w-2 h-32
              rounded-full
              bg-gradient-to-b from-stone-300 to-stone-500
              shadow-md
              origin-top
            "
            style={{ transformOrigin: 'top center' }}
          >
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-stone-700 shadow-sm" />
          </motion.div>
        </div>
      </div>

      {/* Song info */}
      <div className="text-center space-y-1.5">
        <p className="font-montserrat text-[11px] tracking-[0.22em] uppercase text-stone-500">
          Sedang Dimainkan
        </p>
        <h3 className="font-playfair text-[20px] sm:text-[22px] text-stone-700">
          Kota Ini Tak Sama Tanpamu
        </h3>
        <p className="font-montserrat text-[12px] tracking-wide text-stone-500">
          Nadhif Basalamah, Aziz Harun & Aishah Retno
        </p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-md space-y-2">
        <div className="w-full h-1.5 rounded-full bg-stone-200/60 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-stone-600 to-stone-400"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between font-montserrat text-[11px] tracking-wide text-stone-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play/Pause */}
      <div className="flex items-center justify-center">
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
          onClick={onPlayPause}
          className="
            h-14 w-14 sm:h-16 sm:w-16
            rounded-full
            bg-white/75
            border border-stone-200/70
            shadow-sm hover:shadow-md
            backdrop-blur
            flex items-center justify-center
            transition
            focus:outline-none focus:ring-2 focus:ring-stone-300/40
          "
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-stone-700 fill-stone-700" />
          ) : (
            <Play className="w-6 h-6 text-stone-700 fill-stone-700 ml-0.5" />
          )}
        </motion.button>
      </div>

      {/* Note */}
      <p className="font-montserrat text-[11px] tracking-wide text-stone-500/90 text-center max-w-xs">
        Semoga lagu ini menambah seri hari bahagia 🌿
      </p>
    </div>
  )
}
