import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import InteriorBanner from "@/components/layout/interior-banner";
export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Careers — Build Meaningful Digital Products With Us",
    description:
      "Explore career possibilities at NexSkale. Bring your curiosity and craft to engineering, product design, and thoughtful digital product development.",
    alternates: {
      canonical: "/careers",
    },
    openGraph: {
      title: `Careers — Build Meaningful Digital Products | ${c.brand.name}`,
      description:
        "Bring your curiosity and your craft. Explore the people, disciplines and possibilities behind a career at NexSkale.",
      url: "/careers",
      siteName: c.brand.name,
      type: "website",
      images: [
        {
          url: "/images/pages/careers.webp",
          width: 1200,
          height: 630,
          alt: "Careers at NexSkale — Design and Engineering Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Careers — Build Meaningful Digital Products | ${c.brand.name}`,
      description:
        "Bring your curiosity and your craft. Explore the people, disciplines and possibilities behind a career at NexSkale.",
      images: ["/images/pages/careers.webp"],
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
        name: "Careers",
        item: `${siteUrl}/careers`,
      },
    ],
  };

  return (
    <ContentPage content={c} currentPage="careers">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <InteriorBanner
        eyebrow={"Your talent. Our next chapter."}
        title={"Do meaningful work."}
        highlight={"Build what comes next."}
        description={
          "Bring your curiosity and your craft. Explore the people, disciplines and possibilities behind a career at NexSkale."
        }
        image={"/images/pages/careers.webp"}
        imageAlt={"Designers and engineers sharing ideas around a studio table"}
        action={"Explore opportunities"}
        href={"#career-conversation"}
        index={"#career-craft"}
        topics={["Engineering", "Product & design", "Collaboration"]}
      />
      <section className="interior-wrap career-craft" id="career-craft">
        <div>
          <span className="interior-kicker">Find your kind of work</span>
          <h2>
            Many disciplines.
            <br />
            One shared curiosity.
          </h2>
          <p>
            These are the kinds of challenges at the heart of our studio. Tell
            us where you would like to contribute.
          </p>
        </div>
        <div className="career-disciplines">
          {[
            [
              "Engineering",
              "Build dependable systems and thoughtful interactions.",
            ],
            [
              "Product & design",
              "Turn complex problems into clear, useful experiences.",
            ],
            [
              "Delivery & collaboration",
              "Help good ideas move forward with focus and care.",
            ],
          ].map(([t, d], i) => (
            <article key={t}>
              <span>0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>
      <section className="career-letter interior-wrap" id="career-conversation">
        <div className="career-letter-tag">An open conversation</div>
        <h2>
          Your next role could start
          <br />
          with a simple hello.
        </h2>
        <p>
          We don't have specific vacancies listed here right now. For current
          opportunities, send a short introduction, the kind of work you want to
          do, and a portfolio or examples you are proud of.
        </p>
        <a
          className="interior-button"
          href={"mailto:" + c.brand.email + "?subject=Career%20enquiry"}
        >
          Introduce yourself <ArrowUpRight size={18} />
        </a>
        <small>Career enquiries ? {c.brand.email}</small>
      </section>
      <section className="interior-wrap career-notes">
        <h2>A useful introduction</h2>
        <div>
          <article>
            <b>01 / Your story</b>
            <p>
              What have you been working on, and what would you like to learn
              next?
            </p>
          </article>
          <article>
            <b>02 / Your craft</b>
            <p>Share a project and the decisions that made it meaningful.</p>
          </article>
          <article>
            <b>03 / Your direction</b>
            <p>
              Tell us about the work, location and availability you have in
              mind.
            </p>
          </article>
        </div>
      </section>
    </ContentPage>
  );
}
