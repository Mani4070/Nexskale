"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Check,
  Monitor,
  Smartphone,
  Sparkles,
  BarChart3,
  Cloud,
  Palette,
} from "lucide-react";
import type { Content } from "@/lib/content";

const serviceDetailsMap: Record<
  string,
  {
    tag: string;
    headline: string;
    description: string;
    features: string[];
    image: string;
    icon: typeof Monitor;
    shortSubtitle: string;
    shortLabel: string;
  }
> = {
  web: {
    tag: "WEB DEVELOPMENT",
    headline: "Build Without Limits",
    description:
      "Modern, high-performance web applications that help you engage users, streamline operations, and grow your business online.",
    features: [
      "Fast, secure and scalable",
      "Built for performance and SEO",
      "Tailored to your business goals",
    ],
    image: "/images/services/web-development.jpg",
    icon: Monitor,
    shortSubtitle: "Modern, high-performance web apps",
    shortLabel: "Web Development",
  },
  mobile: {
    tag: "MOBILE APPLICATIONS",
    headline: "Apps That Move Faster",
    description:
      "Native and cross-platform mobile apps engineered with intuitive interfaces, silky smooth animations, and dependable foundations.",
    features: [
      "iOS and Android development",
      "Cross-platform architecture",
      "Real-time sync & push notifications",
    ],
    image: "/images/services/mobile-applications.jpg",
    icon: Smartphone,
    shortSubtitle: "Scalable Android & iOS apps",
    shortLabel: "Mobile Apps",
  },
  ai: {
    tag: "AI & AUTOMATION",
    headline: "Smarter Workflows & Agents",
    description:
      "Supercharge your operations with intelligent AI chatbots, RAG knowledge systems, autonomous agents, and end-to-end automation.",
    features: [
      "Knowledge-based AI assistants",
      "Intelligent process automation",
      "Custom RAG & LLM integrations",
    ],
    image: "/images/services/ai-automation.jpg",
    icon: Sparkles,
    shortSubtitle: "AI chatbots, RAG & workflow automation",
    shortLabel: "AI & Automation",
  },
  saas: {
    tag: "SAAS PRODUCT DEVELOPMENT",
    headline: "Scale Products With Confidence",
    description:
      "Turn promising software ideas into scalable, subscription-ready SaaS platforms built for rapid customer acquisition and high retention.",
    features: [
      "Multi-tenant cloud architecture",
      "Subscriptions, billing & analytics",
      "Rapid MVP to enterprise scaling",
    ],
    image: "/images/services/saas-development.jpg",
    icon: BarChart3,
    shortSubtitle: "End-to-end product engineering",
    shortLabel: "SaaS Product",
  },
  cloud: {
    tag: "CLOUD & DEVOPS",
    headline: "Deploy & Scale Anywhere",
    description:
      "Reliable cloud architecture that grows with your business. We streamline your delivery pipeline and ensure 99.9% uptime with confidence.",
    features: [
      "AWS, Google Cloud & Docker setups",
      "Automated CI/CD pipelines",
      "High availability & observability",
    ],
    image: "/images/services/cloud-devops.jpg",
    icon: Cloud,
    shortSubtitle: "Deploy, scale and manage with confidence",
    shortLabel: "Cloud & DevOps",
  },
  design: {
    tag: "UI/UX DESIGN",
    headline: "Design Experiences That Matter",
    description:
      "Human-centered digital product design that connects user needs to business goals through thoughtful research, prototypes, and sleek interfaces.",
    features: [
      "User research & interactive prototypes",
      "Comprehensive design systems",
      "Modern, user-centric interfaces",
    ],
    image: "/images/services/uiux-design.jpg",
    icon: Palette,
    shortSubtitle: "Beautiful, user-centric designs",
    shortLabel: "UI/UX Design",
  },
};

type ServicesSectionProps = {
  services: Content["services"];
  isHome?: boolean;
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [activeId, setActiveId] = useState<string>("web");

  // Fallback to first available if not matched
  const activeServiceData =
    serviceDetailsMap[activeId] || serviceDetailsMap["web"];

  return (
    <section className="services-showcase-section" id="services">
      {/* Ambient background glows */}
      <div className="services-glow-orb glow-orb-1" aria-hidden="true" />
      <div className="services-glow-orb glow-orb-2" aria-hidden="true" />

      <div className="container services-showcase-container">
        {/* Header Row */}
        <div className="services-top-header">
          <div className="services-title-col">
            <div className="services-tag-badge">WHAT WE DO</div>
            <h2 className="services-main-heading">
              Digital solutions
              <br />
              for real business growth.
            </h2>
            <p className="services-main-desc">
              From strategy to deployment, we build secure, scalable and
              future-ready solutions tailored to your business needs.
            </p>
          </div>

          {/* Decorative hint with curved arrow */}
          <div className="services-hint-col" aria-hidden="true">
            <div className="services-hint-bubble">
              <span>Hover a service to see content change</span>
              <span className="hint-sub">(smooth fade transition)</span>
              <svg
                className="hint-curved-arrow"
                width="42"
                height="48"
                viewBox="0 0 42 48"
                fill="none"
              >
                <path
                  d="M38 4C28 12 12 18 6 36M6 36L2 28M6 36L14 34"
                  stroke="#8b5cf6"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="services-link-col">
            <Link className="services-explore-link" href="/#contact">
              <span>Explore our services</span>
              <ArrowRight size={16} className="link-arrow-icon" />
            </Link>
          </div>
        </div>

        {/* Main Interactive Layout: Left Menu + Right Showcase */}
        <div className="services-interactive-layout">
          {/* Left Column: Menu Items */}
          <div className="services-menu-column" role="tablist">
            {services.map((service) => {
              const meta =
                serviceDetailsMap[service.id] || serviceDetailsMap["web"];
              const Icon = meta.icon;
              const isActive = activeId === service.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`services-menu-item ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setActiveId(service.id)}
                  onClick={() => setActiveId(service.id)}
                  id={`service-tab-${service.id}`}
                >
                  <div className="menu-item-icon-box">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div className="menu-item-text">
                    <h3 className="menu-item-title">{service.title}</h3>
                    <p className="menu-item-subtitle">{meta.shortSubtitle}</p>
                  </div>

                  <div className="menu-item-chevron">
                    <ChevronRight size={16} strokeWidth={2.2} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Large Interactive Showcase Card */}
          <div className="services-showcase-panel">
            {/* Top Area: Details on Left + 3D Render on Right */}
            <div
              key={activeId}
              className="services-panel-top-grid fade-in-transition"
            >
              <div className="services-panel-info">
                <div className="panel-badge-pill">{activeServiceData.tag}</div>

                <h3 className="panel-headline">{activeServiceData.headline}</h3>

                <p className="panel-description">
                  {activeServiceData.description}
                </p>

                <div className="panel-features-list">
                  {activeServiceData.features.map((feat, idx) => (
                    <div key={idx} className="panel-feature-row">
                      <span className="feature-check-icon">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="feature-text">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="panel-cta-wrap">
                  <Link
                    className="panel-primary-btn"
                    href={`/#contact?service=${activeId}`}
                  >
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* 3D Visual Illustration */}
              <div className="services-panel-media">
                <div className="media-image-frame">
                  <Image
                    src={activeServiceData.image}
                    alt={activeServiceData.headline}
                    width={640}
                    height={460}
                    className="media-showcase-image"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Bottom Bar: Thumbnails Row + Indicator Dots */}
            <div className="services-panel-bottom-bar">
              <div className="thumbnails-scroll-row">
                {services.map((service, index) => {
                  const meta =
                    serviceDetailsMap[service.id] || serviceDetailsMap["web"];
                  const isThumbActive = activeId === service.id;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      className={`thumbnail-card-btn ${
                        isThumbActive ? "active" : ""
                      }`}
                      onMouseEnter={() => setActiveId(service.id)}
                      onClick={() => setActiveId(service.id)}
                      aria-label={`Switch to ${service.title}`}
                    >
                      <div className="thumbnail-img-box">
                        <Image
                          src={meta.image}
                          alt={service.title}
                          width={140}
                          height={90}
                          className="thumbnail-mini-img"
                        />
                      </div>
                      <span className="thumbnail-label">{meta.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Indicator Dots */}
              <div className="services-dots-row" aria-hidden="true">
                {services.map((service) => (
                  <span
                    key={service.id}
                    className={`pagination-dot ${
                      activeId === service.id ? "active" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
