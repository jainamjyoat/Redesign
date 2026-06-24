'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Tell the browser NOT to remember the user's previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 2. Instantly force the viewport back to the absolute top (Hero Section)
    window.scrollTo(0, 0);

    // 3. Initialize Lenis with luxury cinematic configurations
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // 4. Double-check synchronization by snapping Lenis instance directly to 0
    lenis.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}