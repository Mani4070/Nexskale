import React, { ReactNode } from "react";
import Image from "next/image";

type PageHeroProps = {
  badge: string;
  title: ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
  split?: boolean;
};

export default function PageHero({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  split = false,
}: PageHeroProps) {
  return (
    <section
      className={`mockup-hero-wrapper ${split ? "corporate-split-hero" : ""}`}
    >
      <div className="hero-backdrop">
        <Image src={imageSrc} alt={imageAlt} fill priority sizes="100vw" />
      </div>
      <div className="interior-wrap">
        <div className="mockup-hero-grid">
          <div className="mockup-hero-copy">
            <span className="mockup-hero-badge">{badge}</span>
            <h1 className="mockup-hero-title">{title}</h1>
            <p className="mockup-hero-desc">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
