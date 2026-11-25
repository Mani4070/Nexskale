"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  tags: readonly string[];
};

const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We define direction, product structure, and technical clarity to support every engineering decision.",
    tags: ["PRODUCT STRATEGY", "ARCHITECTURE", "ROADMAP"],
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "We craft intuitive interfaces, interactive prototypes, and cohesive visual systems built for real users.",
    tags: ["UI DESIGN", "UX FLOWS", "DESIGN SYSTEM"],
  },
  {
    number: "03",
    title: "Engineering",
    description:
      "We build fast, reliable web, mobile, and SaaS platforms using clean code and resilient cloud foundations.",
    tags: ["FULL-STACK", "APIS", "CLOUD INFRA"],
  },
  {
    number: "04",
    title: "AI & Integration",
    description:
      "We integrate intelligent agents, RAG pipelines, and workflow automation seamlessly into your operations.",
    tags: ["AI AGENTS", "AUTOMATION", "INTEGRATIONS"],
  },
  {
    number: "05",
    title: "Launch & Scale",
    description:
      "We ship with thorough testing, observability, and continuous iteration so your product grows with confidence.",
    tags: ["QA & DEPLOY", "MONITORING", "GROWTH"],
  },
];

const STEP_ANGLE = 42;

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    mass: 0.25,
  });

  const maxRotation = -(PROCESS_STEPS.length - 1) * STEP_ANGLE;
  const ringRotation = useTransform(smoothProgress, [0, 1], [0, maxRotation]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const next = Math.min(
      PROCESS_STEPS.length - 1,
      Math.max(0, Math.round(latest * (PROCESS_STEPS.length - 1))),
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  function scrollToStep(index: number) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableDistance = Math.max(1, el.offsetHeight - window.innerHeight);
    const targetY =
      sectionTop + (index / (PROCESS_STEPS.length - 1)) * scrollableDistance;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  const activeStep = PROCESS_STEPS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="process-arc-section"
      id="process"
      aria-label="Our collaborative process"
    >
      <div className="process-arc-sticky">
        {/* Ambient glows matching site theme */}
        <div className="process-arc-glow process-arc-glow-left" aria-hidden="true" />
        <div className="process-arc-glow process-arc-glow-right" aria-hidden="true" />

        <div className="container process-arc-inner">
          {/* Heading using site heading styles */}
          <div className="process-arc-header">
            <div className="services-tag-badge">PROCESS</div>
            <h2 className="services-main-heading process-arc-heading">
              A collaborative approach
            </h2>
          </div>

          {/* Rotary Arc Scroller */}
          <div className="process-arc-viewport">
            <div className="process-arc-step-kicker" aria-hidden="true">
              STEP
            </div>

            {/* Rotating circular track */}
            <div className="process-arc-ring-anchor">
              <div className="process-arc-ring">
                <motion.div
                  className="process-arc-rotator"
                  style={{ rotate: ringRotation }}
                >
                  {PROCESS_STEPS.map((step, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <div
                        key={step.number}
                        className="process-arc-spoke"
                        style={{ transform: `rotate(${idx * STEP_ANGLE}deg)` }}
                      >
                        <button
                          type="button"
                          onClick={() => scrollToStep(idx)}
                          aria-label={`Step ${step.number}: ${step.title}`}
                          aria-pressed={isActive}
                          className={`process-arc-badge ${isActive ? "is-active" : ""}`}
                        >
                          {step.number}
                        </button>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Center step content */}
            <div className="process-arc-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.number}
                  className="process-arc-step-copy"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3>{activeStep.title}</h3>
                  <p>{activeStep.description}</p>
                  <div className="process-arc-tags" aria-label="Step deliverables">
                    {activeStep.tags.map((tag, idx) => (
                      <span key={tag} className="process-arc-tag-item">
                        {idx > 0 && (
                          <span className="process-arc-tag-dot" aria-hidden="true">
                            •
                          </span>
                        )}
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <Link href="/contact" className="process-arc-cta">
                <span>Get started</span>
                <ArrowRight size={15} />
              </Link>

              <div className="process-arc-pagination">
                <span className="process-arc-counter">
                  {activeStep.number}/0{PROCESS_STEPS.length}
                </span>
                <div className="process-arc-dots" role="tablist" aria-label="Process steps">
                  {PROCESS_STEPS.map((step, idx) => (
                    <button
                      key={step.number}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeIndex}
                      aria-label={`Jump to step ${step.number}`}
                      onClick={() => scrollToStep(idx)}
                      className={`process-arc-dot ${idx === activeIndex ? "is-active" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="process-arc-bottom-fade" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

