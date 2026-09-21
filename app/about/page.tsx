import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import InteriorBanner from "@/components/layout/interior-banner";
export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "About Us — Product Thinking & Engineering Craft",
    description:
      "Learn about NexSkale, our product philosophy, engineering craft, and the team bringing design and technology together to create meaningful digital solutions.",
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title: `About Us — Product Thinking & Engineering Craft | ${c.brand.name}`,
      description:
        "We bring design, engineering and product thinking together to create technology that makes a meaningful difference.",
      url: "/about",
      siteName: c.brand.name,
      type: "website",
      images: [
        {
          url: "/images/pages/about.webp",
          width: 1200,
          height: 630,
          alt: "NexSkale Studio — People behind the technology",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `About Us — Product Thinking & Engineering Craft | ${c.brand.name}`,
      description:
        "We bring design, engineering and product thinking together to create technology that makes a meaningful difference.",
      images: ["/images/pages/about.webp"],
    },
  };
}

export default async function Page() {
  const c = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexskale.com";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteUrl}/about`,
      },
    ],
  };

  return (
    <ContentPage content={c} currentPage="about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
