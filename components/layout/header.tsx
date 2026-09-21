"use client";

import { useState } from "react";
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
};

export default function Header({
  brandName,
  navigation,
  currentPage,
}: HeaderProps) {
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();

  function isLinkActive(href: string) {
    if (currentPage) {
      if (href === "/" || href === "/#home") return currentPage === "home";
      const cleanHref = href.replace(/^\/#?/, "");
      return currentPage === cleanHref;
    }
    if (href === "/") return pathname === "/";
    return pathname === href;
  }

  return (
    <header className="site-header container">
      <Logo name={brandName} height={40} />
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
              onClick={() => setMobile(false)}
            >
              <span>{n.label}</span>
              {active && <span className="nav-active-bar" aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>
      <Link className="button header-cta" href="/contact">
        Let’s build <ArrowRight size={15} />
      </Link>
      <button
        className="menu-toggle"
        onClick={() => setMobile(!mobile)}
        aria-expanded={mobile}
        aria-label="Toggle navigation"
      >
        {mobile ? <X /> : <Menu />}
      </button>
    </header>
  );
}
