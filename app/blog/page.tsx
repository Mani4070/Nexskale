import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import ContentPage from "@/components/layout/content-page";
import InteriorBanner from "@/components/layout/interior-banner";
export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  return {
    title: "Tech & Product Blog — Perspectives on AI, Web & Cloud",
    description:
      "Dispatches, architectural guides, and perspectives on emerging technology, generative AI workflows, and thoughtful digital product engineering by NexSkale.",
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: `Tech & Product Blog — Perspectives on AI, Web & Cloud | ${c.brand.name}`,
      description:
        "Explore the technology, design decisions and practical engineering thinking shaping next-generation digital products.",
      url: "/blog",
      siteName: c.brand.name,
      type: "website",
      images: [
        {
          url: "/images/pages/blog.webp",
          width: 1200,
          height: 630,
          alt: "NexSkale Tech & Product Journal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Tech & Product Blog — Perspectives on AI, Web & Cloud | ${c.brand.name}`,
      description:
        "Explore the technology, design decisions and practical engineering thinking shaping next-generation digital products.",
      images: ["/images/pages/blog.webp"],
    },
  };
}

export default async function Page() {
  const c = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexskale.com";
  const [featured, ...posts] = c.posts;
  const categories = [...new Set(c.posts.map((p) => p.category))];

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
        blogPost: c.posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          url: `${siteUrl}/blog/${p.id}`,
          datePublished: p.date,
          image: p.image,
        })),
      },
    ],
  };

  return (
    <ContentPage content={c} currentPage="blog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingJsonLd) }}
      />
      <InteriorBanner
        eyebrow={"Insights from the world of technology"}
        title={"Fresh perspectives."}
        highlight={"Ideas with impact."}
        description={
          "Explore the technology, design decisions and practical thinking shaping the next generation of digital products."
        }
        image={"/images/pages/blog.webp"}
        imageAlt={
          "A violet glass ribbon flowing through a silver circular aperture"
        }
        action={"Explore the journal"}
        href={"#reading-room"}
        index={"#reading-room"}
        topics={["Technology", "Design", "Product thinking"]}
      />
      {featured && (
        <section className="interior-wrap journal-cover">
          <Link href={"/blog/" + featured.id} className="journal-cover-link">
            <div className="journal-cover-art">
              <Image
                src="/images/pages/blog.webp"
                alt="A violet glass ribbon flowing through a silver circular aperture"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 60vw"
              />
            </div>
            <div className="journal-cover-copy">
              <span className="interior-kicker">
                Editor's selection / {featured.category}
              </span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <div className="journal-cover-bottom">
                <span>{featured.date}</span>
                <span>
                  Read the story <ArrowUpRight size={18} />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}
      <section className="interior-wrap reading-room" id="reading-room">
        <div className="reading-heading">
          <div>
            <span className="interior-kicker">Keep exploring</span>
            <h2>The reading room.</h2>
          </div>
          <span>{c.posts.length} perspectives</span>
        </div>
        {posts.map((p, i) => (
          <Link className="journal-entry" href={"/blog/" + p.id} key={p.id}>
            <span className="journal-entry-number">0{i + 2}</span>
            <div>
              <span className="interior-kicker">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </div>
            <span className="journal-entry-date">{p.date}</span>
            <ArrowUpRight size={24} />
          </Link>
        ))}
        {!c.posts.length && (
          <p>New perspectives are on the way. Check back soon.</p>
        )}
      </section>
      <section className="journal-colophon">
        <div className="interior-wrap">
          <span className="interior-kicker">Our editorial lens</span>
          <h2>
            A little more context.
            <br />A fresh way to look at it.
          </h2>
          <div className="journal-topics">
            {categories.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <p>
            Our journal explores the choices behind digital products, from
            emerging technology to the foundations that help it work.
          </p>
        </div>
      </section>
    </ContentPage>
  );
}
