"use client";

import { useEffect } from "react";

export default function SmoothScrollLinks() {
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // if you have a mobile menu state, you can close it here
          // setMobileMenuOpen(false);
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return null; // no UI, only effect
}
