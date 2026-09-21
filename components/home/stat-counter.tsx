"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: string;
  duration?: number;
}

export default function StatCounter({ value, duration = 1800 }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const target = parseFloat(match[2]);
    const suffix = match[3] || "";
    const isDecimal = match[2].includes(".");
    const decimals = isDecimal ? match[2].split(".")[1].length : 0;

    const el = containerRef.current;
    if (!el) return;

    let cleanupRaf: (() => void) | undefined;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      setDisplayValue(`${prefix}0${suffix}`);

      let startTime: number | null = null;
      let rafId: number;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easeOutExpo curve
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = target * ease;

        const formatted = isDecimal
          ? current.toFixed(decimals)
          : Math.floor(current).toString();

        setDisplayValue(`${prefix}${formatted}${suffix}`);

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      rafId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(rafId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          cleanupRaf = startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (cleanupRaf) cleanupRaf();
    };
  }, [value, duration]);

  return <span ref={containerRef}>{displayValue}</span>;
}
