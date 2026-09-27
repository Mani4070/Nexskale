'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedStatProps = {
  value: number;
  suffix?: string;
  label: string;
};

export default function AnimatedStat({ value, suffix = '+', label }: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    let start: number | null = null;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setCount(Math.round(value * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div className="hero-stat-item">
      <span ref={elementRef} className="stat-num">
        {count}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
