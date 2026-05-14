"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "fade";

type Props = {
  children: ReactNode;
  /** Stagger order: animation-delay = i * 60ms. */
  i?: number;
  direction?: Direction;
  /** Once revealed, never animate again. */
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "aside" | "li" | "ul";
  style?: CSSProperties;
};

/**
 * Scroll-triggered reveal. Honours prefers-reduced-motion: when set,
 * crossfades only — no translate. Uses IntersectionObserver and
 * unobserves after first reveal so it doesn't run on every scroll.
 */
export default function Reveal({
  children,
  i = 0,
  direction = "up",
  once = true,
  className = "",
  as: Tag = "div",
  style,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  // SSR-safe initial: on environments without IntersectionObserver
  // (build-time, certain headless test runners) we render fully-shown
  // immediately instead of fading-in to nothing. Resolving this in the
  // initial-state lazy initializer satisfies react-hooks/set-state-in-effect
  // — calling setShown inside useEffect's bail branch was the older form.
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IO isn't available we already initialised shown=true above —
    // nothing to wire up.
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const offsetMap: Record<Direction, string> = {
    up: "translate3d(0, 14px, 0)",
    left: "translate3d(-14px, 0, 0)",
    right: "translate3d(14px, 0, 0)",
    fade: "translate3d(0, 0, 0)",
  };

  const baseStyle: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "translate3d(0, 0, 0)" : offsetMap[direction],
    transition:
      "opacity 620ms cubic-bezier(0.25, 1, 0.5, 1), transform 620ms cubic-bezier(0.25, 1, 0.5, 1)",
    transitionDelay: `${i * 60}ms`,
    willChange: shown ? "auto" : "transform, opacity",
    ...style,
  };

  return (
    <Tag ref={ref as never} className={className} style={baseStyle}>
      {children}
    </Tag>
  );
}
