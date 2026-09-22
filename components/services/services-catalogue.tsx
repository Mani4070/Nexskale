import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Bot,
  Layers,
  Cloud,
  PenTool,
  Check,
} from "lucide-react";
import type { Content } from "@/lib/content";

const icons = [Code2, Smartphone, Bot, Layers, Cloud, PenTool];

export default function ServicesCatalogue({
  services,
}: {
  services: Content["services"];
}) {
  return (
    <div className="corporate-services interior-wrap">
      <section className="capabilities-section" id="capabilities">
        <div className="corporate-section-heading" data-reveal>
          <div>
            <span className="corporate-kicker">OUR CAPABILITIES</span>
            <h2>
              The expertise to move
              <br />
              your business forward.
            </h2>
          </div>
          <p>
            One technology partner, from the first conversation to the next
            stage of growth. Explore the right solution for your business.
          </p>
        </div>
        <div className="capability-grid">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article
                className="capability-card"
                id={`capability-${service.id}`}
                key={service.id}
                data-reveal
              >
                <div className="capability-top">
                  <Icon size={28} strokeWidth={1.5} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>
                  <Link href={`/services/${service.id}`}>{service.title}</Link>
                </h3>
                <p>{service.detail}</p>
                <ul>
                  {service.features.slice(0, 3).map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  className="corporate-text-link"
                  href={`/services/${service.id}`}
                >
                  Explore {service.title.toLowerCase()} <ArrowRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <section className="delivery-section" data-reveal>
        <div className="corporate-section-heading">
          <div>
            <span className="corporate-kicker">HOW WE WORK</span>
            <h2>
              A clear process.
              <br />A shared direction.
            </h2>
          </div>
          <p>
            Clear scope, regular reviews and a considered handover keep your
            team involved at every stage.
          </p>
        </div>
        <div className="delivery-grid">
          {[
            [
              "Discover",
              "Understand your goals, users and constraints. Agree on what success looks like.",
            ],
            [
              "Design",
              "Translate requirements into a practical roadmap, architecture and user experience.",
            ],
            [
              "Build",
              "Deliver in focused iterations, with working demonstrations and quality checks.",
            ],
            [
              "Launch & evolve",
              "Release, document the handover and plan the next improvements.",
            ],
          ].map(([title, text], index) => (
            <div key={title}>
              <span className="delivery-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="corporate-cta" data-reveal>
        <div>
          <span className="corporate-kicker">
            LET’S TALK ABOUT YOUR NEXT STEP
          </span>
          <h2>
            Good technology starts
            <br />
            with a good conversation.
          </h2>
          <p>
            Tell us what you want to achieve. We’ll help shape the right
            approach.
          </p>
        </div>
        <Link className="corporate-button" href="/contact">
          Discuss your project <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
