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
import AnimatedStat from "@/components/about/animated-stat";

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
          url: "/images/about/foundations-banner.webp",
          width: 1536,
          height: 1024,
          alt: "Interlocking glass and metal blocks beside product sketches, representing shared foundations",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `About Us — A Team That Builds What Matters | ${c.brand.name}`,
      description:
        "We're more than a development company — we're a technology partner for ambitious businesses.",
      images: ["/images/about/foundations-banner.webp"],
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
        badge="ABOUT NEXSKALE"
        title={
          <>
            A team that
            <br />
            builds what
            <br />
            <span className="gradient-text">matters.</span>
          </>
        }
        description="We're more than a development company — we're a technology partner for ambitious businesses."
        imageSrc="/images/about/foundations-banner.webp"
        imageAlt="Interlocking glass and metal blocks beside product sketches, representing shared foundations"
      >
        <div className="mockup-hero-actions">
          <Link href="#story" className="mockup-btn-primary">
            Our story <ArrowRight size={16} />
          </Link>
          <Link href="#team" className="mockup-btn-outline">
            Meet the team
          </Link>
        </div>
      </PageHero>
      <div className="about-statistics">
        <div className="interior-wrap">
          <div className="hero-stats-row">
            <AnimatedStat value={3} label="Years of Experience" />
            <AnimatedStat value={250} label="Projects Delivered" />
            <AnimatedStat value={120} label="Happy Clients" />
            <AnimatedStat value={5} label="Countries" />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="about-story-section" id="story">
        <div className="interior-wrap">
          <div className="about-story-grid">
            <div className="about-story-copy">
              <span className="section-kicker">Our Story</span>
              <h2>From a shared passion to a bigger purpose.</h2>
              <p>
                NexSkale was founded with a simple belief — technology can solve
                real problems and create a better tomorrow. What started as a
                small team of passionate developers has grown into a
                full-service product development company helping ambitious teams
                turn ideas into lasting digital products.
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
                  <span className="about-team-name">{member.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-values-section" id="values">
        <div className="interior-wrap">
          <div className="about-values-intro">
            <div>
              <span className="section-kicker">Our Values</span>
              <h2>The principles that guide us.</h2>
            </div>
            <p>The values shape how we work, how we collaborate, and how we deliver value to our clients.</p>
          </div>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">
                <ShieldCheck size={22} />
              </div>
              <h3>Integrity</h3>
              <p>We do what's right.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <HeartHandshake size={22} />
              </div>
              <h3>Collaboration</h3>
              <p>We grow together.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <Sparkles size={22} />
              </div>
              <h3>Excellence</h3>
              <p>We strive for better.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <Target size={22} />
              </div>
              <h3>Impact</h3>
              <p>We build for a purpose.</p>
            </div>
          </div>

          <div className="about-careers-banner">
            <div className="about-careers-copy">
              <span className="about-careers-kicker">JOIN OUR JOURNEY</span>
              <h2>
                Great people.
                <br />
                Brighter possibilities.
              </h2>
              <p>
                We are always looking for curious, driven builders to solve
                meaningful problems with us.
              </p>
              <Link href="/careers" className="mockup-btn-primary">
                Explore careers <ArrowRight size={16} />
              </Link>
            </div>
            <div className="about-careers-image">
              <Image
                src="/images/careers/growth-banner.webp"
                alt="Glass and oak steps leading to an open doorway, representing career growth"
                fill
                sizes="(max-width: 700px) 100vw, 70vw"
              />
            </div>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
