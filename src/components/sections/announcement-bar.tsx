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
  name: `${firstNames[i \% firstNames.length]}${lastInitials[(i * 3) % lastInitials.length]}`,
  action: actions[i % actions.length]
}));

export default function AnnouncementBar() {
  const [currentNotif, setCurrentNotif] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // 5-minute persistent timer state (300 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(300);

  // Timer countdown hook
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Social proof notification loop
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
      {/* Target Red Sticky Top Bar - Enhanced Safe Area Padding for Notch Clearance */}
      <div 
        className="sticky top-0 z-50 w-full bg-[#CC0000] border-b border-[#A00000] pb-2.5 px-2 sm:px-4 shadow-md backdrop-blur-md"
        // ADDED 14px to env safe inset - Fixed notch/status bar cut-off on mobile
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
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

        {/* High-Converting Single Line Container */}
        <div className="relative z-10 flex items-center justify-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-white text-[10.5px] xs:text-[11px] sm:text-[12px] font-bold tracking-tight text-center leading-none">
            {/* Security Lock Icon */}
            <Lock className="w-3.5 h-3.5 text-white shrink-0" strokeWidth={2.5} />

            <span className="whitespace-nowrap">Your spot is reserved for:</span>
            
            {/* Dark Red Timer Pill - High Contrast */}
            <span className="inline-flex items-center gap-1 bg-[#8A0000] text-white px-2 py-0.5 rounded-md font-mono text-[11px] sm:text-[12px] font-bold shadow-inner border border-white/20 shrink-0">
              <Clock className="w-3 h-3 text-white animate-pulse" />
              <span>{formatTime(timeLeft)}</span>
            </span>

            {/* Separator Bullet */}
            <span className="text-white/40 font-normal select-none">•</span>

            {/* Social Proof Count */}
            <span className="font-semibold text-white/95 whitespace-nowrap">
              1,400+ verified today
            </span>
          </div>
        </div>

        {/* Shimmer Line */}
        <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent w-full opacity-60 overflow-hidden">
          <div className="absolute inset-0 bg-white/40 animate-shine"></div>
        </div>
      </div>

      {/* Floating Social Proof Toast - MOVED TO bottom-4 so it does not block the CTA button */}
      {currentNotif && (
        <div
          className={`fixed bottom-4 left-4 right-4 z-[9999] max-w-[340px] mx-auto flex items-center gap-2 rounded-full border border-gray-200/90 bg-white/98 backdrop-blur-md px-3.5 py-1.5 shadow-lg overflow-
