"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Layers,
  User,
  Globe,
  Star,
  Play,
  X,
} from "lucide-react";
import type { Content } from "@/lib/content";
import StatCounter from "@/components/home/stat-counter";

type HeroSectionProps = {
  hero: Content["hero"];
  stats: Content["stats"];
};

function getStatIcon(label: string, index: number) {
  const lower = label.toLowerCase();
  if (lower.includes("satisfaction") || index === 3) {
    return <Star size={24} strokeWidth={2} />;
  }
  if (lower.includes("countr") || index === 2) {
    return <Globe size={24} strokeWidth={2} />;
  }
  if (lower.includes("happy") || lower.includes("client") || index === 1) {
    return <User size={24} strokeWidth={2} />;
  }
  return <Layers size={24} strokeWidth={2} />;
}

export default function HeroSection({ hero, stats }: HeroSectionProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section className="hero container">
        {/* Hero Left Content Column */}
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow">{hero.eyebrow}</div>
          <h1 className="hero-title">
            <span className="hero-title-row">
              <span>{hero.title}</span>
              <span className="hero-title-break"> </span>
              <span>{hero.secondLine}</span>
            </span>
            <span className="hero-title-row">
              <span className="hero-highlight">{hero.highlight}</span>
            </span>
          </h1>
          <p className="hero-description">{hero.description}</p>
          <div className="hero-actions">
            <Link className="button hero-btn-primary" href="/contact">
              Start a project <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              className="button hero-btn-video"
              onClick={() => setVideoOpen(true)}
              aria-label="Watch video"
            >
              <span className="video-play-disc" aria-hidden="true">
                <Play size={10} fill="currentColor" />
              </span>
              <span>Watch video</span>
            </button>
          </div>
        </div>

        {/* Hero Bottom: Stats Row & Scroll Cue */}
        <div className="hero-bottom">
          <div className="stats">
            {stats.map((s, idx) => (
              <div key={s.label} className="hero-stat-item">
                <div className="hero-stat-icon" aria-hidden="true">
                  {getStatIcon(s.label, idx)}
                </div>
                <strong className="hero-stat-number">
                  <StatCounter value={s.value} />
                </strong>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <a href="#about" className="scroll-cue" aria-label="Scroll to explore">
            <span className="scroll-cue-circle" aria-hidden="true">
              <ArrowDown size={14} />
            </span>
            <span className="scroll-cue-text">SCROLL TO EXPLORE</span>
          </a>
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="hero-video-modal-backdrop"
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="hero-video-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="hero-video-modal-close"
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <div className="hero-video-container">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="NexSkale Brand Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
