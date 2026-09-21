import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, Plus } from "lucide-react";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import InteriorBanner from "@/components/layout/interior-banner";
export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Services | " + c.brand.name,
    description:
      "Explore our capabilities, deliverables and ways to work together.",
  };
}
const outcomes: Record<string, string> = {
  web: "A stronger digital foundation",
  mobile: "A product that goes with your users",
  ai: "Less repetition. More possibility.",
  saas: "From first release to the next stage",
  cloud: "A calmer path to production",
  design: "Clarity at every interaction",
};
export default async function Page() {
  const c = await getContent();
  return (
    <ContentPage content={c} currentPage="services">
      <InteriorBanner
        eyebrow={"Expertise that moves you forward"}
        title={"Your ambition."}
        highlight={"Our expertise."}
        description={
          "From your first product idea to the systems that help it scale. Explore digital solutions designed around your business."
        }
        image={"/images/pages/services.webp"}
        imageAlt={"An architectural assembly of glass and metal modules"}
        action={"Explore our capabilities"}
        href={"#capabilities"}
        index={"#capabilities"}
        topics={["Design & development", "AI & automation", "Cloud & scale"]}
      />
      <nav className="capability-index" aria-label="Service categories">
        <div className="interior-wrap">
          {c.services.map((s, i) => (
            <a href={"#capability-" + s.id} key={s.id}>
              <span>0{i + 1}</span>
              {s.title}
            </a>
          ))}
        </div>
      </nav>
      <section className="interior-wrap capability-catalogue" id="capabilities">
        {c.services.map((s, i) => (
          <article
            className="capability-row"
            id={"capability-" + s.id}
            key={s.id}
          >
            <span className="capability-number">0{i + 1}</span>
            <div>
              <span className="interior-kicker">{s.title}</span>
              <h2>{outcomes[s.id] || s.title}</h2>
              <p>{s.detail}</p>
              <Link
                href={"/contact?service=" + encodeURIComponent(s.id)}
                className="interior-text-link"
              >
                Discuss {s.title.toLowerCase()} <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="capability-deliverables">
              <h3>What we can deliver</h3>
              <ul>
                {s.features.map((f) => (
                  <li key={f}>
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="engagement-section">
        <div className="interior-wrap">
          <span className="interior-kicker">
            The right shape of collaboration
          </span>
          <h2>Start where you are.</h2>
          <div className="engagement-grid">
            {[
              [
                "Explore an idea",
                "A focused discovery engagement to clarify the problem, map the experience and define what to build.",
              ],
              [
                "Build a product",
                "A defined project with a shared scope, clear priorities and a considered path to launch.",
              ],
              [
                "Evolve what exists",
                "Focused improvements to an existing product, from a better user journey to a stronger technical foundation.",
              ],
            ].map(([t, d]) => (
              <article key={t}>
                <Plus size={22} />
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
          <Link href="/contact" className="interior-text-link">
            Let's find your starting point <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </ContentPage>
  );
}
