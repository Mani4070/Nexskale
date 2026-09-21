"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Rocket, Shield, Users, BarChart3, Globe } from "lucide-react";
import type { Content } from "@/lib/content";

const iconMap: Record<string, any> = {
  rocket: Rocket,
  shield: Shield,
  users: Users,
  people: Users,
};

function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let startTime: number | null = null;
    const duration = 1800; // 1.8s smooth duration

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // Exponential ease-out
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [hasAnimated, target]);

  return (
    <span ref={elementRef} className="about-counter-num">
      {count}
      {suffix}
    </span>
  );
}

const statsData = [
  {
    icon: BarChart3,
    target: 100,
    suffix: "+",
    label: "Projects delivered",
  },
  {
    icon: Users,
    target: 50,
    suffix: "+",
    label: "Happy clients",
  },
  {
    icon: Globe,
    target: 5,
    suffix: "+",
    label: "Industries served",
  },
];

type AboutSectionProps = {
  about: Content["about"];
  isHome?: boolean;
};

export default function AboutSection({ about, isHome = false }: AboutSectionProps) {
  const renderHeadline = (text: string) => {
    const target = "understands";
    const index = text.toLowerCase().indexOf(target);
    if (index === -1) return text;
    const before = text.slice(0, index);
    const word = text.slice(index, index + target.length);
    const after = text.slice(index + target.length);
    return (
      <>
        {before}
        <span className="about-gradient-text">{word}</span>
        {after}
      </>
    );
  };

  return (
    <section className="about-section-wrapper" id="about">
      {/* Background ambient orbs */}
      <div className="about-ambient-orb orb-top-right" aria-hidden="true" />
      <div className="about-ambient-orb orb-bottom-left" aria-hidden="true" />

      <div className="about-main-container">
        <div className="about-content-grid">
          {/* Left Column: Narrative & Principles */}
          <div className="about-copy-column">
            <div className="about-eyebrow">
              <span>WHY NEXSKALE</span>
            </div>

            <h2 className="about-headline">
              {renderHeadline(about.title)}
            </h2>

            <p className="about-lead-text">
              {about.description}
            </p>

            <div className="about-action-row">
              <Link className="about-approach-btn" href={isHome ? "/about" : "#approach"}>
                <span>Our approach</span>
                <ArrowRight size={17} className="about-btn-arrow" />
              </Link>

              <div className="about-doodle-wrapper">
                <span className="about-doodle-text">Ideas to impact</span>
                <svg
                  className="about-doodle-arrow"
                  width="54"
                  height="26"
                  viewBox="0 0 54 26"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 20C14 6 34 4 50 13M50 13L42 9M50 13L45 19"
                    stroke="#9ca3f5"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="about-principles-row">
              {about.principles.map((p, idx) => {
                const IconComponent = iconMap[p.icon] || Rocket;
                const isBlue = p.icon === "shield";
                return (
                  <React.Fragment key={p.title}>
                    {idx > 0 && <div className="about-principle-divider" />}
                    <div className="about-principle-item">
                      <div className={`about-principle-icon ${isBlue ? "is-blue" : "is-purple"}`}>
                        <IconComponent size={20} />
                      </div>
                      <div className="about-principle-text">
                        <h3 className="about-principle-title">{p.title}</h3>
                        <p className="about-principle-desc">{p.description}</p>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="about-bottom-tagline">
              <span className="about-tagline-line" />
              <span>BUILD &bull; INNOVATE &bull; GROW</span>
            </div>
          </div>

          {/* Right Column: Clean Reception Image + Floating Animated Counter Upon Image */}
          <div className="about-visual-column">
            <div className="about-visual-card">
              <img
                src={about.image || "/images/nexuskale-reception.png"}
                alt={about.imageAlt || "NexSkale modern reception lobby"}
                width={536}
                height={420}
                className="about-reception-image"
                loading="eager"
              />

              {/* Floating Animated Counter Stats Bar upon the image */}
              <div className="about-floating-stats-banner">
                {statsData.map((stat, idx) => {
                  const StatIcon = stat.icon;
                  return (
                    <React.Fragment key={stat.label}>
                      {idx > 0 && <div className="about-stat-divider" />}
                      <div className="about-stat-item">
                        <div className="about-stat-icon-wrap">
                          <StatIcon size={20} />
                        </div>
                        <div className="about-stat-text-wrap">
                          <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                          <span className="about-stat-label">{stat.label}</span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
