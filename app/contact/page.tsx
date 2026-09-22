import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import PageHero from "@/components/layout/page-hero";
import ContactWorkspace from "@/components/contact/contact-workspace";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Contact Us — Let's Build Something Great Together",
    description:
      "Get in touch with NexSkale. Whether you are starting a new web or mobile project, exploring AI automation, or scaling cloud infrastructure, let's talk.",
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      title: `Contact Us — Let's Build Something Great Together | ${c.brand.name}`,
      description:
        "Have a project in mind or just want to say hello? We'd love to hear from you.",
      url: "/contact",
      siteName: c.brand.name,
      type: "website",
      images: [
        {
          url: "/images/reference/team-meeting.webp",
          width: 1200,
          height: 630,
          alt: "Contact NexSkale Team",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Contact Us — Let's Build Something Great Together | ${c.brand.name}`,
      description:
        "Have a project in mind or just want to say hello? We'd love to hear from you.",
      images: ["/images/reference/team-meeting.webp"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const c = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexskale.com";
  const { service } = await searchParams;
  const selectedService = typeof service === "string" ? service : "";

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

      {/* Hero Section matching Mockup Column 6 */}
      <PageHero
        split
        badge="CONTACT US"
        title={
          <>
            Let's build
            <br />
            something great
            <br />
            <span className="gradient-text">together.</span>
          </>
        }
        description="Have a project in mind or just want to say hello? We'd love to hear from you."
        imageSrc="/images/reference/team-meeting.webp"
        imageAlt="A team discussing a project around a meeting table"
      />

      {/* Contact Workspace with Quick Mode Buttons, Form, Map & FAQs */}
      <ContactWorkspace content={c} initialService={selectedService} />
    </ContentPage>
  );
}
