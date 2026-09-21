import {
  Sparkles,
  Monitor,
  Smartphone,
  Cloud,
  BookOpen,
  Flame,
  Code2,
  Globe,
  Clock,
  CheckCircle2,
  Layers,
  Check,
  ShieldCheck,
  Zap,
  Mail,
} from "lucide-react";

export type PageIntroVariant =
  | "careers"
  | "services"
  | "blog"
  | "blog-detail"
  | "work"
  | "about"
  | "contact"
  | "legal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  variant?: PageIntroVariant;
};

export default function PageIntro({
  eyebrow,
  title,
  description,
  variant,
}: PageIntroProps) {
  return (
    <section className="page-intro container">
      <div className="page-intro-grid">
        <div className="page-intro-content">
          <div className="hero-pill-badge">
            <span className="hero-pill-dot" />
            <span className="hero-pill-text">{eyebrow}</span>
          </div>
          <h1 className="hero-gradient-title">{title}</h1>
          <p className="hero-description">{description}</p>
        </div>

        <div className="page-intro-visual" aria-hidden="true">
          {variant === "careers" && (
            <div className="intro-glass-card">
              <div className="glass-card-header">
                <Code2 size={16} className="sparkle-accent" />
                <span>Build with purpose</span>
              </div>
              <div className="glass-topics-row">
                <span className="topic-chip">Engineering</span>
                <span className="topic-chip">Design</span>
                <span className="topic-chip">Collaboration</span>
              </div>
              <div className="glass-card-footer">
                <Sparkles size={13} />
                <span>Bring your curiosity and craft</span>
              </div>
            </div>
          )}
          {variant === "services" && (
            <div className="intro-glass-card">
              <div className="glass-card-header">
                <Sparkles size={16} className="sparkle-accent" />
                <span>Capabilities Spectrum</span>
              </div>
              <div className="glass-caps-grid">
                <div className="glass-cap-item">
                  <Monitor size={15} />
                  <span>Full-Stack Web</span>
                </div>
                <div className="glass-cap-item">
                  <Smartphone size={15} />
                  <span>Mobile Applications</span>
                </div>
                <div className="glass-cap-item">
                  <Sparkles size={15} />
                  <span>AI Agents & RAG</span>
                </div>
                <div className="glass-cap-item">
                  <Cloud size={15} />
                  <span>Cloud Architecture</span>
                </div>
              </div>
              <div className="glass-card-footer">
                <span className="pulse-dot" />
                <span>Production ready · Enterprise grade</span>
              </div>
            </div>
          )}

          {variant === "blog" && (
            <div className="intro-glass-card">
              <div className="glass-card-header">
                <BookOpen size={16} className="sparkle-accent" />
                <span>Perspective Dispatch</span>
              </div>
              <div className="glass-topics-row">
                <span className="topic-chip">
                  <Flame size={12} /> Generative AI
                </span>
                <span className="topic-chip">
                  <Code2 size={12} /> Systems
                </span>
                <span className="topic-chip">
                  <Globe size={12} /> Cloud
                </span>
              </div>
              <div className="glass-card-footer">
                <Clock size={13} />
                <span>Curated engineering articles</span>
              </div>
            </div>
          )}

          {variant === "blog-detail" && (
            <div className="intro-glass-card">
              <div className="glass-card-header">
                <Sparkles size={16} className="sparkle-accent" />
                <span>Technical Insight</span>
              </div>
              <div className="glass-meta-badges">
                <div className="glass-badge-pill">
                  <Clock size={13} />
                  <span>Deep dive</span>
                </div>
                <div className="glass-badge-pill">
                  <CheckCircle2 size={13} />
                  <span>Verified practices</span>
                </div>
              </div>
              <div className="glass-card-footer">
                <span className="pulse-dot" />
                <span>NexSkale Engineering & AI</span>
              </div>
            </div>
          )}

          {variant === "work" && (
            <div className="intro-glass-card">
              <div className="glass-card-header">
                <Layers size={16} className="sparkle-accent" />
                <span>Portfolio Overview</span>
              </div>
              <div className="glass-caps-grid">
                <div className="glass-cap-item">
                  <Check size={14} />
                  <span>Assistly · AI Workspace</span>
                </div>
                <div className="glass-cap-item">
                  <Check size={14} />
                  <span>Commerce · Scalable Store</span>
                </div>
                <div className="glass-cap-item">
                  <Check size={14} />
                  <span>Formly · Native Mobile</span>
                </div>
                <div className="glass-cap-item">
                  <Check size={14} />
                  <span>Flowstate · Automation</span>
                </div>
              </div>
              <div className="glass-card-footer">
                <span className="pulse-dot" />
                <span>4 Interactive Concepts</span>
              </div>
            </div>
          )}

          {variant === "about" && (
            <div className="intro-glass-card">
              <div className="glass-card-header">
                <ShieldCheck size={16} className="sparkle-accent" />
                <span>Core Track Record</span>
              </div>
              <div className="glass-metrics-grid">
                <div className="glass-stat">
                  <strong>50+</strong>
                  <span>Delivered</span>
                </div>
                <div className="glass-stat">
                  <strong>30+</strong>
                  <span>Partners</span>
                </div>
                <div className="glass-stat">
                  <strong>99%</strong>
                  <span>Satisfaction</span>
                </div>
              </div>
              <div className="glass-card-footer">
                <span className="pulse-dot" />
                <span>Direct engineering craft</span>
              </div>
            </div>
          )}

          {variant === "contact" && (
            <div className="intro-glass-card">
              <div className="glass-card-header">
                <Zap size={16} className="sparkle-accent" />
                <span>Fast Collaboration</span>
              </div>
              <div className="glass-caps-grid">
                <div className="glass-cap-item active-indicator">
                  <span className="pulse-dot" />
                  <span>Accepting new projects</span>
                </div>
                <div className="glass-cap-item">
                  <Clock size={14} />
                  <span>Turnaround &lt; 24h</span>
                </div>
              </div>
              <div className="glass-card-footer">
                <Mail size={13} />
                <span>hello@nexskale.com</span>
              </div>
            </div>
          )}

          {variant === "legal" && (
            <div className="intro-glass-card">
              <div className="glass-card-header">
                <ShieldCheck size={16} className="sparkle-accent" />
                <span>Integrity & Privacy</span>
              </div>
              <div className="glass-card-footer">
                <span>Updated September 2026</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
