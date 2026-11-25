"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "../logo";

export type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  brandName: string;
  navigation: readonly NavItem[] | NavItem[];
  currentPage?: string;
  hideSpacer?: boolean;
};

export default function Header({
  brandName,
  navigation,
  currentPage,
  hideSpacer = false,
}: HeaderProps) {
  const [mobile, setMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(currentPage || "home");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCompact = isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // On homepage, track visible section dynamically
      if (pathname === "/") {
        const sectionIds = ["blog", "work", "about", "services", "home"];
        const scrollMarker = window.scrollY + 180;

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && scrollMarker >= el.offsetTop) {
            setActiveSection(id);
            return;
          }
        }
        if (window.scrollY < 200) {
          setActiveSection("home");
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  function isLinkActive(href: string) {
    if (!href.includes("#")) {
      return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
    }
    if (pathname === "/") {
      if (href === "/" || href === "/#home") return activeSection === "home";
      const cleanHref = href.replace(/^\/#?/, "");
      return activeSection === cleanHref;
    }
    if (currentPage) {
      if (href === "/" || href === "/#home") return currentPage === "home";
      const cleanHref = href.replace(/^\/#?/, "");
      return currentPage === cleanHref;
    }
    return pathname === href;
  }

  return (
    <>
      <header
        className={`site-header-wrapper ${isCompact ? "is-scrolled" : "is-expanded"} ${isHome ? "is-home-static" : ""}`.trim()}
      >
        <div className="site-header hero-pill-header">
          <Logo name={brandName} height={30} variant="dark" />
          <nav
            aria-label="Main navigation"
            className={mobile ? "navigation is-open" : "navigation"}
          >
            {navigation.map((n) => {
              const active = isLinkActive(n.href);
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={active ? "is-active" : undefined}
                  onClick={() => {
                    setMobile(false);
                    const clean = n.href.replace(/^\/#?/, "");
                    setActiveSection(clean || "home");
                  }}
                >
                  <span>{n.label}</span>
                  {active && <span className="pill-nav-dot" aria-hidden="true" />}
                </Link>
              );
            })}
          </nav>
          <Link className="hero-pill-cta" href="/contact">
            <span>Start a project</span>
            <span className="hero-pill-cta-icon" aria-hidden="true">
              <ArrowRight size={14} strokeWidth={2.3} />
            </span>
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMobile(!mobile)}
            aria-expanded={mobile}
            aria-label="Toggle navigation"
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {!hideSpacer && <div className="site-header-spacer" aria-hidden="true" />}
    </>
  );
}
