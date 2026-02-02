'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, X, Heart } from 'lucide-react'

interface Contact {
  name: string
  role: string
  phone: string
  whatsapp?: string
}

interface ContactSheetProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactSheet({ isOpen, onClose }: ContactSheetProps) {
  const contacts: Contact[] = [
    {
      name: 'En Ishak',
      role: 'Ayah',
      phone: '+60104000164',
    },
    {
      name: 'En Aminun',
      role: 'Abang',
      phone: '+60174795951',
      whatsapp: '+60134468948',
    },
  ]

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleWhatsApp = (whatsapp: string) => {
    const whatsappNumber = whatsapp.replace(/\+/g, '')
    window.open(`https://wa.me/${whatsappNumber}`, '_blank')
  }

  const sheetVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

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
            className="fixed bottom-16 sm:bottom-20 left-0 right-0 z-50 px-4 pb-2"
          >
            <div
              className="
                max-w-2xl mx-auto
                rounded-t-3xl overflow-hidden
                bg-white/80 backdrop-blur
                border-t border-x border-stone-200/60
                shadow-[0_-10px_40px_rgba(0,0,0,0.12)]
              "
            >
              {/* Header */}
              <div
                className="
                  flex items-center justify-between
                  px-6 py-4
                  border-b border-stone-200/60
                  bg-gradient-to-r from-cream-50/80 via-white to-cream-100/60
                "
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-white/70 border border-stone-200/60 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-stone-600" />
                  </div>
                  <div>
                    <p className="font-montserrat text-[11px] tracking-[0.22em] uppercase text-stone-500">
                      Hubungi
                    </p>
                    <h3 className="font-playfair text-[18px] sm:text-[20px] text-stone-700">
                      Wakil Keluarga
                    </h3>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-stone-100/70 transition focus:outline-none focus:ring-2 focus:ring-stone-300/40"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-stone-500" strokeWidth={2} />
                </button>
              </div>

              {/* Contact List */}
              <div className="max-h-[60vh] overflow-y-auto divide-y divide-stone-200/50">
                {contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center justify-between
                      px-6 py-5
                      transition-colors
                      hover:bg-stone-50/60
                    "
                  >
                    {/* Info */}
                    <div>
                      <p className="font-playfair text-[16px] text-stone-700">
                        {contact.name}
                      </p>
                      <p className="font-montserrat text-[12px] tracking-[0.12em] uppercase text-stone-500 mt-0.5">
                        {contact.role}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Call (wajib) */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleCall(contact.phone)}
                        className="
                          h-10 w-10 rounded-full
                          bg-white/80
                          border border-stone-200/60
                          flex items-center justify-center
                          shadow-sm hover:shadow-md
                          transition
                          focus:outline-none focus:ring-2 focus:ring-stone-300/40
                        "
                        aria-label={`Call ${contact.name}`}
                      >
                        <Phone className="h-4 w-4 text-stone-600" />
                      </motion.button>

                      {/* WhatsApp (hanya jika ada whatsapp) */}
                      {contact.whatsapp && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleWhatsApp(contact.whatsapp!)}
                          className="
                            h-10 w-10 rounded-full
                            bg-white/80
                            border border-stone-200/60
                            flex items-center justify-center
                            shadow-sm hover:shadow-md
                            transition
                            focus:outline-none focus:ring-2 focus:ring-stone-300/40
                          "
                          aria-label={`WhatsApp ${contact.name}`}
                        >
                          <MessageCircle className="h-4 w-4 text-stone-600" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer hint */}
              <div className="px-6 py-4 text-center">
                <p className="font-montserrat text-[11px] tracking-wide text-stone-500">
                  Sila hubungi sekiranya terdapat sebarang pertanyaan
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
