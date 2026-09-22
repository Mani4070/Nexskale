"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import type { Content } from "@/lib/content";

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ContactWorkspace({
  content,
  initialService = "",
}: {
  content: Content;
  initialService?: string;
}) {
  const [activeMode, setActiveMode] = useState<"project" | "call" | "inquiry">(
    "project",
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: initialService,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service:
            activeMode === "call"
              ? "Discovery call"
              : activeMode === "inquiry"
                ? "General inquiry"
                : formData.service,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setFormSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setSending(false);
    }
  };

  const faqItems = [
    {
      q: "How do we get started?",
      a: "Reach out through our contact form or send an email with an overview of your goals. We'll schedule an initial 30-minute discovery call within 24 hours to discuss scope, timeline, and budget.",
    },
    {
      q: "What is your typical project timeline?",
      a: "Most MVP builds and core digital products take between 4 to 12 weeks. We work in focused 2-week sprints with transparent progress updates and interactive preview deployments.",
    },
    {
      q: "Do you work with startups?",
      a: "Yes! We work extensively with early-stage and high-growth venture-backed startups to bring scalable MVPs to market rapidly, as well as established enterprise teams.",
    },
    {
      q: "Do you provide ongoing support?",
      a: "Yes, we offer ongoing product maintenance, cloud DevOps monitoring, performance tuning, and feature iteration packages after initial launch.",
    },
    {
      q: "Can we schedule a direct call?",
      a: "Certainly! You can request a calendar link by choosing 'Schedule a call' above, or let us know your preferred dates in your message.",
    },
  ];

  return (
    <div>
      {/* Hero Quick Action Filter Buttons */}
      <div className="contact-quick-actions">
        <div className="interior-wrap mockup-hero-actions">
          <button
            type="button"
            aria-pressed={activeMode === "project"}
            className={`mockup-btn-outline ${activeMode === "project" ? "active" : ""}`}
            onClick={() => setActiveMode("project")}
          >
            <Send size={22} /> Start a project
          </button>
          <button
            type="button"
            aria-pressed={activeMode === "call"}
            className={`mockup-btn-outline ${activeMode === "call" ? "active" : ""}`}
            onClick={() => setActiveMode("call")}
          >
            <Phone size={22} /> Schedule a call
          </button>
          <button
            type="button"
            aria-pressed={activeMode === "inquiry"}
            className={`mockup-btn-outline ${activeMode === "inquiry" ? "active" : ""}`}
            onClick={() => setActiveMode("inquiry")}
          >
            <Mail size={22} /> General inquiry
          </button>
        </div>
      </div>

      {/* Main 2-Column Contact Section */}
      <section className="contact-main-section" id="message-form">
        <div className="interior-wrap">
          <div className="contact-layout-grid">
            {/* Left: Message Form */}
            <div className="contact-form-card">
              <h2>Send us a message</h2>
              <p>
                {activeMode === "project" &&
                  "Tell us about your product goals, timeline, and what you want to achieve."}
                {activeMode === "call" &&
                  "Leave your details and we'll send a direct calendar invite for a discovery call."}
                {activeMode === "inquiry" &&
                  "Have a general question or partnership proposal? We'd love to connect."}
              </p>

              {activeMode === "project" && formData.service && (
                <p className="contact-service-context">Interested in: <strong>{formData.service}</strong></p>
              )}

              {formSubmitted ? (
                <div
                  style={{
                    padding: "40px 20px",
                    textAlign: "center",
                    background: "var(--brand-surface)",
                    borderRadius: "16px",
                    border: "1px solid var(--brand-border)",
                  }}
                >
                  <CheckCircle2
                    size={48}
                    color="var(--brand-blue)"
                    style={{ margin: "0 auto 16px" }}
                  />
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "var(--brand-indigo)",
                      margin: "0 0 8px",
                    }}
                  >
                    Thank you! We've received your message.
                  </h3>
                  <p style={{ color: "var(--brand-indigo)", fontSize: "14px", margin: 0 }}>
                    A senior member of our team will review your enquiry and
                    respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#334155",
                        marginBottom: "6px",
                      }}
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "10px",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#334155",
                        marginBottom: "6px",
                      }}
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      id="contact-email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "10px",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#334155",
                        marginBottom: "6px",
                      }}
                    >
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      id="contact-company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "10px",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#334155",
                        marginBottom: "6px",
                      }}
                    >
                      How can we help?
                    </label>
                    <textarea
                      required
                      rows={4}
                      minLength={10}
                      maxLength={5000}
                      placeholder="Describe your project, timeline, or questions..."
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "10px",
                        fontSize: "14px",
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <p role="alert">{error}</p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="mockup-btn-primary"
                    style={{ alignSelf: "flex-start" }}
                  >
                    {sending ? "Sending…" : "Send message"} <Send size={15} />
                  </button>
                </form>
              )}
            </div>

            {/* Right: Info Card + Map */}
            <div className="contact-side-column">
              <div className="contact-info-card">
                <h3>Get in touch</h3>
                <div className="contact-detail-item">
                  <Mail size={18} className="contact-detail-icon" />
                  <div>
                    <span className="contact-detail-label">Email</span>
                    <a
                      href={`mailto:${content.brand.email}`}
                      className="contact-detail-value"
                    >
                      {content.brand.email}
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <Phone size={18} className="contact-detail-icon" />
                  <div>
                    <span className="contact-detail-label">Phone</span>
                    <a
                      href="tel:+919876543210"
                      className="contact-detail-value"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <MapPin size={18} className="contact-detail-icon" />
                  <div>
                    <span className="contact-detail-label">Location</span>
                    <span className="contact-detail-value">
                      Hyderabad, India
                    </span>
                  </div>
                </div>

                <div className="contact-social-row">
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: 600,
                      marginRight: "4px",
                    }}
                  >
                    Follow us
                  </span>
                  <a
                    href={content.brand.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                  <a
                    href={content.brand.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label="Twitter / X"
                  >
                    <XIcon size={14} />
                  </a>
                  <a
                    href={content.brand.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={16} />
                  </a>
                </div>
              </div>

              <div className="contact-next-steps" data-reveal>
                <span className="corporate-kicker">WHAT HAPPENS NEXT</span>
                <h3>A clear start to your project.</h3>
                <ol>
                  <li><strong>Tell us your goals</strong><p>Share your idea, challenges and any timing requirements.</p></li>
                  <li><strong>Meet your technology partner</strong><p>We’ll discuss your needs and explore possible approaches.</p></li>
                  <li><strong>Agree on a practical plan</strong><p>Get a proposed scope, milestones and next steps.</p></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="contact-faq-section">
        <div className="interior-wrap">
          <div className="faq-header-row">
            <div>
              <span
                className="section-kicker"
                style={{
                  color: "var(--brand-blue)",
                  fontWeight: 700,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Need Assistance?
              </span>
              <h2>Frequently asked questions</h2>
            </div>
            <Link
              href="#message-form"
              style={{
                color: "var(--brand-blue)",
                fontSize: "14px",
                fontWeight: 650,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>

          <div className="faq-accordion-list">
            {faqItems.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <ChevronDown size={18} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>

          {/* Bottom Impact CTA Banner */}
          <div
            className="mockup-cta-banner"
            style={{ marginTop: "60px", marginBottom: "60px" }}
          >
            <div className="mockup-cta-copy">
              <h2>Let's turn your ideas into real impact.</h2>
              <p>
                From modern web apps and AI agents to enterprise cloud
                architectures, we're ready to engineer what's next for your
                business.
              </p>
              <Link href="#message-form" className="mockup-btn-primary">
                Start a conversation <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mockup-cta-image">
              <Image
                src="/images/nexuskale-reception.png"
                alt="Reception concept featuring the NexSkale brand"
                width={480}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
