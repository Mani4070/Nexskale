import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SiteMotion from "@/components/site-motion";
import PageIntro from "@/components/layout/page-intro";
import BlogArticle from "@/components/blog/blog-article";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const c = await getContent();
  return c.posts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const c = await getContent();
  const post = c.posts.find((p) => p.id === id);
  if (!post) return { title: `Article not found — ${c.brand.name}` };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${id}`,
    },
    openGraph: {
      title: `${post.title} | ${c.brand.name}`,
      description: post.excerpt,
      url: `/blog/${id}`,
      siteName: c.brand.name,
      type: "article",
      publishedTime: post.date,
      authors: [`${c.brand.name} Editorial`],
      tags: [post.category],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${c.brand.name}`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const c = await getContent();
  const post = c.posts.find((p) => p.id === id);
  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexskale.com";

  const articleJsonLd = {
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
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${siteUrl}/blog/${id}`,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${siteUrl}/blog/${id}#article`,
        isPartOf: {
          "@type": "Blog",
          "@id": `${siteUrl}/blog#blog`,
          name: `${c.brand.name} Blog`,
          publisher: {
            "@id": `${siteUrl}/#organization`,
          },
        },
        headline: post.title,
        description: post.excerpt,
        image: [post.image],
        datePublished: post.date,
        inLanguage: "en-US",
        mainEntityOfPage: `${siteUrl}/blog/${id}`,
        author: {
          "@type": "Organization",
          name: `${c.brand.name} Editorial`,
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: c.brand.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/images/logo/logo-light.png`,
          },
        },
        articleSection: post.category,
        articleBody: post.body.join(" "),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteMotion revision={`blog-${id}`} />
      <div className="dark-top" id="home">
        <Header
          brandName={c.brand.name}
          navigation={c.navigation}
          currentPage="blog"
        />
        <PageIntro
          eyebrow={`${post.category} · ${post.date}`}
          title={post.title}
          description={post.excerpt}
          variant="blog-detail"
        />
      </div>
      <main>
        <BlogArticle post={post} allPosts={c.posts} />
      </main>
      <Footer content={c} />
    </>
  );
}
