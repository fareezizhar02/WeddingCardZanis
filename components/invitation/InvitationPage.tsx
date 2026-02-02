"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import InvitationCard from "./InvitationCard";
import MusicSection from "./MusicSection";
import BottomAppBar from "./BottomAppBar";
import EntranceScreen from "./EntranceScreen";
import FloatingMuteButton from "./FloatingMuteButton";
import ContentCard from "./ContentCard";
import SparkleLayer from "./SparkleLayer";

import AutoScrollResumeChip from "./AutoScrollResumeChip";
import { useAutoScrollEngine } from "./useAutoScrollEngine";
import type { SectionRefs } from "./useAutoScrollEngine";

type PageType = "cover" | "music";

export default function InvitationPage() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>("cover");

  // ✅ Top-level refs
  const contentTopRef = useRef<HTMLElement | null>(null);
  const mukadimahRef = useRef<HTMLElement | null>(null);
  const detailsRef = useRef<HTMLElement | null>(null);
  const aturcaraRef = useRef<HTMLElement | null>(null);
  const menghitungHariRef = useRef<HTMLElement | null>(null);
  const doaRef = useRef<HTMLElement | null>(null);
  const rsvpRef = useRef<HTMLElement | null>(null);
  const rsvpCTARef = useRef<HTMLElement>(null);
  const responsesRef = useRef<HTMLElement | null>(null);

  const sectionRefs: SectionRefs = useMemo(
    () => ({
      contentTop: contentTopRef,
      mukadimah: mukadimahRef,
      details: detailsRef,
      aturcara: aturcaraRef,
      menghitungHari: menghitungHariRef,
      doa: doaRef,
      rsvp: rsvpRef,
      rsvpCTA: rsvpCTARef,
      responses: responsesRef,
    }),
    []
  );

  const engineEnabled = hasEntered && currentPage === "cover";

  const autoScroll = useAutoScrollEngine({
    enabled: engineEnabled,
    sectionRefs,
    startDelayMs: 6500,
    resumeChipDelayMs: 2000,
  });

  /**
   * ✅ Stop auto-scroll on user interaction
   * only while engine is running (so resume tap during paused_doa won't be sabotaged)
   */
  useEffect(() => {
    if (!engineEnabled) return;
    if (autoScroll.engineState !== "running") return;

    const stop = () => autoScroll.stopByUser();

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 6) stop();
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (Math.abs(y - touchStartY) > 18) stop();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
      if (keys.includes(e.key)) stop();
    };

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // ✅ kalau klik dekat UI controls, jangan stop
      if (target.closest('[data-autoscroll-safe="true"]')) return;

      stop();
    };

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      const tag = t.tagName?.toLowerCase();
      const isInput = tag === "input" || tag === "textarea" || tag === "select";
      if (isInput) stop();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("focusin", onFocusIn);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("focusin", onFocusIn);
    };
  }, [engineEnabled, autoScroll.engineState, autoScroll.stopByUser]);

  useEffect(() => {
  if (!engineEnabled) return;

  if (autoScroll.engineState !== "paused_doa" && !autoScroll.showResumeChip) return;

  const isSafeTarget = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el) return false;
    return !!el.closest('[data-autoscroll-safe="true"]');
  };

  const dismiss = () => autoScroll.dismissResumeChipByUser();

  const onWheel = (e: WheelEvent) => {
  if (isSafeTarget(e.target)) return;
  if (isInsideDoaScroll(e.target)) return;
  dismiss();
};


  const isInsideDoaScroll = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return !!el.closest('[data-doa-scroll="true"]');
};

const onTouchMove = (e: TouchEvent) => {
  if (isSafeTarget(e.target)) return;
  if (isInsideDoaScroll(e.target)) return; // ✅ scroll doa = ignore
  dismiss();
};


  const onMouseDown = (e: MouseEvent) => {
    if (isSafeTarget(e.target)) return; // ✅ INI YANG PENTING UNTUK RESUME CHIP
    dismiss();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
    if (keys.includes(e.key)) dismiss();
  };

  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("keydown", onKeyDown);

  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("keydown", onKeyDown);
  };
}, [
  engineEnabled,
  autoScroll.engineState,
  autoScroll.showResumeChip,
  autoScroll.dismissResumeChipByUser,
]);




  const handleEnter = async () => {
    window.scrollTo(0, 0);
    setHasEntered(true);

    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    document.body.style.height = "auto";

    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 138;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio play blocked:", error);
      }
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Play failed:", error);
    }
  };

  const goToCoverPage = () => {
    autoScroll.stopByUser();
    setCurrentPage("cover");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  return (
    <div className="relative w-full overflow-x-hidden isolate">
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/MusicBackground.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!hasEntered && <EntranceScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Fixed Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-cream-100 via-amber-50/50 to-stone-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,239,231,0.8),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(251,243,228,0.6),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]" />
      </div>

      {/* Page Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {hasEntered && currentPage === "cover" && (
            <motion.div
              key="cover-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-6 md:px-8 bg-gradient-to-br from-cream-100 via-amber-50/50 to-stone-100">
                <InvitationCard />
              </div>

              <div className="min-h-screen flex items-start justify-center px-0 sm:px-6 md:px-8 py-2 bg-gradient-to-br from-cream-50 to-amber-50/20">
                <ContentCard sectionRefs={sectionRefs} onUserScrollDoa={() => {}} />
              </div>

              <div className="flex items-center justify-center py-0 sm:py-2 bg-gradient-to-br from-cream-50 to-amber-50/20">
                <p className="font-playfair text-[13px] sm:text-[14px] text-stone-600 tracking-wide">
                  Direka Oleh <br />
                  <span className="font-semibold text-stone-700">
                    FareeZanis
                  </span>
                </p>
              </div>

              <div className="h-20 sm:h-24 bg-gradient-to-br from-cream-50 to-amber-50/20" />
            </motion.div>
          )}
        </AnimatePresence>

        {currentPage === "music" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen px-4 py-8 pb-28 sm:px-6 sm:py-12 sm:pb-32 md:px-8 md:py-16 flex items-center justify-center"
          >
            <MusicSection
              audioRef={audioRef}
              isPlaying={isPlaying}
              onPlayPause={togglePlayPause}
            />
            <button
              onClick={goToCoverPage}
              className="fixed top-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-sm text-amber-800 rounded-full font-medium text-sm shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300/50 z-30"
            >
              ← Kembali
            </button>
          </motion.div>
        )}
      </div>

      {hasEntered && <FloatingMuteButton audioRef={audioRef} />}

      {hasEntered && (
        <BottomAppBar
          currentPage={currentPage}
          onNavigate={(p) => {
            autoScroll.stopByUser();
            setCurrentPage(p);
          }}
        />
      )}

      {/* ✅ Auto-scroll indicator (replaces old "Scroll" hint) */}
      {hasEntered &&
        currentPage === "cover" &&
        autoScroll.engineState === "running" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-0 z-[60] flex justify-center pointer-events-none"
            style={{ bottom: "calc(env(safe-area-inset-bottom) + 96px)" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/55 backdrop-blur-md border border-white/40 shadow-[0_10px_25px_rgba(0,0,0,0.10)] text-stone-700">
              <span className="text-[11px] tracking-[0.28em] uppercase">
                Auto-scroll
              </span>
              <motion.span
                aria-hidden
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[12px] leading-none"
              >
                •••
              </motion.span>
            </div>
          </motion.div>
        )}

      <AutoScrollResumeChip visible={autoScroll.showResumeChip} onResume={autoScroll.resumeFromDoa} />

      <SparkleLayer />
    </div>
  );
}
