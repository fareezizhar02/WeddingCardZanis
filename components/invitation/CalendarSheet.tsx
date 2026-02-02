"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, X } from "lucide-react";

interface CalendarSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarSheet({ isOpen, onClose }: CalendarSheetProps) {
  // Event details
  const title = "Majlis Perkahwinan Syafinatul & Fareez";
  const location =
    "Lot 8, Kampung Baru Pulau Sayak, 08500 Kota Kuala Muda, Kedah";
  const description = "Sila hadir memeriahkan majlis kami. Terima kasih!";
  const timezone = "Asia/Kuala_Lumpur";

  // Google Calendar (UTC)
  const googleStartUTC = "20260418T040000Z";
  const googleEndUTC = "20260418T100000Z";

  const displayDate = "Sabtu, 28 Mac 2026";
  const displayTime = "12:00 PM - 6:00 PM";

  const openGoogleCalendar = () => {
    const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
      text: title,
      dates: `${googleStartUTC}/${googleEndUTC}`,
      details: description,
      location,
      ctz: timezone,
    });
    window.open(`${base}&${params.toString()}`, "_blank");
  };

  const downloadAppleICS = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//CalendarSheet//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:wedding-fareez-zanis-${Date.now()}@weddingcard`,
      `DTSTAMP:${toICSDateTimeUTC(new Date())}`,
      `SUMMARY:${escapeICS(title)}`,
      `DESCRIPTION:${escapeICS(description)}`,
      `LOCATION:${escapeICS(location)}`,
      `DTSTART;TZID=${timezone}:20260328T120000`,
      `DTEND;TZID=${timezone}:20260328T180000`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Fareez-Zanis-Wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const sheetVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          />

          {/* Sheet */}
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 right-0 z-50 px-4 pb-2 bottom-16 sm:bottom-20"
          >
            <div
              className="
                max-w-2xl mx-auto
                rounded-t-3xl
                overflow-hidden
                border-t border-x border-stone-200/70
                bg-white/75
                backdrop-blur
                shadow-[0_-10px_40px_rgba(0,0,0,0.10)]
              "
            >
              {/* Header */}
              <div
                className="
                  flex items-center justify-between
                  px-6 py-4
                  border-b border-stone-200/70
                  bg-gradient-to-r
                  from-cream-50/80
                  via-white
                  to-cream-100/60
                "
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/70 border border-stone-200/70 flex items-center justify-center">
                    <CalendarDays className="h-5 w-5 text-stone-600" />
                  </div>
                  <h3 className="font-playfair text-[18px] sm:text-[20px] text-stone-700">
                    Simpan Tarikh
                  </h3>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-stone-100/70 transition focus:outline-none focus:ring-2 focus:ring-stone-300/40"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-5">
                {/* Date Card */}
                <div className="rounded-2xl border border-stone-200/70 bg-white/60 backdrop-blur-sm p-5 text-center">
                  <p className="font-playfair text-[18px] text-stone-700">
                    {displayDate}
                  </p>
                  <p className="mt-1 font-montserrat text-[13px] tracking-[0.12em] text-stone-500">
                    {displayTime}
                  </p>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Google Calendar */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={openGoogleCalendar}
                    className="
                      rounded-2xl px-4 py-5
                      border border-stone-200/70
                      bg-white/70 backdrop-blur-sm
                      shadow-sm hover:shadow-md transition
                      flex flex-col items-center gap-3
                      focus:outline-none focus:ring-2 focus:ring-stone-300/40
                    "
                  >
                    {/* Google Logo (UNCHANGED) */}
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                    <p className="font-montserrat text-[13px] tracking-[0.06em] text-stone-700">
                      Google Calendar
                    </p>
                  </motion.button>

                  {/* Apple Calendar */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={downloadAppleICS}
                    className="
                      rounded-2xl px-4 py-5
                      border border-stone-200/70
                      bg-white/70 backdrop-blur-sm
                      shadow-sm hover:shadow-md transition
                      flex flex-col items-center gap-3
                      focus:outline-none focus:ring-2 focus:ring-stone-300/40
                    "
                  >
                    {/* Apple Logo (UNCHANGED) */}
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-10 h-10"
                        fill="#000000"
                      >
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                    </div>
                    <p className="font-montserrat text-[13px] tracking-[0.06em] text-stone-700">
                      Apple Calendar
                    </p>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function toICSDateTimeUTC(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(
    date.getUTCDate(),
  )}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(
    date.getUTCSeconds(),
  )}Z`;
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
