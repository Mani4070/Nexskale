import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Target,
  Eye,
  Users,
  Lightbulb,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import PageHero from "@/components/layout/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "About Us — A Team That Builds What Matters",
    description:
      "We're more than a development company — we're a technology partner for ambitious businesses. Learn about NexSkale's mission, team, and values.",
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title: `About Us — A Team That Builds What Matters | ${c.brand.name}`,
      description:
        "We're more than a development company — we're a technology partner for ambitious businesses.",
      url: "/about",
      siteName: c.brand.name,
      type: "website",
      images: [
        {
          url: "/images/nexuskale-reception.png",
          width: 1200,
          height: 630,
          alt: "NexSkale modern office reception",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `About Us — A Team That Builds What Matters | ${c.brand.name}`,
      description:
        "We're more than a development company — we're a technology partner for ambitious businesses.",
      images: ["/images/nexuskale-reception.png"],
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

  const teamMembers = [
    {
      role: "Leadership",
      name: "David Chen",
      title: "Founder & CEO",
      photo: "/images/about/team-leadership-photo.jpg",
    },
    {
      role: "Engineering",
      name: "Priya Sharma",
      title: "Head of Engineering",
      photo: "/images/about/team-engineering-photo.jpg",
    },
    {
      role: "Design",
      name: "Marcus Vance",
      title: "Design Director",
      photo: "/images/about/team-design-photo.jpg",
    },
    {
      role: "Operations",
      name: "Sarah Jenkins",
      title: "VP of Operations",
      photo: "/images/about/team-operations-photo.jpg",
    },
  ];

  return (
    <ContentPage content={c} currentPage="about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section matching Mockup Column 2 */}
      <PageHero
        split
        badge="ABOUT NEXSKALE"
        title={
          <>
            A team that
            <br />
            builds what
            <br />
            matters.
          </>
        }
        description="We're more than a development company — we're a technology partner for ambitious businesses."
        imageSrc="/images/nexuskale-reception.png"
        imageAlt="Reception concept featuring the NexSkale purple and blue brand mark"
      />
      <div className="about-statistics">
        <div className="interior-wrap">
          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <span className="stat-num">3+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
            <div className="hero-stat-item">
              <span className="stat-num">250+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="hero-stat-item">
              <span className="stat-num">120+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="hero-stat-item">
              <span className="stat-num">5+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="about-story-section">
        <div className="interior-wrap">
          <div className="about-story-grid">
            <div className="about-story-copy">
              <span className="section-kicker">Our Story</span>
              <h2>
                From a shared passion for technology to a mission to build
                meaningful digital products.
              </h2>
              <p>
                NexSkale was founded with a simple belief — technology can solve
                real problems and create a better tomorrow. What started as a
                small team of passionate developers has grown into a
                full-service product development company.
              </p>
              <Link href="#team" className="about-story-link">
                Our journey <ArrowRight size={17} />
              </Link>
            </div>
            <div className="about-story-image-wrap">
              <Image
                src="/images/reference/team-meeting.webp"
                alt="NexSkale team members collaborating around a studio table"
                width={640}
                height={480}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="about-mv-section">
        <div className="interior-wrap">
          <div className="about-mv-grid">
            <div className="about-mv-card">
              <div className="about-mv-icon">
                <Target size={24} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To build technology that creates real, measurable impact for
                ambitious teams and users worldwide.
              </p>
            </div>
            <div className="about-mv-card">
              <div className="about-mv-icon">
                <Eye size={24} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be a trusted global partner for digital transformation,
                setting new standards in craft and delivery.
              </p>
            </div>
          </div>

          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <div className="about-pillar-icon">
                <Users size={22} />
              </div>
              <h4>People First</h4>
              <p>
                Seeing potential before problems, empowering teams to create
                lasting value together.
              </p>
            </div>
            <div className="about-pillar-card">
              <div className="about-pillar-icon">
                <Lightbulb size={22} />
              </div>
              <h4>Innovation Driven</h4>
              <p>
                Intelligent solutions that create sustainable competitive
                advantage for ambitious businesses.
              </p>
            </div>
            <div className="about-pillar-card">
              <div className="about-pillar-icon">
                <TrendingUp size={22} />
              </div>
              <h4>Long-term Impact</h4>
              <p>
                Leveraging solid scalable architectures and dependable systems,
                not quick shortcuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="about-team-section" id="team">
        <div className="interior-wrap">
          <div className="section-header-center">
            <span className="section-kicker">Our People</span>
            <h2>Meet the Team</h2>
            <p>Passionate people. Extraordinary results.</p>
          </div>
          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <div className="about-team-card" key={member.name}>
                <div className="about-team-photo">
                  <Image
                    src={member.photo}
                    alt={`${member.role} — illustrative team portrait`}
                    width={400}
                    height={400}
                  />
                </div>
                <div className="about-team-info">
                  <span className="about-team-role">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-values-section" id="values">
        <div className="interior-wrap">
          <div className="section-header-center">
            <span className="section-kicker">Core Principles</span>
            <h2>Our Values</h2>
            <p>The standard we hold ourselves to every single day.</p>
          </div>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">
                <ShieldCheck size={22} />
              </div>
              <h3>Integrity</h3>
              <p>We do what's right</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <HeartHandshake size={22} />
              </div>
              <h3>Collaboration</h3>
              <p>We grow together</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <Sparkles size={22} />
              </div>
              <h3>Excellence</h3>
              <p>We strive for better</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <Target size={22} />
              </div>
              <h3>Impact</h3>
              <p>We build for a purpose</p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mockup-cta-banner">
            <div className="mockup-cta-copy">
              <h2>Join us in shaping a brighter tomorrow.</h2>
              <p>
                We are always looking for curious, driven builders to solve
                meaningful problems with us.
              </p>
              <Link href="/careers" className="mockup-btn-primary">
                Explore careers <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mockup-cta-image">
              <Image
                src="/images/reference/about-cta.webp"
                alt="Professional working at night overlooking city skyline"
                width={500}
                height={320}
              />
            </div>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
