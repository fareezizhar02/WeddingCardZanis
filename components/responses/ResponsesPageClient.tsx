"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import ResponseContent from "../invitation/ResponseContent";

type RSVPResponse = {
  nama?: string | null;
  ucapan?: string | null;
  kehadiran?: string | null;
  pax?: string | number | null;
  createdAt?: string | number | null;
};

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyl74kEoMt7iz-3iHI-QOTlyVQJ3K4slFj2yAxyfo9-TaTdx2IY3_oaUQMeq4z3iP5HUg/exec";

export default function ResponsesPageClient() {
  const router = useRouter();
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResponses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(APPS_SCRIPT_URL);
      const json = await res.json();

      if (json.success) {
        setResponses(json.data);
      } else {
        setError("Failed to load responses");
      }
    } catch (err) {
      console.error("Error fetching responses:", err);
      setError("Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-cream-100
      via-amber-50/50
      to-stone-100
      px-4
      py-8
      pb-28
      sm:px-6
      sm:py-12
      sm:pb-32
    "
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-white/80
              backdrop-blur-sm
              shadow-md
              hover:shadow-lg
              transition-all
              text-stone-700
              font-medium
              text-sm
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </motion.button>

          {/* Refresh Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchResponses}
            disabled={isLoading}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-white/80
              backdrop-blur-sm
              shadow-md
              hover:shadow-lg
              transition-all
              text-stone-700
              font-medium
              text-sm
              disabled:opacity-50
            "
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        {isLoading && (
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
        )}

        {error && (
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
          </motion.div>
        )}

        {!isLoading && !error && (
          <ResponseContent responses={responses} showKehadiran />
        )}
      </div>
    </div>
  );
}
