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
    title: `${post.title} — ${c.brand.name}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const c = await getContent();
  const post = c.posts.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <>
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
