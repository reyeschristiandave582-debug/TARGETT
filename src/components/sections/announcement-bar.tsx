"use client";

import React, { useEffect, useState } from "react";
import { Lock, Sparkles, Check, Clock } from "lucide-react";

interface NotificationItem {
  name: string;
  action: string;
}

const firstNames = [
  "Marcus", "Chloe", "Ethan", "Savannah", "Lucas", "Maya", "Mason", "Zoey", "Benjamin", "Penelope",
  "Logan", "Lillian", "Alexander", "Nora", "Jackson", "Riley", "Sebastian", "Zoey", "Jack", "Stella",
  "Owen", "Aurora", "Theodore", "Ellie", "Julian", "Hannah", "Jayden", "Hazel", "Grayson", "Violet",
  "Leo", "Aria", "Gabriel", "Lily", "Isaac", "Eleanor", "Oliver", "Claire", "Ezra", "Skylar",
  "Charles", "Lucy", "Thomas", "Paisley", "Caleb", "Everly", "Josiah", "Anna", "Christian", "Caroline",
  "Andrew", "Nova", "Mateo", "Emerson", "Lincoln", "Kinsley", "Ryan", "Audrey", "Jaxon", "Maya",
  "Nathan", "Aaliyah", "Aaron", "Madelyn", "Isaiah", "Autumn", "Thomas", "Alicia", "Charles", "Eva"
];

const lastInitials = ["P.", "M.", "R.", "S.", "T.", "V.", "W.", "K.", "L.", "B.", "C.", "D.", "E.", "F.", "G.", "H."];

const actions = [
  "just claimed a $750 Target coupon!",
  "just claimed a $750 Target gift card!",
  "just unlocked reward eligibility!",
  "just completed the review survey!",
  "just verified eligibility!"
];

const notifications: NotificationItem[] = Array.from({ length: 100 }, (_, i) => ({
  name: `${firstNames[i % firstNames.length]} ${lastInitials[(i * 3) % lastInitials.length]}`,
  action: actions[i % actions.length]
}));

/**
 * High-Converting AnnouncementBar & Social Proof Toast (Target Edition)
 * Adjusted with pt-14 top padding and bottom-[160px] toast positioning.
 */
const AnnouncementBar = () => {
  const [currentNotif, setCurrentNotif] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const showRandomNotif = () => {
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setCurrentNotif(notifications[randomIndex]);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 3500);
    };

    const initialTimer = setTimeout(() => {
      showRandomNotif();
    }, 1500);

    const interval = setInterval(() => {
      showRandomNotif();
    }, 7000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Top Banner Bar with Expanded Top Padding for Status Bar Clearance */}
      <div className="sticky top-0 z-50 w-full bg-[#CC0000] border-b border-[#A00000] pt-14 sm:pt-[calc(env(safe-area-inset-top)+14px)] pb-2.5 px-3 sm:px-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md">
        {/* Background Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <Sparkles 
            className="absolute left-[2%] sm:left-[6%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" 
            strokeWidth={1.5}
          />
          <Sparkles 
            className="absolute right-[2%] sm:right-[6%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" 
            strokeWidth={1.5}
          />
        </div>

        {/* Content Stack */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto px-1 space-y-1">
          {/* Main Security Headline */}
          <div className="flex items-center justify-center gap-1.5 w-full text-center">
            <Lock 
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0 -mt-0.5" 
              strokeWidth={2.5}
            />
            <p className="text-white text-[9.5px] xs:text-[10.5px] sm:text-[12px] font-bold tracking-tight leading-none">
              256-Bit SSL Secured &bull; Over 1,400+ verified today
            </p>
          </div>

          {/* Dynamic Urgency & Compliance Line */}
          <div className="flex items-center justify-center gap-2 text-white/90">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold">
              SECURE ELIGIBILITY CHECK
            </span>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1 bg-black/20 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold text-yellow-300">
              <Clock className="w-2.5 h-2.5 text-yellow-300 animate-spin" style={{ animationDuration: "3s" }} />
              <span>RESERVED: {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Shimmer Border */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent w-full opacity-60 overflow-hidden">
          <div className="absolute inset-0 bg-white/40 animate-shine"></div>
        </div>
      </div>

      {/* Social Proof Floating Toast (Elevated to bottom-[160px] to clear Step 5) */}
      {currentNotif && (
        <div
          className={`fixed bottom-[160px] sm:bottom-6 left-3 right-3 sm:left-4 sm:right-auto z-[9999] max-w-sm mx-auto sm:mx-0 flex items-center gap-2.5 rounded-xl border-l-[4px] border-[#CC0000] bg-white/98 backdrop-blur-md px-3.5 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.22)] overflow-hidden transition-all duration-500 ease-in-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#CC0000] text-white">
            <Check className="w-3 h-3" strokeWidth={3} />
          </div>

          <div className="text-[11px] sm:text-xs text-[#222222] truncate leading-tight">
            <span className="font-bold">{currentNotif.name} </span>
            <span className="text-[#555555]">{currentNotif.action}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementBar;
