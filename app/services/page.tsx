import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import ServicesExperience from "@/components/services/services-experience";
import "./services.css";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Our Services — End-to-end Digital Solutions for Modern Businesses",
    description:
      "From strategy to deployment, we build secure, scalable and future-ready products tailored to your goals. Explore Web, Mobile, AI, Cloud, and UI/UX.",
    alternates: {
      canonical: "/services",
    },
    openGraph: {
      title: `Our Services — End-to-end Digital Solutions | ${c.brand.name}`,
      description:
        "From strategy to deployment, we build secure, scalable and future-ready products tailored to your goals.",
      url: "/services",
      siteName: c.brand.name,
      type: "website",
      images: [
        {
          url: "/images/reference/team-meeting.webp",
          width: 1200,
          height: 630,
          alt: "NexSkale Capabilities & Engineering Spectrum",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Our Services — End-to-end Digital Solutions | ${c.brand.name}`,
      description:
        "From strategy to deployment, we build secure, scalable and future-ready products tailored to your goals.",
      images: ["/images/reference/team-meeting.webp"],
    },
  };
}

export default async function Page() {
  const c = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexskale.com";

  const servicesJsonLd = {
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
            name: "Services",
            item: `${siteUrl}/services`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "NexSkale Digital Engineering Capabilities",
        itemListElement: c.services.map((s, idx) => ({
          "@type": "Service",
          position: idx + 1,
          name: s.title,
          description: s.detail,
          provider: {
            "@type": "Organization",
            name: c.brand.name,
          },
          url: `${siteUrl}/services/${s.id}`,
        })),
      },
    ],
  };

  return (
    <ContentPage content={c} currentPage="services">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      <ServicesExperience services={c.services} />
    </ContentPage>
  );
}
