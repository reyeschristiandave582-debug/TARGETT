"use client";

import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

/**
 * Footer Component (Target Edition)
 * 
 * Clean, compliant footer combining standard legal links, Target social media icons,
 * and copyright information with smooth hover states.
 */
const Footer = () => {
  return (
    <footer className="relative z-10 w-full max-w-[512px] mx-auto px-4 pt-0 pb-16 mt-6 text-center">
      {/* Standard Legal & Compliance Links */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] font-medium text-gray-500 mb-3">
        <a 
          href="#privacy" 
          className="hover:text-[#CC0000] transition-colors underline-offset-2 hover:underline"
        >
          Privacy Policy
        </a>
        <span className="text-gray-300">•</span>
        <a 
          href="#terms" 
          className="hover:text-[#CC0000] transition-colors underline-offset-2 hover:underline"
        >
          Terms & Conditions
        </a>
        <span className="text-gray-300">•</span>
        <a 
          href="#contact" 
          className="hover:text-[#CC0000] transition-colors underline-offset-2 hover:underline"
        >
          Contact Us
        </a>
      </div>

      {/* Social Media Icons */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <a 
          href="https://www.facebook.com/target/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-full bg-[#CC0000] hover:bg-[#B30000] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
          aria-label="Facebook"
        >
          <Facebook className="w-3.5 h-3.5 fill-current" />
        </a>
        <a 
          href="https://www.instagram.com/target/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-full bg-[#CC0000] hover:bg-[#B30000] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
          aria-label="Instagram"
        >
          <Instagram className="w-3.5 h-3.5" />
        </a>
        <a 
          href="http://linkedin.com/company/target" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-full bg-[#CC0000] hover:bg-[#B30000] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5 fill-current" />
        </a>
      </div>

      {/* Copyright Statement */}
      <p className="text-gray-400 text-[10px] font-medium tracking-tight">
        © 2026 All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
