import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";

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
          url: "/images/contact/communication-banner.webp",
          width: 1536,
          height: 1024,
          alt: "Phone, headset and notebook ready for a conversation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Contact Us — Let's Build Something Great Together | ${c.brand.name}`,
      description:
        "Have a project in mind or just want to say hello? We'd love to hear from you.",
      images: ["/images/contact/communication-banner.webp"],
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

      <ContactWorkspace content={c} initialService={selectedService} />
    </ContentPage>
  );
}
