"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  CheckCircle2,
  Copy,
  Headset,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquare,
  Plus,
  Send,
  UserRound,
  UsersRound,
} from "lucide-react";
import {
  FaInstagram as Instagram,
  FaLinkedinIn as Linkedin,
  FaYoutube as Youtube,
} from "react-icons/fa";
import type { Content } from "@/lib/content";
import styles from "./contact-workspace.module.css";

const modes = [
  {
    id: "project",
    title: "Start a project",
    text: "Tell us about your idea and goals",
    icon: MessageSquare,
  },
  {
    id: "call",
    title: "Schedule a call",
    text: "Book time with our team",
    icon: CalendarDays,
  },
  {
    id: "inquiry",
    title: "General inquiry",
    text: "Have a question? We’re here.",
    icon: Mail,
  },
] as const;
const faqs = [
  [
    "How do we get started?",
    "Tell us about your idea using the form above. We’ll get in touch to understand your goals, discuss your requirements, and agree on the next steps.",
  ],
  [
    "What is your typical project timeline?",
    "Timelines depend on the scope and complexity of your project. Most MVPs take 4–12 weeks. After our initial conversation, we’ll share a plan with clear milestones.",
  ],
  [
    "Do you work with startups?",
    "Yes! We help startups bring their first product to life and support growing businesses as they scale.",
  ],
  [
    "Do you provide ongoing support?",
    "Yes. We offer maintenance, performance improvements, cloud monitoring, and ongoing feature development after launch.",
  ],
  [
    "Can we schedule a direct call?",
    "Absolutely. Choose Schedule a call above and include your preferred dates and time zone in your message. We’ll follow up to arrange a suitable time.",
  ],
];
const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=HITEC+City+Hyderabad+India";

export default function ContactWorkspace({
  content,
  initialService = "",
}: {
  content: Content;
  initialService?: string;
}) {
  const [mode, setMode] = useState<"project" | "call" | "inquiry">("project");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState("");
  const [copyNotice, setCopyNotice] = useState("");
  const [allFaqs, setAllFaqs] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          service:
            mode === "call"
              ? "Discovery call"
              : mode === "inquiry"
                ? "General inquiry"
                : data.service,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setStatus("idle");
    }
  }
  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setCopyNotice(`${label} copied.`);
    } catch {
      setCopyNotice(
        "Copy is unavailable. Please select and copy the contact detail.",
      );
    }
  }
  const details = [
    {
      label: "Email",
      value: content.brand.email,
      href: `mailto:${content.brand.email}`,
      icon: Mail,
    },
    {
      label: "Phone",
      value: "+91 83758 42379",
      href: "tel:+918375842379",
      icon: Headset,
    },
    {
      label: "Location",
      value: "Hyderabad, India",
      href: mapsUrl,
      icon: MapPin,
    },
  ];
  return (
    <div className={styles.page}>
      <section className={styles.hero} data-reveal>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>CONTACT NEXSKALE</span>
            <h1>
              Your next chapter.
              <br />
              <span>Built together.</span>
            </h1>
            <p>
              Partner with a team that turns complex challenges into dependable
              digital solutions. Tell us where you want to go. We will help you
              get there.
            </p>
            <div className={styles.heroLinks}>
              <a className={styles.heroCta} href="#message-form">
                Discuss your project <ArrowRight size={18} />
              </a>
              <a
                className={styles.heroEmail}
                href={`mailto:${content.brand.email}`}
              >
                Email our team <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroPhoto}>
              <Image
                src="/images/services/matched-hero.webp"
                alt="NexSkale team collaborating on a digital project"
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                preload
              />
            </div>
            <div className={styles.heroCaption}>
              <span className={styles.captionIcon}>
                <UsersRound size={23} />
              </span>
              <div>
                <strong>A conversation is the first step.</strong>
                <span>Our people. Your ambition. A shared direction.</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.promises}>
          {[
            {
              icon: BadgeCheck,
              title: "Quick response",
              text: "We reply within 24 hours",
            },
            {
              icon: UsersRound,
              title: "Right expertise",
              text: "Connect with the right team",
            },
            {
              icon: LockKeyhole,
              title: "Confidential",
              text: "Your ideas are safe with us",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className={styles.roundIcon}>
                <Icon size={20} />
              </span>
              <div>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        className={styles.actions}
        aria-label="Choose how to get in touch"
        data-reveal
      >
        <div className={styles.wrap}>
          {modes.map(({ id, title, text, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => {
                setMode(id);
                document.getElementById("message-form")?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                  block: "start",
                });
              }}
            >
              <span className={styles.actionIcon}>
                <Icon />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
              <span className={styles.actionArrow}>
                <ArrowRight size={19} />
              </span>
            </button>
          ))}
        </div>
      </section>
      <div className={styles.wrap}>
        <section
          className={styles.contactGrid}
          id="message-form"
          aria-label="Contact NexSkale"
          data-reveal
        >
          <div className={styles.card} data-reveal>
            <h2>
              {mode === "call"
                ? "Let’s schedule a call"
                : mode === "inquiry"
                  ? "What’s on your mind?"
                  : "Send us a message"}
            </h2>
            <p>
              {mode === "call"
                ? "Share your preferred dates and time zone. We’ll get in touch to arrange a call."
                : mode === "inquiry"
                  ? "Have a question or a partnership idea? We’d love to hear from you."
                  : "Tell us about your project goals, timeline, and what you want to achieve. We’ll get back to you as soon as possible."}
            </p>
            {status === "success" ? (
              <div className={styles.success} role="status">
                <CheckCircle2 size={48} />
                <h3>Thanks for reaching out!</h3>
                <p>
                  Your message has been received. Our team will get back to you
                  soon.
                </p>
                <button
                  className={styles.primary}
                  onClick={() => {
                    setStatus("idle");
                    setMessage("");
                  }}
                >
                  Send another message <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                  <span className={styles.fieldIcon}>
                    <UserRound />
                  </span>
                  <label>
                    Your name
                    <input
                      name="name"
                      required
                      minLength={2}
                      maxLength={120}
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  </label>
                </div>
                <div className={styles.field}>
                  <span className={styles.fieldIcon}>
                    <Mail />
                  </span>
                  <label>
                    Your email
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      placeholder="john@company.com"
                      autoComplete="email"
                    />
                  </label>
                </div>
                <div className={styles.field}>
                  <span className={styles.fieldIcon}>
                    <Mail />
                  </span>
                  <label>
                    Company (optional)
                    <input
                      name="company"
                      maxLength={200}
                      placeholder="Acme Corp"
                      autoComplete="organization"
                    />
                  </label>
                </div>
                <div className={styles.field}>
                  <span className={styles.fieldIcon}>
                    <UsersRound />
                  </span>
                  <label>
                    How can we help?
                    <select name="service" defaultValue={initialService}>
                      <option value="">Select an option</option>
                      {initialService &&
                        !content.services.some(
                          (s) => s.title === initialService,
                        ) && <option>{initialService}</option>}
                      {content.services.map((s) => (
                        <option key={s.id}>{s.title}</option>
                      ))}
                      <option>Something else</option>
                    </select>
                  </label>
                </div>
                <div className={`${styles.field} ${styles.messageField}`}>
                  <span className={styles.fieldIcon}>
                    <MessageSquare />
                  </span>
                  <label>
                    Message
                    <textarea
                      name="message"
                      required
                      minLength={10}
                      maxLength={500}
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        mode === "call"
                          ? "Tell us what you’d like to discuss and your preferred dates and time zone…"
                          : "Describe your project, timeline or questions…"
                      }
                    />
                    <span className={styles.counter}>{message.length}/500</span>
                  </label>
                </div>
                {error && (
                  <p className={styles.error} role="alert">
                    {error}
                  </p>
                )}
                <div className={styles.formBottom}>
                  <button
                    className={styles.primary}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <ArrowRight size={20} />
                  </button>
                  <span className={styles.handwritten}>
                    <span>⤴</span> Let’s talk
                    <br />
                    about your next big idea!
                  </span>
                </div>
              </form>
            )}
          </div>
          <aside className={styles.side}>
            <div className={styles.card} data-reveal>
              <h2>Get in touch</h2>
              <p className={styles.intro}>
                Prefer a direct conversation? Reach us through any of these
                channels.
              </p>
              <div className={styles.details}>
                {details.map(({ label, value, href, icon: Icon }) => (
                  <div className={styles.detail} key={label}>
                    <span className={styles.roundIcon}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <small>{label}</small>
                      <a
                        href={href}
                        target={label === "Location" ? "_blank" : undefined}
                        rel={
                          label === "Location"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {value}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copy(value, label)}
                      aria-label={`Copy ${label.toLowerCase()}`}
                    >
                      {copied === label ? (
                        <Check size={15} />
                      ) : (
                        <Copy size={15} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <span className={styles.srOnly} role="status">
                {copyNotice}
              </span>
              <div className={styles.socials}>
                <strong>Follow us</strong>
                <a
                  href={content.brand.social.linkedin}
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={content.brand.social.twitter}
                  aria-label="X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  𝕏
                </a>
                <a
                  href={content.brand.social.instagram}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={content.brand.social.youtube}
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
            <div className={styles.office} data-reveal>
              <div className={styles.officeTop}>
                <Image
                  src="/images/nexuskale-reception.png"
                  alt="NexSkale office reception"
                  fill
                  sizes="(max-width: 700px) 90vw, 42vw"
                />
                <div>
                  <MapPin size={20} />
                  <h3>Visit our office</h3>
                  <p>
                    NexSkale Tech Hub
                    <br />
                    Hitech City, Hyderabad,
                    <br />
                    Telangana, India
                  </p>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    Get directions <ArrowRight size={15} />
                  </a>
                </div>
              </div>
              <div className={styles.liveMap}>
                <iframe
                  title="Interactive street map of Hitech City, Hyderabad"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=78.366%2C17.435%2C78.396%2C17.460&layer=mapnik"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <div className={styles.mapFooter}>
                  <span>
                    <MapPin size={15} /> Hitech City, Hyderabad
                  </span>
                  <a
                    href="https://www.openstreetmap.org/#map=15/17.4475/78.3810"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View larger map <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </section>
        <section
          className={styles.faq}
          aria-labelledby="faq-heading"
          data-reveal
        >
          <span className={styles.eyebrow}>HELP & INFORMATION</span>
          <div className={styles.faqHeading}>
            <h2 id="faq-heading">Frequently asked questions</h2>
            <button onClick={() => setAllFaqs(!allFaqs)}>
              {allFaqs ? "Collapse FAQs" : "View all FAQs"}
              <ArrowRight size={15} />
            </button>
          </div>
          <p>
            Quick answers to common questions. Can’t find what you’re looking
            for? Contact us directly.
          </p>
          <div className={styles.faqList}>
            {faqs.map(([question, answer]) => (
              <details
                data-reveal
                key={`${question}-${allFaqs}`}
                open={allFaqs || undefined}
              >
                <summary>
                  {question}
                  <Plus size={17} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className={styles.banner} data-reveal>
          <Image
            src="/images/reference/team-meeting.webp"
            alt="Team collaborating on a new project"
            fill
            sizes="90vw"
          />
          <div className={styles.bannerCopy}>
            <span className={styles.eyebrow}>LET’S BUILD TOGETHER</span>
            <h2>Turn your ideas into real impact.</h2>
            <p>
              From modern web apps and AI agents to enterprise cloud solutions,
              <br />
              we help businesses innovate and grow.
            </p>
            <a href="#message-form">
              Start a conversation <ArrowRight size={16} />
            </a>
          </div>
          <div className={styles.delivered}>
            <span className={styles.roundIcon}>
              <ChartNoAxesColumnIncreasing />
            </span>
            <div>
              <strong>50+</strong>
              <small>Projects Delivered</small>
            </div>
          </div>
          <span className={styles.plane} aria-hidden="true">
            <Send size={32} />
          </span>
        </section>
      </div>
    </div>
  );
}
