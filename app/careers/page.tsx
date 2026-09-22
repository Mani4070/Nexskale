import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, TrendingUp, Heart, Users } from "lucide-react";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import PageHero from "@/components/layout/page-hero";
import CareersPositions from "@/components/careers/careers-positions";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Careers — Build Your Career. Build What's Next",
    description:
      "Join a team of builders, thinkers and doers who are creating technology for a brighter tomorrow at NexSkale. Explore open positions.",
    alternates: {
      canonical: "/careers",
    },
    openGraph: {
      title: `Careers — Build What's Next | ${c.brand.name}`,
      description:
        "Join a team of builders, thinkers and doers who are creating technology for a brighter tomorrow.",
      url: "/careers",
      siteName: c.brand.name,
      type: "website",
      images: [
        {
          url: "/images/reference/careers-hero.webp",
          width: 1200,
          height: 630,
          alt: "Careers at NexSkale",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Careers — Build What's Next | ${c.brand.name}`,
      description:
        "Join a team of builders, thinkers and doers who are creating technology for a brighter tomorrow.",
      images: ["/images/reference/careers-hero.webp"],
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

      {/* Hero Section matching Mockup Column 5 */}
      <PageHero
        badge="CAREERS"
        title={
          <>
            Build your career.
            <br />
            Build what's <span className="gradient-text">next.</span>
          </>
        }
        description="Join a team of builders, thinkers and doers who are creating technology for a brighter tomorrow."
        imageSrc="/images/reference/careers-hero.webp"
        imageAlt="Modern tech studio with Great People Build Great Products wall art"
      >
        <div className="mockup-hero-actions">
          <Link href="#open-roles" className="mockup-btn-primary">
            View open roles <ArrowRight size={16} />
          </Link>
        </div>
      </PageHero>

      {/* Why join NexSkale Section */}
      <section className="careers-why-section">
        <div className="interior-wrap">
          <div className="section-header-center">
            <span className="section-kicker">Life at NexSkale</span>
            <h2>Why join NexSkale?</h2>
            <p>Empowering people to do the best work of their lives.</p>
          </div>

          <div className="careers-benefits-grid">
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">
                <Briefcase size={22} />
              </div>
              <h3>Meaningful Work</h3>
              <p>Work on real products with real impact.</p>
            </div>
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">
                <TrendingUp size={22} />
              </div>
              <h3>Growth Opportunities</h3>
              <p>Learn, build and advance your career.</p>
            </div>
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">
                <Heart size={22} />
              </div>
              <h3>Flexible Culture</h3>
              <p>
                Work-life balance that truly works, with hybrid flexibility and
                trust-first values.
              </p>
            </div>
            <div className="careers-benefit-card">
              <div className="careers-benefit-icon">
                <Users size={22} />
              </div>
              <h3>Great Team</h3>
              <p>
                Collaborate with passionate, supportive peers who care about
                craft and each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Split Banner */}
      <section className="careers-culture-section">
        <div className="interior-wrap">
          <div className="careers-culture-banner">
            <div className="careers-culture-photo">
              <Image
                src="/images/reference/team-meeting.webp"
                alt="NexSkale team members laughing and brainstorming together"
                width={600}
                height={450}
              />
            </div>
            <div className="careers-culture-copy">
              <h2>A culture of curiosity, collaboration and impact.</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions List with Department Filters & Resume CTA */}
      <CareersPositions brandEmail={c.brand.email} />
    </ContentPage>
  );
}
