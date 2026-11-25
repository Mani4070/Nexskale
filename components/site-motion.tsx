"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { animate, inView, scroll } from "motion";
import { motion, useScroll, useSpring } from "motion/react";

const REVEAL_SELECTORS = [
  // Homepage hero & sections
  ".hero-content > *",
  ".hero-showcase-fan",
  ".tech-stack-section",
  ".services-top-header > *",
  ".services-interactive-layout",
  ".about-copy-column > *",
  ".section-heading",
  ".project-card",
  ".banner-content > *",
  ".blog-card",
  // Interior banners & intros
  ".interior-banner-copy > *",
  ".interior-banner-bottom",
  ".page-intro-content > *",
  ".page-intro-visual",
  // About page
  ".studio-manifesto > *",
  ".belief-columns > *",
  ".studio-invitation > *",
  ".process-card",
  // Services page
  ".capability-index",
  ".capability-row",
  ".engagement-grid > *",
  // Blog & articles
  ".journal-cover",
  ".journal-entry",
  ".journal-colophon > *",
  ".article-layout",
  ".related-section",
  // Careers page
  ".career-craft > *",
  ".career-disciplines > *",
  ".career-letter > *",
  ".career-notes > *",
  // Contact & legal pages
  ".conversation-workspace > *",
  ".contact-channel",
  ".enquiry-card",
  ".conversation-faq > *",
  ".detail-cta",
  ".legal-page > *",
  // Shared footer
  ".footer-grid > div",
  ".footer-bottom",
].join(", ");

const STAGGERED_SELECTOR = [
  ".service-card",
  ".project-card",
  ".blog-card",
  ".belief-columns > *",
  ".capability-row",
  ".engagement-grid > *",
  ".journal-entry",
  ".career-disciplines > *",
  ".process-card",
  ".contact-channel",
  ".footer-grid > div",
].join(", ");

/**
 * Global Framer Motion scroll effects & Lenis smooth scrolling.
 * Progressive enhancement: server-rendered content remains visible if JS/motion is disabled.
 */
export default function SiteMotion({ revision }: { revision: string }) {
  const revealed = useRef(new WeakSet<Element>());
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};

    const setup = () => {
      dispose();
      if (preference.matches) return;

      const cleanups: (() => void)[] = [];

      // 1. Lenis smooth inertial scrolling across all pages
      const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        autoRaf: true,
        anchors: { offset: -90 },
        respectReducedMotion: true,
      });
      cleanups.push(() => lenis.destroy());

      // 2. Staggered viewport reveal animations
      const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS);
      if (targets.length > 0) {
        cleanups.push(
          inView(
            targets,
            (element) => {
              if (revealed.current.has(element)) return;
              revealed.current.add(element);

              const node = element as HTMLElement;
              const isStaggered = node.matches(STAGGERED_SELECTOR);
              const siblings = node.parentElement
                ? Array.from(node.parentElement.children)
                : [];
              const index = isStaggered
                ? Math.max(0, siblings.indexOf(node)) % 5
                : 0;

              const animation = animate(
                node,
                {
                  opacity: [0, 1],
                  transform: ["translateY(24px)", "translateY(0px)"],
                },
                {
                  duration: 0.68,
                  delay: index * 0.065,
                  ease: [0.22, 1, 0.36, 1],
                },
              );

              const restore = () => {
                node.style.removeProperty("opacity");
                node.style.removeProperty("transform");
              };

              animation.then(() => {
                animation.cancel();
                restore();
              });

              cleanups.push(() => {
                animation.cancel();
                restore();
              });
            },
            { amount: 0.08 },
          ),
        );
      }

      // 3. Scroll-linked parallax & depth scrubbing
      const addScrollEffect = (
        targetSelector: string,
        subjectSelector: string,
        keyframes: Record<string, string[] | number[]>,
        offset: ["start start" | "start end", "end start" | "center center"],
      ) => {
        const container = document.querySelector<HTMLElement>(targetSelector);
        const subject = document.querySelector<HTMLElement>(subjectSelector);
        if (!container || !subject) return;

        const controls = animate(subject, keyframes, { ease: "linear" });
        const stop = scroll(controls, { target: container, offset });
        cleanups.push(() => {
          stop();
          controls.cancel();
          subject.style.removeProperty("transform");
          subject.style.removeProperty("opacity");
        });
      };

      // Homepage hero scroll depth
      addScrollEffect(
        ".home-dark-top",
        ".hero-cobalt-content",
        {
          opacity: [1, 0.25],
          transform: ["translateY(0px)", "translateY(-28px)"],
        },
        ["start start", "end start"],
      );

      addScrollEffect(
        ".home-dark-top",
        ".hero-showcase-fan",
        {
          transform: ["translateY(0px) scale(1)", "translateY(-34px) scale(1.03)"],
        },
        ["start start", "end start"],
      );

      // About visual card settle
      addScrollEffect(
        ".about-section-wrapper",
        ".about-visual-card",
        {
          transform: [
            "translateY(26px) scale(0.97)",
            "translateY(0px) scale(1)",
          ],
        },
        ["start end", "center center"],
      );

      // Contact banner background parallax
      addScrollEffect(
        ".contact-banner",
        ".banner-bg-image",
        {
          transform: [
            "translateY(-6%) scale(1.08)",
            "translateY(6%) scale(1.08)",
          ],
        },
        ["start end", "end start"],
      );

      // Interior pages banner parallax
      addScrollEffect(
        ".interior-banner",
        ".interior-banner-image",
        {
          transform: [
            "translateY(0%) scale(1.02)",
            "translateY(14%) scale(1.1)",
          ],
        },
        ["start start", "end start"],
      );

      dispose = () => cleanups.forEach((cleanup) => cleanup());
    };

    setup();
    preference.addEventListener("change", setup);
    return () => {
      dispose();
      preference.removeEventListener("change", setup);
    };
  }, [revision]);

  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: progressScaleX }}
      aria-hidden="true"
    />
  );
}
