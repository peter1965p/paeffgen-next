"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Überwachung der Scroll-Position [cite: 2026-02-20]
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 p-4 bg-blue-600/10 border border-blue-500/50 rounded-2xl backdrop-blur-xl text-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:bg-blue-600 hover:text-white transition-all group"
        >
          {/* Ein technisches Pfeil-Icon wirkt eleganter als eine Comic-Rakete [cite: 2026-02-20] */}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:-translate-y-1 transition-transform duration-300"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          <span className="sr-only">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}