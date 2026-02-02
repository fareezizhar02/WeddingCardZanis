"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Playfair_Display, Great_Vibes, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function CoverPage() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/cp2.png"
          alt="Wedding Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 h-full w-full flex items-start justify-center px-6 pt-[30vh] min-[375px]:pt-[30vh] min-[390px]:pt-[30vh] sm:pt-[18vh]">
        <div className="w-full max-w-[420px] sm:max-w-[520px] flex flex-col items-center text-center">
          {/* WALIMATULURUS */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${playfair.className} uppercase tracking-[0.3em] text-stone-700 font-semibold min-[390px]:text-[21px]`}
            style={{
              marginBottom: "clamp(18px, 4.5vw, 32px)",
            }}
          >
            Walimatulurus
          </motion.h2>

          {/* Names Block */}
          <div
            className="flex flex-col items-center"
            style={{ marginBottom: "clamp(18px, 4.5vw, 34px)" }}
          >
            {/* Name 1 */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.35 }}
              className={`${greatVibes.className} leading-[0.9] text-stone-700 min-[390px]:text-[88px]`}
              style={{
                fontSize: "clamp(60px, 14vw, 82px)", // ✅ BASE untuk <390px (375 pun okay)
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.4, ease: "easeInOut" }}
              >
                Syafinatul
              </motion.span>
            </motion.h1>

            {/* & */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2.2,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`${montserrat.className} font-medium tracking-widest text-stone-700 min-[390px]:text-[30px]`}
              style={{
                fontSize: "clamp(22px, 5.5vw, 28px)",
                marginTop: "clamp(6px, 1.6vw, 10px)",
                marginBottom: "clamp(6px, 1.6vw, 10px)",
              }}
            >
              &
            </motion.p>

            {/* Name 2 */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.35 }}
              className={`${greatVibes.className} leading-[0.9] text-stone-700 min-[390px]:text-[88px]`}
              style={{
                fontSize: "clamp(60px, 14vw, 82px)", // ✅ BASE untuk <390px (375 pun okay)
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8, duration: 1.4, ease: "easeInOut" }}
              >
                Fareez
              </motion.span>
            </motion.h1>
          </div>

          {/* Date (single line) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 4.3,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${montserrat.className} text-stone-700 font-medium tracking-[0.22em] uppercase min-[390px]:text-[15px]`}
          >
            28 Mac 2026
          </motion.div>

          {/* Hashtag */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 4.9, // masuk lepas Date settle
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`${greatVibes.className} text-stone-600 min-[390px]:text-[24px]`}
  style={{
    fontSize: 'clamp(17px, 4.5vw, 21px)', // base <390
    marginTop: 'clamp(14px, 3.5vw, 22px)',
  }}
          >
            #SatuSyafDibelakangFareez
          </motion.p>
        </div>
      </div>

      {/* Optional: help spacing for tiny screens */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-12" />
    </div>
  );
}
