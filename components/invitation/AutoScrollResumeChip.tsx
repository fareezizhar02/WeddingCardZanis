import { motion, AnimatePresence } from "framer-motion";

export default function AutoScrollResumeChip({
  visible,
  onResume,
}: {
  visible: boolean;
  onResume: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 z-[80] flex justify-center pointer-events-none"
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 128px)" }}
        >
          <motion.button
            type="button"
            onClick={onResume}
            data-autoscroll-safe="true"
            className="
              pointer-events-auto
              inline-flex items-center gap-2
              rounded-full
              px-5 py-3
              bg-stone-900/85
              text-white
              border border-white/15
              shadow-[0_14px_35px_rgba(0,0,0,0.25)]
              backdrop-blur-md
              font-montserrat
              text-[12px]
              tracking-[0.18em]
              uppercase
              active:scale-[0.98]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/35
            "
            aria-label="Sambung auto-scroll"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{ boxShadow: ["0_14px_35px_rgba(0,0,0,0.20)", "0_14px_35px_rgba(0,0,0,0.35)", "0_14px_35px_rgba(0,0,0,0.20)"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[14px] leading-none">▶</span>
            Sambung Auto-scroll
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
