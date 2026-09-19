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
  "Charles", "Lucy", "Thomas", "Paisley", "Caleb", "Everly", "Josiah", "Anna", "Christian", "Caroline"
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

export default function AnnouncementBar() {
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
      {/* Top Banner Bar - Perfect Status Bar Clearance */}
      <div 
        className="sticky top-0 z-50 w-full bg-[#CC0000] border-b border-[#A00000] pb-2 px-3 sm:px-4 shadow-sm backdrop-blur-md"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 24px)" }}
      >
        {/* Background Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <Sparkles 
            className="absolute left-[2%] sm:left-[6%] top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-white animate-pulse" 
            strokeWidth={1.5}
          />
          <Sparkles 
            className="absolute right-[2%] sm:right-[6%] top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-white animate-pulse" 
            strokeWidth={1.5}
          />
        </div>

        {/* Content Stack */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto space-y-0.5">
          {/* Headline */}
          <div className="flex items-center justify-center gap-1 w-full text-center">
            <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white shrink-0 -mt-0.5" strokeWidth={2.5} />
            <p className="text-white text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-tight leading-none">
              256-Bit SSL Secured &bull; Over 1,400+ verified today
            </p>
          </div>

          {/* Subtext + Timer */}
          <div className="flex items-center justify-center gap-1.5 text-white/90">
            <span className="text-[7.5px] xs:text-[8px] sm:text-[8.5px] uppercase tracking-wider font-semibold">
              SECURE ELIGIBILITY CHECK
            </span>
            <span className="text-white/40 text-[7.5px]">&bull;</span>
            <div className="flex items-center gap-0.5 bg-black/20 px-1 py-0.2 rounded text-[7.5px] xs:text-[8px] sm:text-[8.5px] font-mono font-bold text-yellow-300">
              <Clock className="w-2 h-2 text-yellow-300 animate-spin" style={{ animationDuration: "3s" }} />
              <span>RESERVED: {formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Accent Line */}
        <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent w-full opacity-60 overflow-hidden">
          <div className="absolute inset-0 bg-white/40 animate-shine"></div>
        </div>
      </div>

      {/* Floating Social Proof Toast - Floats cleanly above CTA button */}
      {currentNotif && (
        <div
          className={`fixed bottom-[185px] sm:bottom-8 left-4 right-4 sm:left-6 sm:right-auto z-[9999] max-w-[290px] mx-auto sm:mx-0 flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-md transition-all duration-300 ease-in-out ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-3 opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#CC0000] text-white">
            <Check className="w-2.5 h-2.5" strokeWidth={3} />
          </div>

          <div className="text-[9.5px] sm:text-[10.5px] text-[#222222] truncate leading-tight">
            <span className="font-bold">{currentNotif.name} </span>
            <span className="text-[#555555]">{currentNotif.action}</span>
          </div>
        </div>
      )}
    </>
  );
}
