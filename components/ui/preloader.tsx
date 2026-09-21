"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const STATUS_MESSAGES = [
  "Initializing core modules...",
  "Loading brand assets...",
  "Synthesizing visual environment...",
  "Powering digital experiences...",
  "Welcome to NexusKale",
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsFinished(true);
      return;
    }

    // Lock page scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Duration for the loading counter (in milliseconds)
    const duration = 1800;

    let animationFrameId: number;

    const animateProgress = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth custom ease-out curve
      const easedProgress = Math.round(
        (1 - Math.pow(1 - rawProgress, 2.5)) * 100,
      );

      setProgress(easedProgress);

      // Dynamically cycle status messages based on current progress
      if (easedProgress < 25) {
        setStatusIndex(0);
      } else if (easedProgress < 55) {
        setStatusIndex(1);
      } else if (easedProgress < 80) {
        setStatusIndex(2);
      } else if (easedProgress < 98) {
        setStatusIndex(3);
      } else {
        setStatusIndex(4);
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Hold at 100% briefly before launching the cinematic curtain exit
        setTimeout(() => {
          setIsExiting(true);

          // Restore scroll & unmount component after exit animation completes
          setTimeout(() => {
            setIsFinished(true);
            document.body.style.overflow = "";
          }, 850);
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "";
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      id="site-preloader"
      className={`preloader-overlay ${isExiting ? "preloader-exit" : ""}`}
      aria-live="polite"
      role="status"
      aria-label="Loading NexusKale"
    >
      {/* Cinematic Curtain Panels */}
      <div className="preloader-curtain preloader-curtain-top" />
      <div className="preloader-curtain preloader-curtain-bottom" />

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="preloader-ambient-glow preloader-glow-left" />
      <div className="preloader-ambient-glow preloader-glow-right" />
      <div className="preloader-mesh-grid" />

      {/* Centerpiece Content */}
      <div className="preloader-content">
        {/* Holographic Orbital Rings and Brand Emblem */}
        <div className="preloader-emblem-wrapper">
          {/* Animated SVG Dual Orbital Rings */}
          <svg
            className="preloader-orbital-svg"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="preloader-grad-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient
                id="preloader-grad-2"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>

            {/* Outer dotted orbital ring */}
            <circle
              cx="80"
              cy="80"
              r="72"
              stroke="url(#preloader-grad-1)"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
              className="preloader-ring-outer"
            />

            {/* Inner dashed orbital ring */}
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="url(#preloader-grad-2)"
              strokeWidth="2"
              strokeDasharray="18 14"
              strokeLinecap="round"
              className="preloader-ring-inner"
            />
          </svg>

          {/* Central Pulsing Glow Core */}
          <div className="preloader-core-glow" />

          {/* Brand Logo Emblem */}
          <div className="preloader-logo-frame">
            <Image
              src="/images/logo/mobile-logo.png"
              alt="NexusKale Emblem"
              width={70}
              height={48}
              priority
              className="preloader-logo-img"
            />
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="preloader-brand-block">
          <div className="preloader-brand-title">
            <span className="preloader-brand-text">Nexus</span>
            <span className="preloader-brand-gradient">Kale</span>
          </div>
          <div className="preloader-brand-tagline">
            Ideas into Impactful Technology
          </div>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="preloader-progress-section">
          <div className="preloader-track">
            <div
              className="preloader-bar"
              style={{ width: `${progress}%` }}
            >
              <div className="preloader-bar-sparkle" />
            </div>
          </div>

          <div className="preloader-meta-row">
            <span className="preloader-status-msg">
              {STATUS_MESSAGES[statusIndex]}
            </span>
            <span className="preloader-percentage">
              {progress.toString().padStart(2, "0")}
              <span className="preloader-percent-symbol">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
