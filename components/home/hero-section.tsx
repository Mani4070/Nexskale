"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Content } from "@/lib/content";

type HeroSectionProps = {
  hero: Content["hero"];
  stats?: Content["stats"];
};

const SHOWCASE_CARDS = [
  {
    src: "/images/services/web-development.jpg",
    alt: "NexSkale Web Platform Engineering",
    label: "Web Platforms",
    href: "/services#web",
  },
  {
    src: "/images/services/mobile-applications.jpg",
    alt: "NexSkale Mobile App Development",
    label: "Mobile Apps",
    href: "/services#mobile",
  },
  {
    src: "/images/services/saas-development.jpg",
    alt: "NexSkale SaaS Product Dashboard",
    label: "SaaS Products",
    href: "/services#saas",
  },
  {
    src: "/images/services/uiux-design.jpg",
    alt: "NexSkale UI/UX Design Systems",
    label: "UI/UX Design",
    href: "/services#design",
  },
  {
    src: "/images/services/ai-automation.jpg",
    alt: "NexSkale AI and Workflow Automation",
    label: "AI & Automation",
    href: "/services#ai",
  },
] as const;

const AVATAR_THEMES = [
  { bg: "#ede9fe", accent: "#6d28d9" },
  { bg: "#dbeafe", accent: "#2563eb" },
  { bg: "#e0e7ff", accent: "#4338ca" },
] as const;

export default function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="hero hero-cobalt">
      {/* Centered Hero Copy & CTAs */}
      <div className="hero-content hero-cobalt-content">
        <div className="hero-status-pill">
          <span className="hero-status-avatars" aria-hidden="true">
            {AVATAR_THEMES.map((theme, idx) => (
              <span
                key={idx}
                className="hero-status-avatar"
                style={{ backgroundColor: theme.bg, color: theme.accent }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <circle cx="12" cy="8.5" r="3.5" />
                  <path d="M5.5 19.5c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
                </svg>
              </span>
            ))}
          </span>
          <span className="hero-status-text">{hero.eyebrow}</span>
        </div>

        <h1 className="hero-title hero-cobalt-title">
          <span className="hero-title-row">
            {hero.title} {hero.secondLine}
          </span>
          <span className="hero-title-row">
            <span className="hero-highlight">{hero.highlight}</span>
          </span>
        </h1>

        <p className="hero-description hero-cobalt-description">
          {hero.description}
        </p>

        <div className="hero-actions hero-cobalt-actions">
          <Link className="hero-pill-btn hero-pill-btn-white" href="/contact">
            <span>Start a project</span>
            <span className="hero-pill-btn-circle" aria-hidden="true">
              <ArrowRight size={15} strokeWidth={2.25} />
            </span>
          </Link>

          <Link className="hero-pill-btn hero-pill-btn-blue" href="#work">
            <span>See our work</span>
            <span className="hero-pill-btn-circle" aria-hidden="true">
              <ArrowRight size={15} strokeWidth={2.25} />
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Fanned Showcase Cards */}
      <div className="hero-showcase-fan" aria-label="Featured capabilities">
        {SHOWCASE_CARDS.map((card, idx) => (
          <Link
            key={card.label}
            href={card.href}
            className={`hero-fan-card hero-fan-card-${idx}`}
            aria-label={card.label}
          >
            <span className="hero-fan-card-badge">{card.label}</span>
            <span className="hero-fan-card-media">
              <Image
                src={card.src}
                alt={card.alt}
                fill
                preload={idx >= 1 && idx <= 3}
                sizes="(max-width: 700px) 34vw, 240px"
                className="hero-fan-card-img"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
