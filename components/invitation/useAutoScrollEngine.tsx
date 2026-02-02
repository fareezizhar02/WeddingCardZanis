'use client';

import * as React from 'react';

type EngineState = 'idle' | 'running' | 'paused_doa' | 'stopped_user' | 'done';

export type SectionKey =
  | 'contentTop'
  | 'mukadimah'
  | 'details'
  | 'aturcara'
  | 'menghitungHari'
  | 'doa'
  | 'rsvp'
  | 'rsvpCTA'
  | 'responses';

export type SectionRefs = Record<SectionKey, React.RefObject<HTMLElement>>;

type Args = {
  enabled: boolean;
  sectionRefs: SectionRefs;
  startDelayMs?: number;
  resumeChipDelayMs?: number;
};

const DEFAULTS = { startDelayMs: 5500, resumeChipDelayMs: 2000 };

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function getScrollEl(): HTMLElement {
  return (document.scrollingElement || document.documentElement) as HTMLElement;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getScrollMarginTop(el: HTMLElement) {
  const v = window.getComputedStyle(el).scrollMarginTop;
  const n = parseFloat(v || "0");
  return Number.isFinite(n) ? n : 0;
}

function getTargetScrollTop(el: HTMLElement, block: ScrollLogicalPosition) {
  const scroller = getScrollEl();
  const current = scroller.scrollTop;

  const rect = el.getBoundingClientRect();
  const elTop = rect.top + current;

  const marginTop = getScrollMarginTop(el);

  if (block === "center") {
    const viewportH = window.innerHeight || scroller.clientHeight || 0;
    const elCenter = elTop + rect.height / 2;
    return elCenter - viewportH / 2; // center (no scroll-mt)
  }

  // default: start (respect scroll-mt / scrollMarginTop)
  return elTop - marginTop;
}

/**
 * Cinematic scroll:
 * - duration depends on distance
 * - cancels if shouldCancel() becomes true
 */
async function scrollToEl(
  el: HTMLElement,
  block: ScrollLogicalPosition = "start",
  shouldCancel?: () => boolean
) {
  const scroller = getScrollEl();

  // reduced motion: jump
  if (prefersReducedMotion()) {
    const target = clamp(getTargetScrollTop(el, block), 0, scroller.scrollHeight - scroller.clientHeight);
    scroller.scrollTop = target;
    return;
  }

  const start = scroller.scrollTop;
  const rawTarget = getTargetScrollTop(el, block);
  const maxScroll = scroller.scrollHeight - scroller.clientHeight;
  const target = clamp(rawTarget, 0, maxScroll);

  const distance = Math.abs(target - start);

  // ✅ cinematic duration based on distance
  // tweak numbers freely:
  const duration = clamp(450 + distance * 0.35, 650, 2000); // ms

  if (distance < 2) return;

  const startTime = performance.now();

  return new Promise<void>((resolve) => {
    const tick = (now: number) => {
      if (shouldCancel?.()) return resolve();

      const t = clamp((now - startTime) / duration, 0, 1);
      const eased = easeInOutCubic(t);

      scroller.scrollTop = start + (target - start) * eased;

      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };

    requestAnimationFrame(tick);
  });
}


export function useAutoScrollEngine({
  enabled,
  sectionRefs,
  startDelayMs = DEFAULTS.startDelayMs,
  resumeChipDelayMs = DEFAULTS.resumeChipDelayMs,
}: Args) {
  const [engineState, setEngineState] = React.useState<EngineState>('idle');
  const [showResumeChip, setShowResumeChip] = React.useState(false);

  const stopReasonRef = React.useRef<'none' | 'user' | 'done'>('none');
  const startTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = React.useCallback(() => {
    if (startTimerRef.current) clearTimeout(startTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    startTimerRef.current = null;
    resumeTimerRef.current = null;
  }, []);

  const stopByUser = React.useCallback(() => {
    if (stopReasonRef.current === 'done') return;

    // ✅ When paused at doa, don't convert to "user stopped".
    // Pause is intentional and Resume button must remain functional.
    if (engineState === 'paused_doa') {
      return;
    }

    stopReasonRef.current = 'user';
    clearTimers();
    setShowResumeChip(false);
    setEngineState('stopped_user');

    // ✅ break any smooth scroll immediately
    window.scrollTo({ top: window.scrollY, behavior: 'auto' });
  }, [clearTimers, engineState]);

  const dismissResumeChipByUser = React.useCallback(() => {
  if (stopReasonRef.current !== 'none') return;

  stopReasonRef.current = 'user';
  clearTimers();
  setShowResumeChip(false);
  setEngineState('stopped_user');
}, [clearTimers]);

  const markDone = React.useCallback(() => {
    stopReasonRef.current = 'done';
    clearTimers();
    setShowResumeChip(false);
    setEngineState('done');
  }, [clearTimers]);

  const pauseAtDoa = React.useCallback(() => {
    if (stopReasonRef.current !== 'none') return;

    clearTimers();
    setEngineState('paused_doa');
    setShowResumeChip(false);

    resumeTimerRef.current = setTimeout(() => {
      if (stopReasonRef.current === 'none') setShowResumeChip(true);
    }, resumeChipDelayMs);
  }, [clearTimers, resumeChipDelayMs]);

  const snoozeResumeChip = React.useCallback((ms: number = 1200) => {
  if (engineState !== 'paused_doa') return;
  if (stopReasonRef.current !== 'none') return;

  // hide now
  setShowResumeChip(false);

  // re-show after idle
  if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  resumeTimerRef.current = setTimeout(() => {
    if (stopReasonRef.current === 'none' && engineState === 'paused_doa') {
      setShowResumeChip(true);
    }
  }, ms);
}, [engineState]);


  const run = React.useCallback(async () => {
    if (!enabled) return;
    if (stopReasonRef.current !== 'none') return;

    setEngineState('running');

    const getEl = (k: SectionKey) => sectionRefs[k]?.current || null;

    // MUKADIMAH SKIPPED
    const contentTop = getEl('contentTop');
    if (!contentTop) return;

    await scrollToEl(contentTop, "start", () => stopReasonRef.current !== "none");
    if (stopReasonRef.current !== 'none') return;
    await sleep(7000);

    // const mukadimah = getEl('mukadimah');
    // if (mukadimah) {
    //   await scrollToEl(mukadimah, 'start');
    //   if (stopReasonRef.current !== 'none') return;
    //   await sleep(10000);
    // }

    const details = getEl('details');
    if (details) {
      await scrollToEl(details, "start", () => stopReasonRef.current !== "none");
      if (stopReasonRef.current !== 'none') return;
      await sleep(5000);
    }

    const aturcara = getEl('aturcara');
    if (aturcara) {
      await scrollToEl(aturcara, "start", () => stopReasonRef.current !== "none");
      if (stopReasonRef.current !== 'none') return;
      await sleep(3000);
    }

    const menghitungHari = getEl('menghitungHari');
    if (menghitungHari) {
      await scrollToEl(menghitungHari, "start", () => stopReasonRef.current !== "none");
      if (stopReasonRef.current !== 'none') return;
      await sleep(3000);
    }

    const doa = getEl('doa');
    if (doa) {
      await scrollToEl(doa, "start", () => stopReasonRef.current !== "none");
      if (stopReasonRef.current !== 'none') return;
      await sleep(0);
      pauseAtDoa();
      return;
    }

    const rsvpTarget = getEl('rsvpCTA') || getEl('rsvp');
    if (rsvpTarget) {
      await scrollToEl(rsvpTarget, 'center', () => stopReasonRef.current !== 'none');
      if (stopReasonRef.current !== 'none') return;
      await sleep(5000);
    }

    const responses = getEl('responses');
    if (responses) await scrollToEl(responses, 'start', () => stopReasonRef.current !== 'none');

    markDone();
  }, [enabled, sectionRefs, pauseAtDoa, markDone]);

  const start = React.useCallback(() => {
    if (!enabled) return;
    stopReasonRef.current = 'none';
    clearTimers();
    setShowResumeChip(false);
    setEngineState('idle');

    startTimerRef.current = setTimeout(() => {
      run();
    }, startDelayMs);
  }, [enabled, run, startDelayMs, clearTimers]);

  const resumeFromDoa = React.useCallback(async () => {
    if (engineState !== 'paused_doa') return;
    if (stopReasonRef.current !== 'none') return;

    // ✅ break inertia / smooth scroll before we continue
    window.scrollTo({ top: window.scrollY, behavior: 'auto' });

    setShowResumeChip(false);
    clearTimers();
    setEngineState('running');

    const rsvpTarget = sectionRefs.rsvpCTA.current || sectionRefs.rsvp.current;
    if (rsvpTarget) {
      await scrollToEl(rsvpTarget as HTMLElement, 'center');
      if (stopReasonRef.current !== 'none') return;
      await sleep(2000);
    }

    const responses = sectionRefs.responses.current;
    if (responses) await scrollToEl(responses as HTMLElement, 'start');

    markDone();
  }, [engineState, sectionRefs, clearTimers, markDone]);

  React.useEffect(() => {
    clearTimers();

    if (!enabled) {
      stopReasonRef.current = 'none';
      setShowResumeChip(false);
      setEngineState('idle');
      return;
    }

    start();
    return () => clearTimers();
  }, [enabled, start, clearTimers]);

  return {
    engineState,
    showResumeChip,
    start,
    resumeFromDoa,
    stopByUser,
    dismissResumeChipByUser, 
    snoozeResumeChip,
  };
}
