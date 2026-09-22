import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import ContentPage from "@/components/layout/content-page";
import { getContent } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const content = await getContent();
  return content.services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const service = content.services.find((item) => item.id === slug);
  if (!service) notFound();
  return {
    title: service.title,
    description: service.detail,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} | ${content.brand.name}`,
      description: service.detail,
      url: `/services/${slug}`,
      images: [{ url: service.image, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.detail,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  const service = content.services.find((item) => item.id === slug);
  if (!service) notFound();
  const detail = serviceDetails[slug];
  const contactHref = `/contact?service=${encodeURIComponent(service.title)}`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexskale.com";
  const deliverables =
    detail?.deliverables ||
    service.features.map((feature) => [feature, service.description]);

  return (
    <ContentPage content={content} currentPage="services">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.detail,
            url: `${baseUrl}/services/${slug}`,
            provider: { "@type": "Organization", name: content.brand.name },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="service-detail-hero">
        <div className="interior-wrap">
          <Link href="/services" className="corporate-text-link">
            <ArrowLeft size={16} /> All services
          </Link>
          <div className="service-detail-hero-grid">
            <div data-reveal>
              <span className="corporate-kicker">{service.title}</span>
              <h1>{detail?.headline || service.title}</h1>
              <p>{service.detail}</p>
              <Link href={contactHref} className="corporate-button">
                Discuss {service.title.toLowerCase()} <ArrowRight size={18} />
              </Link>
            </div>
            <aside className="service-brief" data-reveal>
              <span className="corporate-kicker">AT A GLANCE</span>
              <h2>Built around your goals.</h2>
              <p>{detail?.bestFor || service.description}</p>
              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} />
                    {feature}
                  </li>
                ))}
              </ul>
              <span className="service-brief-note">
                Scope, milestones and deliverables agreed before development.
              </span>
            </aside>
          </div>
        </div>
      </section>
      <div className="interior-wrap corporate-services">
        <section className="capabilities-section">
          <div className="corporate-section-heading" data-reveal>
            <div>
              <span className="corporate-kicker">WHAT WE DELIVER</span>
              <h2>
                A complete solution.
                <br />
                Clear deliverables.
              </h2>
            </div>
            <p>
              We define the right scope for your business, then build a
              practical foundation your team can use and maintain.
            </p>
          </div>
          <div className="deliverable-grid">
            {deliverables.map(([title, text], i) => (
              <article className="capability-card" key={title} data-reveal>
                <span className="delivery-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        {detail && (
          <>
            <section className="delivery-section" data-reveal>
              <span className="corporate-kicker">OUR APPROACH</span>
              <h2>From first conversation to delivery.</h2>
              <div className="delivery-grid">
                {detail.process.map(([title, text], index) => (
                  <div key={title}>
                    <span className="delivery-number">0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="technology-section" data-reveal>
              <div>
                <span className="corporate-kicker">
                  THE RIGHT TOOLS FOR THE JOB
                </span>
                <h2>Technology with a purpose.</h2>
                <p>
                  We select the stack around your requirements, integrations and
                  maintenance needs.
                </p>
              </div>
              <div className="corporate-tags">
                {detail.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </section>
            <section className="service-faq" data-reveal>
              <span className="corporate-kicker">BEFORE WE BEGIN</span>
              <h2>Your questions, answered.</h2>
              {detail.faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </section>
          </>
        )}
        <section className="corporate-cta" data-reveal>
          <div>
            <span className="corporate-kicker">LET’S BUILD WHAT’S NEXT</span>
            <h2>Ready to take the next step?</h2>
            <p>
              Share your goals and constraints. We’ll help you define the way
              forward.
            </p>
          </div>
          <Link className="corporate-button" href={contactHref}>
            Start a conversation <ArrowRight size={18} />
          </Link>
        </section>
        <nav className="related-services" aria-label="Explore other services">
          <h2>Explore our other services</h2>
          <div>
            {content.services
              .filter((item) => item.id !== slug)
              .map((item) => (
                <Link key={item.id} href={`/services/${item.id}`}>
                  {item.title}
                  <ArrowRight size={16} />
                </Link>
              ))}
          </div>
        </nav>
      </div>
    </ContentPage>
  );
}
