"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface EntranceScreenProps {
  onEnter: () => void;
}

export default function EntranceScreen({ onEnter }: EntranceScreenProps) {
  const [opening, setOpening] = useState(false);

  const handleStampClick = () => {
    if (opening) return; // Prevent double-click
    setOpening(true);

    // Call onEnter after animation completes
    setTimeout(() => {
      onEnter();
    }, 1100); // Slightly after animation ends for smooth transition
  };

  // Left panel animation
  const leftPanelVariants = {
    initial: {
      x: 0,
      rotateY: 0,
    },
    opening: {
      x: "-100%",
      rotateY: -8,
      transition: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96], // Cinematic easing
      },
    },
  };

  // Right panel animation
  const rightPanelVariants = {
    initial: {
      x: 0,
      rotateY: 0,
    },
    opening: {
      x: "100%",
      rotateY: 8,
      transition: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  // Stamp animation
  const stampVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    pulse: {
      scale: [1, 1.06, 1],
      transition: {
        duration: 1.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
    clicked: {
      scale: 0.85,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    opening: {
      scale: 0.85,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  // Seam line animation
  const seamVariants = {
    initial: {
      opacity: 1,
      scaleY: 1,
    },
    opening: {
      opacity: 0,
      scaleY: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  // Overlay fade out
  const overlayVariants = {
    initial: {
      opacity: 1,
    },
    opening: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: "easeIn",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="initial"
        animate={opening ? "opening" : "initial"}
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-[#D4C4A8]
          overflow-hidden
          overscroll-none
                "
        style={{ perspective: "1000px" }}
      >
        {/* Envelope Container */}
        <div
          className="
          relative
          w-full
          max-w-md
          h-full
          flex
        "
        >
          {/* Left Panel */}
          <motion.div
            variants={leftPanelVariants}
            initial="initial"
            animate={opening ? "opening" : "initial"}
            className="
              relative
              flex-1
              bg-gradient-to-br
              from-[#E8DCC8]
              to-[#D4C4A8]
              shadow-[inset_-4px_0_12px_rgba(0,0,0,0.08)]
              border-r-[0.5px]
              border-[#B8A68E]/30
            "
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
            }}
          >
            {/* Paper texture overlay */}
            <div
              className="
              absolute
              inset-0
              bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjAzIi8+PC9zdmc+')]
              opacity-40
              pointer-events-none
            "
            ></div>
          </motion.div>

          {/* Center Seam Line */}
          <motion.div
            variants={seamVariants}
            initial="initial"
            animate={opening ? "opening" : "initial"}
            className="
              absolute
              left-1/2
              top-0
              bottom-0
              w-[1px]
              bg-gradient-to-b
              from-transparent
              via-[#8B7355]/20
              to-transparent
              -translate-x-1/2
              z-10
            "
          />

          {/* Right Panel */}
          <motion.div
            variants={rightPanelVariants}
            initial="initial"
            animate={opening ? "opening" : "initial"}
            className="
              relative
              flex-1
              bg-gradient-to-bl
              from-[#E8DCC8]
              to-[#D4C4A8]
              shadow-[inset_4px_0_12px_rgba(0,0,0,0.08)]
              border-l-[0.5px]
              border-[#B8A68E]/30
            "
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "right center",
            }}
          >
            {/* Paper texture overlay */}
            <div
              className="
              absolute
              inset-0
              bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjAzIi8+PC9zdmc+')]
              opacity-40
              pointer-events-none
            "
            ></div>
          </motion.div>

          {/* Red Wax Stamp Button - Centered on Screen */}
          <motion.button
            variants={stampVariants}
            initial="initial"
            whileTap={!opening ? "clicked" : undefined}
            animate={opening ? "opening" : "pulse"} // 👈 ni
            onClick={handleStampClick}
            disabled={opening}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none focus:ring-4 focus:ring-amber-400/50 rounded-full disabled:cursor-not-allowed"
            aria-label="Open invitation"
            style={{
              filter: "drop-shadow(0 8px 16px rgba(139, 69, 19, 0.3))",
              marginLeft: "-70px",
              marginTop: "-70px",
            }}
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <Image
                src="/images/redstamp.png"
                alt="Wax Seal"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.button>

          {/* Hint Text - Raised Up */}
          {!opening && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="
                absolute
                bottom-8
                left-1/2
                -translate-x-1/2
                text-xs
                text-BLACK
                text-bold
                font-montserrat
                italic
                text-center
                z-30
                px-4
              "
            >
              TEKAN UNTUK BUKA
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
