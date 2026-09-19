"use client";

import React, { useEffect, useState } from "react";
import { Lock, Sparkles, Check } from "lucide-react";

interface NotificationItem {
  name: string;
  action: string;
}

// Brand-new, unique name list for Target
const firstNames = [
  "Marcus", "Chloe", "Ethan", "Savannah", "Lucas", "Maya", "Mason", "Zoey", "Benjamin", "Penelope",
  "Logan", "Lillian", "Alexander", "Nora", "Jackson", "Riley", "Sebastian", "Zoey", "Jack", "Stella",
  "Owen", "Aurora", "Theodore", "Ellie", "Julian", "Hannah", "Jayden", "Hazel", "Grayson", "Violet",
  "Leo", "Aria", "Gabriel", "Lily", "Isaac", "Eleanor", "Oliver", "Claire", "Ezra", "Skylar",
  "Charles", "Lucy", "Thomas", "Paisley", "Caleb", "Everly", "Josiah", "Anna", "Christian", "Caroline",
  "Andrew", "Nova", "Mateo", "Emerson", "Lincoln", "Kinsley", "Ryan", "Audrey", "Jaxon", "Maya",
  "Nathan", "Aaliyah", "Aaron", "Madelyn", "Isaiah", "Autumn", "Thomas", "Alicia", "Charles", "Eva",
  "Caleb", "Piper", "Josiah", "Ruby", "Christian", "Serenity", "Hunter", "Willow", "Eli", "Everly",
  "Jonathan", "Kaylee", "Connor", "Lydia", "Jeremiah", "Aubrey", "Ezekiel", "Ariana", "Angel", "Eliana",
  "Colton", "Peyton", "Adrian", "Melanie", "Easton", "Gianna", "Robert", "Isabelle", "Nicholas", "Julia"
];

const lastInitials = ["P.", "M.", "R.", "S.", "T.", "V.", "W.", "K.", "L.", "B.", "C.", "D.", "E.", "F.", "G.", "H."];

const actions = [
  "just claimed a $750 Target coupon!",
  "just claimed a $750 Target gift card!",
  "just unlocked reward eligibility!",
  "just completed the review survey!",
  "just verified eligibility!"
];

// Dynamically generate 100 new people claiming Target rewards
const notifications: NotificationItem[] = Array.from({ length: 100 }, (_, i) => ({
  name: `${firstNames[i % firstNames.length]} ${lastInitials[(i * 3) % lastInitials.length]}`,
  action: actions[i % actions.length]
}));

/**
 * AnnouncementBar Component (Target Edition)
 * 
 * Includes iOS Status Bar Safe Area spacing and elevated toast positioning.
 */
const AnnouncementBar = () => {
  const [currentNotif, setCurrentNotif] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const showRandomNotif = () => {
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setCurrentNotif(notifications[randomIndex]);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Trigger initial notification after 2 seconds
    const initialTimer = setTimeout(() => {
      showRandomNotif();
    }, 2000);

    // Loop through notifications every 8 seconds
    const interval = setInterval(() => {
      showRandomNotif();
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Target Red Top Banner Bar with Dynamic iOS Safe-Area Padding */}
      <div className="sticky top-0 z-50 w-full bg-[#CC0000] border-b border-[#A00000] pt-[calc(env(safe-area-inset-top)+6px)] pb-2 px-3 sm:px-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md">
        {/* Sparkle Icons Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          <Sparkles 
            className="absolute left-[3%] sm:left-[8%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" 
            strokeWidth={1.5}
          />
          <Sparkles 
            className="absolute right-[3%] sm:right-[8%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" 
            strokeWidth={1.5}
          />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto px-2">
          {/* Top Row: Security & Social Proof Combined */}
          <div className="flex items-center justify-center gap-1.5 w-full text-center">
            <Lock 
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0 -mt-0.5" 
              strokeWidth={2.5}
            />
            <p className="text-white text-[9.5px] xs:text-[10.5px] sm:text-[12px] font-bold tracking-tight leading-snug">
              256-Bit SSL Secured &bull; Over 1,400+ participants completed verification today
            </p>
          </div>

          {/* Bottom Row: Subtext with decorative dashes */}
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <span className="text-white/80 text-[8px] sm:text-[9px] font-light">&mdash;</span>
            <p className="text-white text-[7.5px] xs:text-[8.5px] sm:text-[9px] uppercase tracking-[0.08em] sm:tracking-[0.12em] font-extrabold whitespace-nowrap">
              SECURE ELIGIBILITY CHECK &bull; PRIVACY PROTECTED
            </p>
            <span className="text-white/80 text-[8px] sm:text-[9px] font-light">&mdash;</span>
          </div>
        </div>

        {/* Shimmering Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent w-full opacity-60 overflow-hidden">
          <div className="absolute inset-0 bg-white/30 animate-shine"></div>
        </div>
      </div>

      {/* Floating Live Social Proof Notification (Positioned Higher to avoid blocking CTA) */}
      {currentNotif && (
        <div
          className={`fixed bottom-20 left-3 right-3 sm:left-4 sm:right-auto z-[9999] max-w-md mx-auto sm:mx-0 flex items-center gap-2.5 rounded-xl border-l-[4px] border-[#CC0000] bg-white/95 backdrop-blur-md px-3.5 py-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.18)] overflow-hidden transition-all duration-500 ease-in-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 pointer-events-none"
          }`}
        >
          {/* Target Red Checkmark Circle */}
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#CC0000] text-white">
            <Check className="w-3 h-3" strokeWidth={3} />
          </div>

          {/* Notification Text */}
          <div className="text-[11px] sm:text-xs text-[#333333] truncate">
            <span className="font-bold">{currentNotif.name} </span>
            <span className="text-[#555555]">{currentNotif.action}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementBar;
