"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Check, LoaderCircle } from "lucide-react";
import type { Content } from "@/lib/content";
import Logo from "../logo";

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

type FooterProps = {
  content: Content;
};

export default function Footer({ content: c }: FooterProps) {
  const [subStatus, setSubStatus] = useState("");
  const [subError, setSubError] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubStatus("sending");
    setSubError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setSubStatus("success");
      form.reset();
    } catch (e) {
      setSubStatus("error");
      setSubError(e instanceof Error ? e.message : "Please try again.");
    }
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      href: c.brand?.social?.linkedin || "https://linkedin.com",
      icon: <LinkedinIcon size={18} />,
    },
    {
      name: "X",
      href: c.brand?.social?.twitter || "https://x.com",
      icon: <XIcon size={16} />,
    },
    {
      name: "GitHub",
      href: c.brand?.social?.github || "https://github.com",
      icon: <GithubIcon size={18} />,
    },
    {
      name: "Instagram",
      href: c.brand?.social?.instagram || "https://instagram.com",
      icon: <InstagramIcon size={18} />,
    },
    {
      name: "YouTube",
      href: c.brand?.social?.youtube || "https://youtube.com",
      icon: <YoutubeIcon size={18} />,
    },
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo name={c.brand.name} mode="full" height={44} />
            <p>{c.brand.tagline}</p>
            <a className="email-link" href={`mailto:${c.brand.email}`}>
              <Mail size={16} />
              {c.brand.email}
            </a>
            <div className="footer-socials">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="social-icon-btn"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Quick links</h4>
            <div className="footer-links">
              {c.navigation.map((n) => (
                <Link key={n.label} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4>Our expertise</h4>
            <div className="footer-links">
              {c.services.map((s) => (
                <Link key={s.id} href="/services">
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="subscribe">
            <h4>A little inspiration. In your inbox.</h4>
            <p>Fresh perspectives on technology and growth.</p>
            <form onSubmit={subscribe}>
              <label className="sr-only" htmlFor="subscribe-email">
                Your email address
              </label>
              <input
                id="subscribe-email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                maxLength={254}
              />
              <button
                aria-label="Subscribe to newsletter"
                disabled={subStatus === "sending" || subStatus === "success"}
              >
                {subStatus === "sending" ? (
                  <LoaderCircle className="spin" size={18} />
                ) : subStatus === "success" ? (
                  <Check size={18} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>
            <div aria-live="polite" className="subscribe-status">
              {subStatus === "success"
                ? "You’re on the list. Thanks for subscribing!"
                : subError}
            </div>
            <span className="subscribe-note">
              Thoughtful updates. No noise.
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {c.brand.name} Tech. All rights
            reserved.
          </span>
          <div>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of service</Link>
            <Link href="/admin">Admin</Link>
          </div>
          <span>
            Built with purpose. <span className="purple-heart">✦</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
