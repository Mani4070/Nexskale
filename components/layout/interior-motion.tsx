"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Animate only inner pages; content remains visible without JavaScript. */
export default function InteriorMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (preference.matches) return;
      const animations: Animation[] = [];
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            observer.unobserve(target);
            const index = Array.from(
              target.parentElement?.children || [],
            ).indexOf(target);
            animations.push(
              target.animate(
                [
                  { opacity: 0, transform: "translateY(22px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                {
                  duration: 650,
                  delay: Math.min(index % 3, 2) * 65,
                  easing: "cubic-bezier(.22,1,.36,1)",
                },
              ),
            );
          });
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(
          ".interior-site main > section, .interior-site .mockup-hero-copy > *, .interior-site [data-reveal], .interior-site .about-mv-card, .interior-site .about-team-card, .interior-site .about-value-card, .interior-site .blog-featured-card, .interior-site .blog-article-card, .interior-site .blog-newsletter-card, .interior-site .careers-job-row, .interior-site .contact-form-card, .interior-site .contact-info-card, .interior-site .faq-item",
        )
        .forEach((node) => observer.observe(node));
      cleanup = () => {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      cleanup();
      preference.removeEventListener("change", setup);
    };
  }, [pathname]);
  return null;
}
