'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function SparkleLayer() {
  const sparkles = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
  const duration = Math.random() * 10 + 12;
  return {
    id: i,
    size: Math.random() < 0.3
      ? Math.random() * 6 + 10
      : Math.random() * 6 + 5,
    left: Math.random() * 100,
    startY: Math.random() * 120 - 20,
    duration,
    delay: Math.random() * duration,
    opacity: Math.random() * 0.35 + 0.35,
    isWhite: Math.random() < 0.3,
    drift: Math.random() * 24 + 10,
    rotate: Math.random() * 40 - 20,
  };
});

  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[50] overflow-hidden">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          initial={{ y: `${s.startY}vh`, opacity: 0, x: 0 }}
          animate={{
            y: '-25vh',
            x: [0, s.drift, 0, -s.drift, 0], // ✅ sway
            opacity: [0, s.opacity, s.opacity, 0], // ✅ longer “visible” window
            rotate: [0, s.rotate, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: s.isWhite
              ? 'rgba(255,255,255,0.95)'
              : 'rgba(255,215,150,0.95)',
            boxShadow: s.isWhite
  ? "0 0 14px rgba(255,255,255,0.7)"
  : "0 0 14px rgba(255,200,120,0.6)",
filter: "blur(0.5px)",

          }}
        />
      ))}
    </div>
  );
}
