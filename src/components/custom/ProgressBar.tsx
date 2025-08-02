'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const ProgressBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const isNavigatingRef = useRef(false); // Use useRef to track navigation state

  // Effect to listen for link clicks and initiate progress
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor) {
        const href = anchor.getAttribute('href');
        
        // Create a full URL from the clicked href for accurate comparison
        let clickedFullUrl = href;
        if (clickedFullUrl && clickedFullUrl.startsWith('/')) {
            clickedFullUrl = `${window.location.origin}${clickedFullUrl}`;
        } else if (clickedFullUrl && !clickedFullUrl.startsWith('http')) {
            // Handle relative paths like './some-page' or 'some-page'
            clickedFullUrl = new URL(clickedFullUrl, window.location.href).toString();
        }

        // Compare the clicked href (as a full URL) with the current browser's full URL
        // This will trigger if the path OR search params are different
        if (clickedFullUrl && clickedFullUrl !== window.location.href && !isNavigatingRef.current) {
          isNavigatingRef.current = true; // Set ref to true
          setLoading(true);
          setProgress(10); // Start instantly
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []); // Empty dependency array: this effect runs once on mount

  // Effect for progress animation when loading is true (up to 90%)
  useEffect(() => {
    let animationInterval: NodeJS.Timeout;
    if (loading && progress < 90) {
      animationInterval = setInterval(() => {
        setProgress((prev) => prev + 5);
      }, 80); // Speed of animation
    }
    return () => clearInterval(animationInterval);
  }, [loading, progress]);

  // Effect to complete progress when pathname or searchParams change (new page loaded)
  useEffect(() => {
    // `pathname` or `searchParams` changing signals route change completion.
    // We only care if a navigation was initiated by our component (isNavigatingRef.current).
    if (isNavigatingRef.current) {
      setProgress(100); // Instantly go to 100%

      const resetTimer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
        isNavigatingRef.current = false; // Reset the navigation state
      }, 500); // 500ms delay to ensure page content renders

      return () => clearTimeout(resetTimer);
    }
    return () => {};
  }, [pathname, searchParams]); // Depend on pathname and searchParams to detect *any* route change

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-green-700 z-[9999] transition-all duration-300 ease-out ${loading ? 'block' : 'hidden'}`}
      style={{ width: `${progress}%` }}
    />
  );
};