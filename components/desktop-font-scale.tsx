"use client";

import { useEffect } from "react";

const supportedZooms = [0.8, 0.9, 1];

export default function DesktopFontScale() {
  useEffect(() => {
    const root = document.documentElement;
    const desktop = window.matchMedia("(min-width: 1001px) and (hover: hover)");

    const update = () => {
      root.style.removeProperty("--zoom-font-scale");
      if (!desktop.matches || !window.innerWidth || !window.outerWidth) return;

      // Desktop Chromium reports the outer window in screen pixels and the
      // viewport in zoomed CSS pixels. Allow a small window-border tolerance.
      // This is an estimate: side panels and other browsers can affect it.
      const estimate = window.outerWidth / window.innerWidth;
      const zoom = supportedZooms.find((value) => Math.abs(value - estimate) < 0.025);
      if (zoom === undefined) return;

      // Preserve the compact 100% appearance at the requested zoom levels.
      // Larger accessibility zoom levels retain normal browser scaling.
      root.style.setProperty("--zoom-font-scale", String(0.8 / zoom));
    };

    update();
    window.addEventListener("resize", update);
    desktop.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      desktop.removeEventListener("change", update);
      root.style.removeProperty("--zoom-font-scale");
    };
  }, []);

  return null;
}
