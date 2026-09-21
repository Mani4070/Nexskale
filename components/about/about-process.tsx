import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Content } from "@/lib/content";

type AboutProcessProps = {
  steps: Content["about"]["steps"];
};

export default function AboutProcess({ steps }: AboutProcessProps) {
  return (
    <section className="section process-section" id="approach">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow purple">How we work</div>
            <h2>Clear steps. Shared ambition.</h2>
            <p>
              A collaborative process, from the first conversation to your next
              chapter.
            </p>
          </div>
        </div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <div key={s.title} className="process-card">
              <span>0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
        <div className="detail-cta">
          <div>
            <span className="eyebrow purple">Your next chapter</span>
            <h2>Let’s build something that matters.</h2>
          </div>
          <Link href="/contact" className="button primary">
            Start a conversation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
