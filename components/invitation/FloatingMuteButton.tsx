'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface FloatingMuteButtonProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

/**
 * FloatingMuteButton Component
 * 
 * Fixed floating button at bottom right for mute/unmute control.
 * Stays visible while scrolling, positioned above the app bar.
 */
export default function FloatingMuteButton({ audioRef }: FloatingMuteButtonProps) {
  const [isMuted, setIsMuted] = useState(false);

  // Sync with audio element's muted state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVolumeChange = () => {
      setIsMuted(audio.muted);
    };

    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [audioRef]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onClick={toggleMute}
      data-autoscroll-safe="true"
      className="
        fixed
        bottom-24
        right-4
        sm:bottom-28
        sm:right-6
        md:right-8
        z-50
        w-14 h-14
        sm:w-16 sm:h-16
        rounded-full
        bg-gradient-to-br
        from-white
        to-cream-50
        hover:from-amber-50
        hover:to-cream-100
        shadow-lg
        hover:shadow-xl
        flex
        items-center
        justify-center
        transition-all
        duration-300
        focus:outline-none
        focus:ring-2
        focus:ring-amber-400/50
        focus:ring-offset-2
        border
        border-amber-200/50
        backdrop-blur-sm
      "
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {/* Pulse animation when playing and unmuted */}
      {!isMuted && (
        <motion.span
          className="
            absolute
            inset-0
            rounded-full
            border-2
            border-amber-400/50
          "
          animate={{
            scale: [1, 1.3, 1.5],
            opacity: [0.5, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      {/* Icon */}
      <motion.div
        animate={{ rotate: isMuted ? 0 : [0, -10, 10, 0] }}
        transition={{
          duration: 0.5,
          times: [0, 0.2, 0.8, 1],
        }}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 sm:w-7 sm:h-7 text-amber-800" />
        ) : (
          <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 text-amber-800" />
        )}
      </motion.div>

      {/* Tooltip hint on hover */}
      <span className="
        absolute
        -top-12
        right-0
        px-3
        py-1.5
        bg-amber-900
        text-white
        text-xs
        rounded-lg
        opacity-0
        group-hover:opacity-100
        pointer-events-none
        transition-opacity
        whitespace-nowrap
        shadow-lg
      ">
        {isMuted ? 'Unmute' : 'Mute'}
      </span>
    </motion.button>
  );
}