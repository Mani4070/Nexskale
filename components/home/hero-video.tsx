"use client";

export default function HeroVideo() {
  return (
    <video
      src="/videos/hero-video1.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="hero-background-video"
    />
  );
}
