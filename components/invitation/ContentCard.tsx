'use client'

import { motion } from 'framer-motion'
import MukadimahContent from './MukadimahContent'
import DetailsContent from './DetailsContent'
import AturCaraContent from './AturCaraContent'
import MenghitungHariContent from './MenghitungHariContent'
import DoaContent from './DoaContent'
import RSVPContent from './RSVPContent'
import ResponseContent from './ResponseContent'
import AnimatedSection from './AnimatedSection'
import AnimatedDivider from './AnimatedDivider'
import type { SectionRefs } from './useAutoScrollEngine'

type Props = {
  sectionRefs: SectionRefs;
  onUserScrollDoa?: () => void;
};

/**
 * ContentCard Component
 *
 * Main content card with scroll-triggered animations.
 * Each section animates into view as user scrolls down.
 */
export default function ContentCard({ sectionRefs, onUserScrollDoa }: Props) {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="
        relative
        w-full
        max-w-2xl
        mx-auto
        min-h-fit
        rounded-2xl
        shadow-[0_8px_30px_rgb(139,92,46,0.12)]
        border border-amber-100/50
        overflow-hidden
      "
    >
      {/* Full-card gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-cream-50 via-white to-cream-100/60" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_55%)]" />

      {/* Subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDE2djE2SDB6IiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDMiLz48L3N2Zz4=')] opacity-40" />

      {/* Content with scroll-triggered animations */}
      <div className="relative z-20 mx-auto flex w-full max-w-[560px] flex-col items-center px-6 py-12 text-center sm:py-16">
        <div className="w-full space-y-8 sm:space-y-10">
          {/* ✅ Stable anchor for top of ContentCard */}
          <section
            ref={sectionRefs.contentTop as any}
            aria-hidden="true"
            className="h-px w-full"
          />

          {/* Mukadimah */}
          <section ref={sectionRefs.mukadimah as any} className="scroll-mt-24">
            <AnimatedSection type="fade-up">
              <MukadimahContent />
            </AnimatedSection>
          </section>

          <AnimatedDivider />

          {/* Details */}
          <section ref={sectionRefs.details as any} className="scroll-mt-24">
            <AnimatedSection type="scale" delay={0.5}>
              <DetailsContent />
            </AnimatedSection>
          </section>

          <AnimatedDivider delay={0.1} />

          {/* Atur Cara */}
          <section ref={sectionRefs.aturcara as any} className="scroll-mt-24">
            <AnimatedSection type="fade-up" delay={0.5}>
              <AturCaraContent />
            </AnimatedSection>
          </section>

          <AnimatedDivider delay={0.1} />

          {/* Menghitung Hari */}
          <section ref={sectionRefs.menghitungHari as any} className="scroll-mt-24">
            <AnimatedSection type="scale" delay={0.5}>
              <MenghitungHariContent />
            </AnimatedSection>
          </section>

          <AnimatedDivider delay={0.1} />

          {/* Doa */}
          <section ref={sectionRefs.doa as any} className="scroll-mt-24">
            <AnimatedSection type="fade-up" delay={0.5}>
              <DoaContent onUserScrollDoa={onUserScrollDoa} />
            </AnimatedSection>
          </section>

          <AnimatedDivider delay={0.1} />

          {/* RSVP */}
          <section ref={sectionRefs.rsvp as any} className="scroll-mt-24">
            {/* ✅ CTA anchor (fallback): engine will scroll here with block:center */}
            <div
              ref={sectionRefs.rsvpCTA as any}
              aria-hidden="true"
              className="h-px w-full"
            />

            <AnimatedSection type="scale" delay={0.5}>
              <RSVPContent ctaRef={sectionRefs.rsvpCTA as any} />
            </AnimatedSection>
          </section>

          <AnimatedDivider delay={0.1} />

          {/* Responses */}
          <section ref={sectionRefs.responses as any} className="scroll-mt-24">
            <ResponseContent />
          </section>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-20 w-20 border-t-2 border-l-2 border-amber-200/40 rounded-tl-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-20 w-20 border-b-2 border-r-2 border-amber-200/40 rounded-br-2xl" />
    </motion.div>
  )
}
