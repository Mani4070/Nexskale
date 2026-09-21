import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import InteriorBanner from "@/components/layout/interior-banner";
export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Contact Us — Start Your Next Digital Project",
    description:
      "Get in touch with NexSkale. Whether you are starting a new web or mobile project, exploring AI automation, or scaling cloud infrastructure, let's talk.",
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      title: `Contact Us — Start Your Next Digital Project | ${c.brand.name}`,
      description:
        "A new product, a complex challenge or just an idea worth exploring. Tell us where you want to go, and we will find the next step together.",
      url: "/contact",
      siteName: c.brand.name,
      type: "website",
      images: [
        {
          url: "/images/pages/contact.webp",
          width: 1200,
          height: 630,
          alt: "Contact NexSkale Team",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Contact Us — Start Your Next Digital Project | ${c.brand.name}`,
      description:
        "A new product, a complex challenge or just an idea worth exploring. Tell us where you want to go, and we will find the next step together.",
      images: ["/images/pages/contact.webp"],
    },
  };
}
import ContactForm from "@/components/contact/contact-form";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const c = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexskale.com";
  const { service } = await searchParams;
  const selected =
    c.services.find((s) => s.id === service || s.title === service)?.title ??
    "";

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            name: "Contact",
            item: `${siteUrl}/contact`,
          },
        ],
      },
      {
        "@type": "ContactPage",
        name: "Contact NexSkale",
        description: "Start a project conversation or explore possibilities.",
        url: `${siteUrl}/contact`,
        mainEntity: {
          "@type": "Organization",
          name: c.brand.name,
          email: c.brand.email,
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <ContentPage content={c} currentPage="contact">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <InteriorBanner
        eyebrow={"Great ideas start with a conversation"}
        title={"Tell us your vision."}
        highlight={"Let's make it happen."}
        description={
          "A new product, a complex challenge or just an idea worth exploring. Tell us where you want to go, and we will find the next step together."
        }
        image={"/images/pages/contact.webp"}
        imageAlt={
          "Two sculptural glass and ceramic arches meeting in a warm studio setting"
        }
        action={"Start a conversation"}
        href={"#enquiry"}
        index={"#enquiry"}
        topics={["Project enquiries", "Partnerships", "New possibilities"]}
      />
      <section className="interior-wrap conversation-workspace" id="enquiry">
        <aside>
          <span className="interior-kicker">Choose your conversation</span>
          <h2>
            Let's make
            <br />
            the introduction.
          </h2>
          <div className="contact-channel">
            <span>01 / Projects & partnerships</span>
            <a href={"mailto:" + c.brand.email}>
              {c.brand.email} <ArrowUpRight size={16} />
            </a>
            <p>Prefer email? Send your idea directly.</p>
          </div>
          <div className="contact-channel">
            <span>02 / Join the team</span>
            <Link href="/careers">
              Find your next chapter <ArrowUpRight size={16} />
            </Link>
            <p>Visit our Careers page for enquiries about working with us.</p>
          </div>
          <div className="contact-expectation">
            <b>A conversation, then a plan.</b>
            <p>
              We will review what you share, ask any useful questions and
              discuss whether we are the right fit for your project.
            </p>
          </div>
        </aside>
        <div className="enquiry-card">
          <div className="enquiry-heading">
            <span className="interior-kicker">Project enquiry</span>
            <h2>What's on your mind?</h2>
            <p>Tell us a little about what you want to achieve.</p>
          </div>
          <ContactForm key={selected} content={c} selectedService={selected} />
        </div>
      </section>
      <section className="interior-wrap conversation-faq">
        <h2>Before you say hello.</h2>
        <div>
          {[
            [
              "Do I need a detailed brief?",
              "No. A description of your goal, who it is for and what is getting in the way is a useful start.",
            ],
            [
              "Can we discuss an existing product?",
              "Yes. Tell us what is working, what needs to change and any technical context you already have.",
            ],
            [
              "What should I include in my enquiry?",
              "Your goals, an approximate timeline and any budget context help us understand the scope. It is fine if you are still exploring.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
