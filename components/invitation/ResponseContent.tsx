"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Kehadiran, { type RSVPResponse } from "./Kehadiran";
import Ucapan from "./Ucapan";

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyl74kEoMt7iz-3iHI-QOTlyVQJ3K4slFj2yAxyfo9-TaTdx2IY3_oaUQMeq4z3iP5HUg/exec";

interface ResponseContentProps {
  responses?: RSVPResponse[];
  appsScriptUrl?: string;
  showKehadiran?: boolean;
}

export default function ResponseContent({
  responses: externalResponses,
  appsScriptUrl,
  showKehadiran = false,
}: ResponseContentProps) {
  const url = appsScriptUrl || DEFAULT_APPS_SCRIPT_URL;

  const [responses, setResponses] = useState<RSVPResponse[]>(
    externalResponses || [],
  );
  const [isLoading, setIsLoading] = useState(!externalResponses);
  const [error, setError] = useState<string | null>(null);

  const fetchResponses = useCallback(async () => {
    if (externalResponses) return;

    // kalau first load, biar dia show spinner
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();

      if (json?.success) {
        setResponses(json.data || []);
      } else {
        setError("Failed to load responses");
      }
    } catch (err) {
      console.error("Error fetching responses:", err);
      setError("Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  }, [externalResponses, url]);

  useEffect(() => {
    if (externalResponses) {
      setResponses(externalResponses);
      setIsLoading(false);
      setError(null);
      return;
    }

    fetchResponses();
  }, [externalResponses, fetchResponses]);

  useEffect(() => {
    const handleRSVPSubmitted = () => {
      fetchResponses();
    };

    window.addEventListener("rsvp:submitted", handleRSVPSubmitted);

    return () => {
      window.removeEventListener("rsvp:submitted", handleRSVPSubmitted);
    };
  }, [fetchResponses]);

  const containerVariants = useMemo(
    () => ({
      initial: {},
      animate: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 12 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    [],
  );

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="inline-block w-8 h-8 border-3 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
        <p className="mt-4 text-stone-600 font-montserrat text-sm">
          Memuatkan respons...
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          text-center
          py-8
          px-6
          rounded-2xl
          bg-rose-50/70
          border border-rose-200/70
          text-rose-800
        "
      >
        <p className="font-montserrat text-sm">{error}</p>

        {!externalResponses && (
          <button
            type="button"
            onClick={fetchResponses}
            className="
              mt-4
              inline-flex items-center justify-center
              rounded-2xl
              border border-stone-200/70
              bg-white/70
              px-4 py-2
              font-montserrat text-[12px] tracking-[0.18em] uppercase
              text-stone-700
              shadow-sm
              transition
              hover:bg-white/85
            "
          >
            Cuba Lagi
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full"
    >
      <div className="w-full space-y-6 sm:space-y-7 text-center">
        {/* <motion.div variants={itemVariants}>
          <Kehadiran responses={responses} />
        </motion.div> */}
        {/* <motion.div variants={itemVariants} className="flex items-center justify-center py-1">
          <div className="h-px w-full max-w-[360px] bg-gradient-to-r from-transparent via-stone-300/70 to-transparent" />
        </motion.div> */}

        {showKehadiran && (
          <motion.div variants={itemVariants}>
            <Kehadiran responses={responses} />
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <Ucapan responses={responses} />
        </motion.div>
      </div>
    </motion.div>
  );
}
