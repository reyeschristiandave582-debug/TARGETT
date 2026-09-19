"use client";

import React from "react";
import { Lock, Sparkles } from "lucide-react";

/**
 * AnnouncementBar Component
 * 
 * Target-themed sticky top bar displaying SSL security details
 * and eligibility check subtext. Built with Next.js 15 and Tailwind CSS.
 */
const AnnouncementBar = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-[#CC0000] border-b border-red-800/40 py-1.5 px-3 sm:px-4 shadow-md backdrop-blur-md">
      {/* Decorative Sparkle Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <Sparkles 
          className="absolute left-[3%] sm:left-[8%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white animate-pulse" 
          strokeWidth={1.5}
        />
        <Sparkles 
          className="absolute right-[3%] sm:right-[8%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white animate-pulse" 
          strokeWidth={1.5}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto text-white">
        {/* Top Row: Lock Icon & Social Proof Text */}
        <div className="flex items-center justify-center gap-1.5 w-full">
          <Lock 
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" 
            strokeWidth={2.5}
          />
          <p className="text-white text-[10px] xs:text-[11px] sm:text-[12px] font-bold tracking-tight text-center leading-tight">
            256-Bit SSL Secured <span className="mx-0.5">&bull;</span> Over 1,400+ participants completed verification today
          </p>
        </div>

        {/* Bottom Row: Subtext with Dash Dividers */}
        <div className="flex items-center justify-center gap-1.5 mt-0.5">
          <span className="text-white/80 text-[9px] font-light">&mdash;</span>
          <p className="text-white text-[8px] sm:text-[9px] uppercase tracking-[0.12em] font-extrabold whitespace-nowrap">
            SECURE ELIGIBILITY CHECK <span className="mx-0.5">&bull;</span> PRIVACY PROTECTED
          </p>
          <span className="text-white/80 text-[9px] font-light">&mdash;</span>
        </div>
      </div>

      {/* Shimmering Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent w-full opacity-60 overflow-hidden">
        <div className="absolute inset-0 bg-white/30 animate-shine"></div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
