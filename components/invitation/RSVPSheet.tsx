"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Heart } from "lucide-react";
import { useState } from "react";

interface RSVPSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * RSVPSheet Component
 *
 * Bottom sheet that slides up showing RSVP form.
 * Submits data directly to Google Form.
 */
export default function RSVPSheet({ isOpen, onClose }: RSVPSheetProps) {
  const [formData, setFormData] = useState({
    nama: "",
    kehadiran: "",
    pax: "",
    ucapan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Google Form configuration (RSVP Zanis)
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSehCLmDtdzoiiDrXzk_bwV0G7SlO731MHhVs1ollr320G0uKw/formResponse";

const ENTRY_IDS = {
  nama: "entry.1843879003",
  kehadiran: "entry.478044054",
  pax: "entry.897111137",
  ucapan: "entry.253132264",
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append(ENTRY_IDS.nama, formData.nama);
      formDataToSubmit.append(ENTRY_IDS.kehadiran, formData.kehadiran);
      formDataToSubmit.append(ENTRY_IDS.pax, formData.pax);
      formDataToSubmit.append(ENTRY_IDS.ucapan, formData.ucapan);

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        body: formDataToSubmit,
        mode: "no-cors",
      });

      window.dispatchEvent(new Event("rsvp:submitted"));

      setSubmitStatus("success");

      setTimeout(() => {
        setFormData({
          nama: "",
          kehadiran: "",
          pax: "",
          ucapan: "",
        });
        setSubmitStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "kehadiran" && value === "HADIR") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        pax: prev.pax || "1",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Animation variants
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

  // Shared classes (theme-consistent)
  const labelCls =
    "block font-montserrat text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-stone-600 mb-2";
  const inputCls = `
    w-full
    px-4 py-3
    rounded-2xl
    border border-stone-200/80
    bg-white/60
    text-stone-800
    placeholder:text-stone-400
    outline-none
    transition-all
    focus:bg-white/80
    focus:border-stone-300
    focus:ring-2
    focus:ring-stone-300/35
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - click to close */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="
              fixed inset-0 z-40
              bg-black/20
              backdrop-blur-[2px]
            "
          />

          {/* RSVP Sheet */}
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed
              bottom-16 sm:bottom-20
              left-0 right-0
              z-50
              px-4 pb-2
            "
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
                  relative
                  flex items-center justify-between
                  px-6 py-4
                  border-b border-stone-200/70
                  bg-gradient-to-r
                  from-cream-50/80
                  via-white
                  to-cream-100/60
                "
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-stone-500" />
                  <div className="text-left">
                    <p className="font-montserrat text-[11px] tracking-[0.22em] uppercase text-stone-500">
                      Maklumat Kehadiran
                    </p>
                    <h3 className="font-playfair text-[18px] sm:text-[20px] text-stone-700">
                      RSVP
                    </h3>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="
                    p-2 rounded-full
                    hover:bg-stone-100/70
                    transition-colors
                    focus:outline-none
                    focus:ring-2
                    focus:ring-stone-300/40
                  "
                  aria-label="Close"
                >
                  <X className="h-5 w-5 text-stone-500" strokeWidth={2} />
                </button>
              </div>

              {/* Form Content */}
              <div className="scroll-minimal max-h-[70vh] overflow-y-auto px-6 py-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nama */}
                  <div>
                    <label htmlFor="nama" className={labelCls}>
                      Nama <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                      className={inputCls}
                      placeholder="Nama anda"
                    />
                  </div>

                  {/* Kehadiran */}
                  <div>
                    <label htmlFor="kehadiran" className={labelCls}>
                      Kehadiran <span className="text-rose-600">*</span>
                    </label>
                    <select
                      id="kehadiran"
                      name="kehadiran"
                      value={formData.kehadiran}
                      onChange={handleChange}
                      required
                      className={inputCls}
                    >
                      <option value="">Pilih kehadiran</option>
                      <option value="HADIR">Hadir</option>
                      <option value="TIDAK HADIR">Tidak Hadir</option>
                    </select>
                  </div>

                  {/* Pax (only show if attending) */}
                  {formData.kehadiran === "HADIR" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label htmlFor="pax" className={labelCls}>
                        Bilangan Pax <span className="text-rose-600">*</span>
                      </label>

                      {/* Custom number input with visible buttons */}
                      <div className="flex items-center gap-3">
                        {/* Decrease Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const currentPax = parseInt(
                              formData.pax || "1",
                              10,
                            );
                            if (currentPax > 1) {
                              setFormData((prev) => ({
                                ...prev,
                                pax: (currentPax - 1).toString(),
                              }));
                            }
                          }}
                          className="
                            flex-shrink-0
                            w-12 h-12
                            rounded-xl
                            border border-stone-300
                            bg-white
                            hover:bg-stone-50
                            active:bg-stone-100
                            transition-colors
                            flex items-center justify-center
                            text-stone-700
                            font-semibold
                            text-xl
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                          "
                          disabled={parseInt(formData.pax || "1", 10) <= 1}
                          aria-label="Decrease pax"
                        >
                          −
                        </button>

                        {/* Number Display/Input */}
                        <input
                          type="number"
                          id="pax"
                          name="pax"
                          value={formData.pax || "1"}
                          onChange={handleChange}
                          required
                          min="1"
                          max="99"
                          readOnly
                          className={`
                            ${inputCls}
                            flex-1
                            text-center
                            font-semibold
                            text-2xl
                            cursor-default
                            [appearance:textfield]
                            [&::-webkit-outer-spin-button]:appearance-none
                            [&::-webkit-inner-spin-button]:appearance-none
                          `}
                        />

                        {/* Increase Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const currentPax = parseInt(
                              formData.pax || "1",
                              10,
                            );
                            if (currentPax < 99) {
                              setFormData((prev) => ({
                                ...prev,
                                pax: (currentPax + 1).toString(),
                              }));
                            }
                          }}
                          className="
          flex-shrink-0
          w-12 h-12
          rounded-xl
          border border-stone-300
          bg-white
          hover:bg-stone-50
          active:bg-stone-100
          transition-colors
          flex items-center justify-center
          text-stone-700
          font-semibold
          text-xl
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
                          disabled={parseInt(formData.pax || "1", 10) >= 99}
                          aria-label="Increase pax"
                        >
                          +
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Ucapan */}
                  <div>
                    <label htmlFor="ucapan" className={labelCls}>
                      Ucapan Kepada Pengantin
                    </label>
                    <textarea
                      id="ucapan"
                      name="ucapan"
                      value={formData.ucapan}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputCls} resize-none`}
                      placeholder="Tulis ucapan anda di sini..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "success"}
                    whileTap={{ scale: 0.98 }}
                    className="
                      w-full
                      py-3.5
                      rounded-2xl
                      bg-gradient-to-r
                      from-stone-700
                      to-stone-800
                      text-white
                      font-montserrat
                      text-[13px] sm:text-[14px]
                      font-medium
                      tracking-[0.10em]
                      shadow-lg
                      shadow-stone-600/20
                      hover:shadow-xl
                      hover:shadow-stone-600/25
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                      transition-all
                      duration-200
                      flex items-center justify-center gap-2
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="h-5 w-5 border-2 border-white/90 border-t-transparent rounded-full"
                        />
                        Menghantar...
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <Heart className="h-5 w-5" fill="currentColor" />
                        Terima Kasih!
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Hantar RSVP
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="
                        rounded-2xl
                        border border-emerald-200/70
                        bg-emerald-50/70
                        p-4
                        text-center
                      "
                    >
                      <p className="font-montserrat text-[13px] sm:text-[14px] text-emerald-800">
                        RSVP anda telah berjaya dihantar! 🎉
                      </p>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="
                        rounded-2xl
                        border border-rose-200/70
                        bg-rose-50/70
                        p-4
                        text-center
                      "
                    >
                      <p className="font-montserrat text-[13px] sm:text-[14px] text-rose-800">
                        Maaf, terdapat masalah. Sila cuba lagi.
                      </p>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
