"use client";

import { useEffect, useRef } from "react";
import { animate, inView, scroll } from "motion";

/** Progressive enhancement: server-rendered content stays visible without JS. */
export default function SiteMotion({ revision }: { revision: string }) {
  const progress = useRef<HTMLDivElement>(null);
  const revealed = useRef(new WeakSet<Element>());

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (preference.matches) return;
      const cleanups: (() => void)[] = [];
      const targets = document.querySelectorAll<HTMLElement>(
        ".site-header, .hero-content > *, .page-intro > :not(.intro-orbit), .detail-copy, .expertise-panel, .product-showcase, .process-card, .contact-context, .contact-form-panel, .article-layout, .related-section, .detail-cta, .stats > div, .partners .eyebrow, .partner, .section-heading, .service-card, .about-copy > :not(.principles), .principles > div, .office-image, .project-card, .banner-content > div, .blog-card, .footer-grid > div, .footer-bottom",
      );
      cleanups.push(
        inView(
          targets,
          (element) => {
            if (revealed.current.has(element)) return;
            revealed.current.add(element);
            const node = element as HTMLElement;
            const staggered = node.matches(
              ".service-card, .project-card, .blog-card, .partner, .principles > div, .footer-grid > div, .stats > div",
            );
            const index = staggered
              ? Array.from(node.parentElement!.children).indexOf(node) % 4
              : 0;
            const animation = animate(
              node,
              {
                opacity: [0, 1],
                transform: ["translateY(24px)", "translateY(0px)"],
              },
              { duration: 0.7, delay: index * 0.075, ease: [0.22, 1, 0.36, 1] },
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
          { amount: 0.12 },
        ),
      );

      if (progress.current) {
        const bar = progress.current;
        cleanups.push(
          scroll((value: number) => {
            bar.style.transform = `scaleX(${value})`;
          }),
        );
      }
      dispose = () => cleanups.forEach((cleanup) => cleanup());
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      dispose();
      preference.removeEventListener("change", setup);
    };
  }, [revision]);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
