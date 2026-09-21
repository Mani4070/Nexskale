import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import InteriorBanner from "@/components/layout/interior-banner";
export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "About | " + c.brand.name,
    description:
      "An independent perspective on building thoughtful technology.",
  };
}
export default async function Page() {
  const c = await getContent();
  return (
    <ContentPage content={c} currentPage="about">
      <InteriorBanner
        eyebrow={"The people behind the technology"}
        title={"Driven by curiosity."}
        highlight={"Built with purpose."}
        description={
          "We bring design, engineering and product thinking together to create technology that makes a meaningful difference."
        }
        image={"/images/pages/about.webp"}
        imageAlt={"A sunlit creative studio with a shared oak worktable"}
        action={"Get to know us"}
        href={"#our-perspective"}
        index={"#our-perspective"}
        topics={["Product thinking", "Engineering craft", "Shared ambition"]}
      />
      <section className="interior-wrap studio-manifesto" id="our-perspective">
        <div className="interior-kicker">Our point of view</div>
        <div>
          <h2>
            Better products begin
            <br />
            with better questions.
          </h2>
          <p>
            What does someone actually need? Where does the experience get in
            their way? What would make their day a little easier?
          </p>
          <p>
            These are the questions that guide our work. We bring product
            thinking, design and engineering into the same conversation, so
            every decision has a purpose beyond the screen.
          </p>
        </div>
      </section>
      <section className="studio-beliefs">
        <div className="interior-wrap">
          <div className="interior-kicker">The things we come back to</div>
          <h2>
            Small principles.
            <br />
            Meaningful differences.
          </h2>
          <div className="belief-columns">
            {[
              [
                "01",
                "Clarity over complexity",
                "Make the important things easy to understand. A clear interface and a well-considered system serve the same purpose.",
              ],
              [
                "02",
                "Care in the details",
                "The edge cases, the empty states, the small interactions. Quality lives in the things people should never have to think about.",
              ],
              [
                "03",
                "Progress with purpose",
                "Build what matters, learn from real use and improve deliberately. More features are only useful when they create more value.",
              ],
            ].map(([n, t, d]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="interior-wrap studio-invitation">
        <span className="interior-kicker">A shared ambition</span>
        <h2>
          Bring your perspective.
          <br />
          Let's make something useful.
        </h2>
        <Link href="/contact" className="interior-button">
          Meet your next product partner <ArrowUpRight size={18} />
        </Link>
      </section>
    </ContentPage>
  );
}
