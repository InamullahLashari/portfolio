import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// useInView
// ---------------------------------------------------------------------------
// Tiny scroll-reveal helper built on the native IntersectionObserver API —
// no animation library needed, keeps the project light and easy to deploy.
//
// Returns [ref, isVisible]. Attach `ref` to the element you want to watch;
// once it scrolls into view, `isVisible` flips to true and STAYS true (the
// observer disconnects), so the reveal animation only ever plays once per
// page load rather than replaying every time the user scrolls past it.
// ---------------------------------------------------------------------------
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -80px 0px" } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If the browser doesn't support it (very old), just show content.
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
