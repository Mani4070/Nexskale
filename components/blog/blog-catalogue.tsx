"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/page-hero";
import type { Content } from "@/lib/content";
import { ArrowRight, Search, Clock, Calendar } from "lucide-react";

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  featured?: boolean;
};

const categories = ["All", "AI", "Development", "Cloud", "Product", "Design"];

export default function BlogCatalogue({ posts }: { posts: Content["posts"] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [localSearch, setLocalSearch] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [subscriptionError, setSubscriptionError] = useState("");
  const postImages: Record<string, string> = {
    "generative-ai": "/images/reference/featured-ai.webp",
    "scalable-web": "/images/reference/web.webp",
    "cloud-deployment": "/images/reference/cloud.webp",
  };
  const allPosts = posts.map((post, index) => ({
    ...post,
    image: postImages[post.id] || post.image,
    featured: index === 0,
    readTime: `${Math.max(1, Math.ceil(post.body.join(" ").split(/\s+/).length / 200))} min read`,
  }));
  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubscriptionStatus("sending");
    setSubscriptionError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setSubscriptionStatus("success");
      form.reset();
    } catch (error) {
      setSubscriptionStatus("error");
      setSubscriptionError(
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  }

  const filteredPosts = allPosts.filter((post) => {
    const matchesFilter =
      activeFilter === "All" ||
      post.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(localSearch.toLowerCase()) ||
      post.category.toLowerCase().includes(localSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredPost =
    filteredPosts.find((p) => p.featured) ||
    (filteredPosts.length > 0 ? filteredPosts[0] : null);
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <>
      <PageHero
        badge="INSIGHTS"
        title={
          <>
            Ideas, learnings
            <br />
            and perspectives.
          </>
        }
        description="Explore our latest thoughts on technology, product development, AI and digital transformation."
        imageSrc="/images/reference/blog-hero.webp"
        imageAlt="Modern workspace overlooking the city"
      >
        <form
          className="mockup-hero-search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            document
              .getElementById("articles")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <input
            type="search"
            placeholder="Search articles..."
            aria-label="Search articles"
            value={localSearch}
            onChange={(event) => setLocalSearch(event.target.value)}
          />
          <button type="submit" aria-label="View search results">
            <ArrowRight size={18} />
          </button>
        </form>
      </PageHero>
      <div className="interior-wrap" id="articles">
        {/* Category Pills Bar */}
        <div
          className="mockup-filter-bar"
          role="tablist"
          aria-label="Filter blog posts by topic"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              className={`mockup-filter-pill ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article Card */}
        {featuredPost && (
          <article className="blog-featured-card">
            <div className="blog-featured-content">
              <span className="blog-badge">
                Featured Article • {featuredPost.category}
              </span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="blog-meta-row">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Calendar size={14} /> {featuredPost.date}
                </span>
                <span>•</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Clock size={14} /> {featuredPost.readTime}
                </span>
              </div>
              <div>
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="mockup-btn-primary"
                >
                  Read article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="blog-featured-image">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </article>
        )}

        {/* Latest Articles 2x2 Grid */}
        <section className="blog-grid-section">
          <div style={{ marginBottom: "24px" }}>
            <span
              className="section-kicker"
              style={{
                color: "var(--brand-blue)",
                fontWeight: 700,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Fresh Perspectives
            </span>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#0f172a",
                margin: "6px 0 0",
              }}
            >
              Latest Articles
            </h2>
          </div>

          <div className="blog-articles-grid">
            {gridPosts.map((post) => (
              <Link
                href={`/blog/${post.id}`}
                key={post.id}
                className="blog-article-card"
              >
                <div className="blog-article-thumb">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={340}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="blog-article-body">
                  <span
                    className="blog-badge"
                    style={{ marginBottom: "0", alignSelf: "flex-start" }}
                  >
                    {post.category}
                  </span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div
                    className="blog-meta-row"
                    style={{
                      margin: "0",
                      paddingTop: "12px",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div
              style={{
                padding: "60px 0",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              <p>
                No articles found matching your criteria. Try adjusting your
                search.
              </p>
            </div>
          )}
        </section>

        {/* Newsletter Subscription Banner */}
        <div className="blog-newsletter-card">
          <div className="blog-newsletter-info">
            <h3>Get the latest insights delivered to your inbox.</h3>
            <p>
              No spam. Just high-value perspectives on technology, engineering
              and product strategy.
            </p>
            <form className="blog-newsletter-form" onSubmit={subscribe}>
              <input
                name="email"
                type="email"
                placeholder="Your email address"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={subscriptionStatus === "sending"}
                className="mockup-btn-primary"
                style={{ padding: "12px 24px" }}
              >
                {subscriptionStatus === "sending"
                  ? "Subscribing?"
                  : "Subscribe"}
              </button>
            </form>
            <p role="status">
              {subscriptionStatus === "success"
                ? "Thank you! You?re subscribed."
                : subscriptionError}
            </p>
          </div>
          <div className="blog-newsletter-visual">
            <Image
              src="/images/blog/newsletter-plane.svg"
              alt="3D paper airplane illustration"
              width={160}
              height={160}
            />
          </div>
        </div>
      </div>
    </>
  );
}
