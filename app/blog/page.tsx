import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import BlogCatalogue from "@/components/blog/blog-catalogue";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Insights & Journal — Ideas, Learnings and Perspectives",
    description:
      "Explore our latest thoughts on technology, product development, AI and digital transformation by the NexSkale team.",
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: `Insights & Journal — Ideas, Learnings and Perspectives | ${c.brand.name}`,
      description:
        "Explore our latest thoughts on technology, product development, AI and digital transformation.",
      url: "/blog",
      siteName: c.brand.name,
      type: "website",
      images: [
        {
          url: "/images/blog/blog-hero.jpg",
          width: 1200,
          height: 630,
          alt: "NexSkale Journal and Perspectives",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Insights & Journal — Ideas, Learnings and Perspectives | ${c.brand.name}`,
      description:
        "Explore our latest thoughts on technology, product development, AI and digital transformation.",
      images: ["/images/blog/blog-hero.jpg"],
    },
  };
}

export default async function Page() {
  const c = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexskale.com";

  const blogListingJsonLd = {
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
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
        ],
      },
      {
        "@type": "Blog",
        name: `${c.brand.name} Journal & Engineering Perspectives`,
        description:
          "Practical architectures, generative AI insights, and modern engineering practices.",
        url: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <ContentPage content={c} currentPage="blog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingJsonLd) }}
      />

      <BlogCatalogue posts={c.posts} />
    </ContentPage>
  );
}
