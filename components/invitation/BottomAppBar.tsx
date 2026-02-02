'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Music, Calendar, MapPin, Mail, Heart } from 'lucide-react';
import ContactSheet from './ContactSheet';
import RSVPSheet from './RSVPSheet';
import CalendarSheet from './CalendarSheet';
import LocationSheet from './LocationSheet';

type PageType = 'cover' | 'music';
type Panel = 'contact' | 'rsvp' | 'calendar' | 'location' | null;

interface BottomAppBarProps {
  currentPage?: PageType;
  onNavigate?: (page: PageType) => void;
}

/**
 * BottomAppBar Component
 * 
 * Fixed bottom navigation bar with five action buttons.
 * Features blur effect, elegant styling, and tap animations.
 * RSVP is prominently placed in the center.
 */
export default function BottomAppBar({ currentPage, onNavigate }: BottomAppBarProps) {
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);
  const [isRSVPSheetOpen, setIsRSVPSheetOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)

  const closeOthers = (keep: Panel) => {
  if (keep !== 'contact') setIsContactSheetOpen(false);
  if (keep !== 'rsvp') setIsRSVPSheetOpen(false);
  if (keep !== 'calendar') setIsCalendarOpen(false);
  if (keep !== 'location') setIsLocationOpen(false);
};

  const toggleContact = () => {
  setIsContactSheetOpen((open) => {
    const next = !open;
    closeOthers(next ? 'contact' : null);
    return next;
  });
};

const toggleRSVP = () => {
  setIsRSVPSheetOpen((open) => {
    const next = !open;
    closeOthers(next ? 'rsvp' : null);
    return next;
  });
};

const toggleCalendar = () => {
  setIsCalendarOpen((open) => {
    const next = !open;
    closeOthers(next ? 'calendar' : null);
    return next;
  });
};

const toggleLocation = () => {
  setIsLocationOpen((open) => {
    const next = !open;
    closeOthers(next ? 'location' : null);
    return next;
  });
};


  const toggleMusic = () => {
  if (!onNavigate) return;
  closeOthers(null);
  onNavigate(currentPage === 'music' ? 'cover' : 'music');
};

  const closeCalendar = () => setIsCalendarOpen(false)

  // Button configuration - RSVP in the center
  const buttons = [
    {
      id: 'contact',
      label: 'Hubungi',
      icon: Phone,
      onClick: toggleContact,
      isActive: isContactSheetOpen, // optional (kalau nak nampak active)
    },
    {
      id: 'music',
      label: 'Muzik',
      icon: Music,
      onClick: toggleMusic,
      isActive: currentPage === 'music',
    },
    {
      id: 'rsvp',
      label: 'RSVP',
      icon: Mail,
      onClick: toggleRSVP,
      isCenter: true,
      // isActive: isRSVPSheetOpen, // optional (tapi center button styling tak guna isActive)
    },
    {
      id: 'calendar',
      label: 'Kalendar',
      icon: Calendar,
      onClick: toggleCalendar,
      isActive: isCalendarOpen, // optional
    },
    {
      id: 'location',
      label: 'Lokasi',
      icon: MapPin,
      onClick: toggleLocation,
      isActive: isLocationOpen, // optional
    },
  ];

  // Staggered entrance animation for buttons
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      }
    }
  };

  const buttonVariants = {
    initial: { 
      opacity: 0,
      y: 20,
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="
          fixed
          bottom-0
          left-0
          right-0
          h-16
          sm:h-20
          z-50
        "
      >
        {/* Background with blur effect */}
        <div className="
          absolute
          inset-0
          bg-white/90
          backdrop-blur-md
          border-t border-amber-100/50
          shadow-[0_-4px_20px_rgb(139,92,46,0.08)]
          rounded-t-3xl
        "></div>

        {/* Buttons container */}
        <div className="
          relative
          h-full
          max-w-7xl
          mx-auto
          px-2
          sm:px-4
          flex
          items-center
          justify-around
          gap-1
          sm:gap-2
        ">
          {buttons.map((button) => {
            const Icon = button.icon;
            const isActive = button.isActive || false;
            const isCenter = button.isCenter || false;
            
            // Center RSVP button gets special styling
            if (isCenter) {
              return (
                <motion.button
                  key={button.id}
                  variants={buttonVariants}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.08 }}
                  onClick={button.onClick}
                  className="
                    relative
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    flex-1
                    max-w-[120px]
                    py-3
                    px-4
                    rounded-2xl
                    bg-gradient-to-br
                    from-amber-600
                    to-amber-700
                    shadow-lg
                    shadow-amber-500/30
                    hover:shadow-xl
                    hover:shadow-amber-500/40
                    transition-all
                    duration-200
                    focus:outline-none
                    focus:ring-2
                    focus:ring-amber-400/50
                    focus:ring-offset-2
                  "
                  aria-label={button.label}
                >
                  {/* Subtle pulse animation */}
                  <motion.span
                    className="
                      absolute
                      inset-0
                      rounded-2xl
                      bg-amber-400/20
                    "
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Icon */}
                  <Icon 
                    className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10"
                    strokeWidth={2}
                  />
                  
                  {/* Label */}
                  <span className="
                    text-xs
                    sm:text-sm
                    font-semibold
                    tracking-wide
                    uppercase
                    text-white
                    relative
                    z-10
                  ">
                    {button.label}
                  </span>
                </motion.button>
              );
            }
            
            // Regular buttons
            return (
              <motion.button
                key={button.id}
                variants={buttonVariants}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={button.onClick}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  flex-1
                  max-w-[120px]
                  py-2
                  px-3
                  rounded-xl
                  transition-colors
                  duration-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-amber-300/50
                  focus:ring-offset-2
                  ${isActive 
                    ? 'bg-amber-100 text-amber-900' 
                    : 'hover:bg-amber-50 active:bg-amber-100'
                  }
                `}
                aria-label={button.label}
              >
                {/* Icon */}
                <Icon 
                  className={`
                    w-5 h-5 sm:w-6 sm:h-6 
                    transition-transform
                    ${isActive ? 'text-amber-900' : 'text-amber-700'}
                  `}
                  strokeWidth={1.5}
                />
                
                {/* Label */}
                <span className={`
                  text-[10px]
                  sm:text-xs
                  font-medium
                  tracking-wide
                  uppercase
                  ${isActive ? 'text-amber-900' : 'text-amber-800'}
                `}>
                  {button.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Contact Sheet */}
      <ContactSheet 
        isOpen={isContactSheetOpen}
        onClose={() => setIsContactSheetOpen(false)}
      />

      {/* RSVP Sheet */}
      <RSVPSheet 
        isOpen={isRSVPSheetOpen}
        onClose={() => setIsRSVPSheetOpen(false)}
      />

      {/* Location Sheet */}
      <LocationSheet 
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
      
      {/* Calendar Sheet */}
      <CalendarSheet isOpen={isCalendarOpen} onClose={closeCalendar} />
    </>
  );
}