import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Cloud, Code2, Cpu, PanelsTopLeft, Pencil, Rocket, Search, Settings, Smartphone, Zap } from "lucide-react";
import { SiGooglecloud, SiMongodb, SiPostgresql, SiVercel } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { Content } from "@/lib/content";
import PageHero from "@/components/layout/page-hero";
import StatCounter from "@/components/home/stat-counter";

const artwork: Record<string, { icon: typeof Code2; text: string; link: string }> = {
  web: { icon: Code2, text: "Modern, scalable and high-performance web applications tailored to your business needs.", link: "Web Development" },
  mobile: { icon: Smartphone, text: "Cross-platform mobile apps that deliver seamless user experiences.", link: "Mobile Apps" },
  ai: { icon: Cpu, text: "Leverage AI to automate processes, gain insights and build intelligent products.", link: "AI Solutions" },
  saas: { icon: Box, text: "End-to-end SaaS development from MVP to enterprise-grade platforms.", link: "SaaS Development" },
  cloud: { icon: Cloud, text: "Build scalable, secure and highly available infrastructure on cloud.", link: "Cloud & DevOps" },
  design: { icon: Pencil, text: "Create intuitive and engaging user experiences that drive business growth.", link: "UI/UX Design" },
};
const steps = [
  { title: "Discover", text: "Understand your goals, challenges and opportunities.", icon: Search },
  { title: "Design", text: "Create intuitive and scalable solutions with a focus on user experience.", icon: PanelsTopLeft },
  { title: "Build", text: "Develop with modern technologies, best practices and quality standards.", icon: Settings },
  { title: "Launch & Evolve", text: "Deploy, monitor and continuously improve for long-term success.", icon: Rocket },
];

export default function ServicesExperience({ services }: { services: Content["services"] }) {
  return (
    <div className="sx-page">
      <PageHero
        badge="OUR SERVICES"
        title={
          <>
            Technology that
            <br />
            moves business
            <br />
            <span className="gradient-text">forward.</span>
          </>
        }
        description="We build digital products, modern platforms and AI-powered solutions that help businesses grow, adapt and lead in a fast-changing world."
        imageSrc="/images/services/technology-banner.webp"
        imageAlt="Desktop, tablet and mobile app interfaces alongside cloud and network hardware"
      >
        <div className="mockup-hero-actions">
          <Link className="mockup-btn-primary" href="/contact">
            Discuss your project <ArrowRight size={16} />
          </Link>
          <Link className="mockup-btn-outline" href="#capabilities">
            Explore our services
          </Link>
        </div>
        <div className="hero-stats-row sx-hero-stats">
          {[
            ["50+", "Projects Delivered"],
            ["20+", "Happy Clients"],
            ["3+", "Years of Experience"],
          ].map(([value, label]) => (
            <div key={label} className="hero-stat-item">
              <span className="stat-num"><StatCounter value={value} /></span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="sx-partners-section" aria-label="Technology ecosystem">
        <div className="sx-wrap sx-partners">
          <span className="sx-trust-label">TRUSTED BY FORWARD-THINKING BUSINESSES</span>
          <div className="sx-partner"><span className="sx-microsoft" aria-hidden="true"><i /><i /><i /><i /></span>Microsoft</div>
          <div className="sx-partner sx-aws"><FaAws aria-hidden="true" /><span className="sr-only">Amazon Web Services</span></div>
          <div className="sx-partner"><SiGooglecloud aria-hidden="true" />Google Cloud</div>
          <div className="sx-partner"><SiVercel aria-hidden="true" />Vercel</div>
          <div className="sx-partner sx-mongo"><SiMongodb aria-hidden="true" />MongoDB.</div>
          <div className="sx-partner"><SiPostgresql aria-hidden="true" />PostgreSQL</div>
        </div>
      </section>

      <section className="sx-services sx-wrap" id="capabilities" aria-labelledby="capabilities-title">
        <div className="sx-section-heading" data-reveal>
          <div>
            <span className="sx-kicker">OUR SERVICES</span>
            <h2 id="capabilities-title">The expertise to move<br />your business forward.</h2>
          </div>
          <p>From idea to deployment, we deliver end-to-end solutions that create real impact. Explore our core services designed to help you innovate, scale and stay ahead.</p>
          <Link className="sx-button sx-button-small" href="#service-grid">View all services <ArrowRight size={15} /></Link>
        </div>
        <div className="sx-service-grid" id="service-grid">
          {services.map((service) => {
            const details = artwork[service.id];
            const Icon = details?.icon ?? Code2;
            return (
              <article className="sx-card" key={service.id} data-reveal>
                <Image src={details ? `/images/services/matched-${service.id}.webp` : service.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
                <div className="sx-card-copy">
                  <span className="sx-card-icon"><Icon size={26} strokeWidth={1.7} /></span>
                  <h3>{service.title}</h3>
                  <p>{details?.text ?? service.description}</p>
                  <Link href={`/services/${service.id}`} className="sx-card-link">
                    Explore {details?.link ?? service.title} <ArrowRight size={15} />
                    <span className="sx-card-arrow" aria-hidden="true"><ArrowRight size={20} /></span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sx-process" aria-labelledby="process-title">
        <div className="sx-wrap">
          <div className="sx-section-heading" data-reveal>
            <div>
              <span className="sx-kicker">HOW WE WORK</span>
              <h2 id="process-title">A clear process.<br />A shared direction.</h2>
            </div>
            <p>We follow a simple, transparent process to turn your ideas into scalable solutions — with collaboration at every step.</p>
            <Link className="sx-button sx-button-small" href="/contact">Start your project <ArrowRight size={15} /></Link>
          </div>
          <ol className="sx-steps">
            {steps.map(({ title, text, icon: Icon }, i) => (
              <li key={title} data-reveal>
                <div className="sx-step-top">
                  <span className="sx-step-icon"><Icon size={26} /></span>
                  <span className="sx-step-number">0{i + 1}</span>
                  {i < 3 && <span className="sx-step-line"><ArrowRight size={16} /></span>}
                </div>
                <div className="sx-step-copy">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="sx-wrap sx-cta-wrap">
          <div className="sx-cta" data-reveal>
            <Image src="/images/services/matched-cta.webp" alt="Developer working at illuminated monitors in an evening office" fill sizes="(max-width: 900px) 100vw," />
            <div>
              <span className="sx-kicker">LET’S BUILD WHAT’S NEXT</span>
              <h2>Good technology starts<br />with a good conversation.</h2>
              <p>Tell us what you’re planning. We’ll help you find the right approach.</p>
              <Link className="sx-button sx-button-white" href="/contact">Discuss your project <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
