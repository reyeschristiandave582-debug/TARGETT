"use client";

import React, { useEffect, useState } from "react";
import { Lock, Sparkles, Check, ShieldCheck, Clock } from "lucide-react";

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

  // Countdown timer state initialized to 4 minutes (240 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(240);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
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
      {/* Top Banner Bar - Countdown Urgency Bar */}
      <div 
        className="sticky top-0 z-50 w-full bg-black border-b border-neutral-800 pb-2 px-3 sm:px-4 shadow-sm backdrop-blur-md"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 6px)" }}
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
          {/* Headline Timer */}
          <div className="flex items-center justify-center gap-1.5 w-full text-center">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0 -mt-0.5" strokeWidth={2.5} />
            <p className="text-white text-[10px] xs:text-[11px] sm:text-[12px] font-bold tracking-tight leading-none">
              You have <span className="tabular-nums font-black">{formatTime(timeLeft)}</span> minutes left to unlock your reward
            </p>
          </div>

          {/* Subtext Action Directive */}
          <div className="flex items-center justify-center gap-1.5 text-white/90">
            <span className="text-[7.5px] xs:text-[8px] sm:text-[8.5px] uppercase tracking-wider font-semibold text-neutral-300">
              — COMPLETE THE STEPS BEFORE ACCESS EXPIRES —
            </span>
          </div>
        </div>

        {/* Shimmer Line */}
        <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent w-full opacity-60 overflow-hidden">
          <div className="absolute inset-0 bg-white/40 animate-shine"></div>
        </div>
      </div>

      {/* Floating Social Proof Toast - Positioned at Bottom Below CTA Button */}
      {currentNotif && (
        <div
          className={`fixed bottom-12 left-4 right-4 z-[9999] max-w-[340px] mx-auto flex items-center gap-2 rounded-full border border-gray-200/90 bg-white/98 backdrop-blur-md px-3.5 py-1.5 shadow-lg overflow-hidden transition-all duration-300 ease-in-out pointer-events-none ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
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
