"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Mail, Check } from "lucide-react";
import type { Content } from "@/lib/content";

type BlogSectionProps = {
  posts: Content["posts"];
  isHome?: boolean;
};

export default function BlogSection({
  posts,
  isHome = false,
}: BlogSectionProps) {
  const [postFilter, setPostFilter] = useState("All");
  const [subStatus, setSubStatus] = useState("");
  const [subError, setSubError] = useState("");

  const allPosts = !isHome;
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubStatus("sending");
    setSubError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setSubStatus("success");
      form.reset();
    } catch (e) {
      setSubStatus("error");
      setSubError(e instanceof Error ? e.message : "Please try again.");
    }
  }

  const filteredPosts = posts.filter(
    (p) => postFilter === "All" || p.category === postFilter,
  );
  const isLeadFeatured = !isHome && postFilter === "All" && filteredPosts.length > 0;
  const featuredArticle = isLeadFeatured ? filteredPosts[0] : null;
  const displayList = isLeadFeatured ? filteredPosts.slice(1) : filteredPosts;

  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <div className="section-heading compact">
        <div>
          <div className="eyebrow purple">
            {isHome ? "Insights" : "Curated Perspectives"}
          </div>
          <h2>
            {isHome
              ? "Latest from our blog"
              : "Ideas, Systems & Perspectives"}
          </h2>
          {!isHome && (
            <p className="blog-section-subtitle">
              Practical architectures, generative AI insights, and modern
              engineering practices.
            </p>
          )}
        </div>
        {isHome && (
          <Link className="text-link" href="/blog">
            View all posts <ArrowRight size={15} />
          </Link>
        )}
      </div>

      {allPosts && (
        <div className="blog-filter-pills" aria-label="Filter blog posts">
          {categories.map((f) => {
            const count =
              f === "All"
                ? posts.length
                : posts.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                onClick={() => setPostFilter(f)}
                className={
                  postFilter === f ? "pill-filter active" : "pill-filter"
                }
              >
                <span>{f}</span>
                <span className="pill-badge-num">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="blog-stream">
        {featuredArticle && (
          <div className="featured-article-spotlight">
            <Link
              className="spotlight-card-link"
              href={`/blog/${featuredArticle.id}`}
            >
              <div className="spotlight-image-side">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                />
                <div className="spotlight-overlay-tags">
                  <span className="spotlight-featured-badge">
                    ★ Featured Story
                  </span>
                  <span className="spotlight-cat-tag">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              <div className="spotlight-info-side">
                <div className="spotlight-meta-top">
                  <span>{featuredArticle.date}</span>
                  <span>·</span>
                  <span className="read-time-indicator">
                    <Clock size={12} /> 4 min read
                  </span>
                </div>
                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.excerpt}</p>
                <div className="spotlight-card-footer">
                  <div className="author-micro-badge">
                    <span className="avatar-chip">N</span>
                    <div>
                      <strong>NexusKale Editorial</strong>
                      <span>AI & Engineering</span>
                    </div>
                  </div>
                  <span className="spotlight-action">
                    Read full perspective <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="blog-grid">
          {displayList.map((p) => (
            <Link className="blog-card" key={p.id} href={`/blog/${p.id}`}>
              <div className="blog-image">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="blog-category-tag">{p.category}</span>
              </div>
              <div className="blog-copy">
                <div className="post-meta">
                  <span>{p.date}</span>
                  <span>·</span>
                  <span className="read-time-pill">
                    <Clock size={12} /> 3 min read
                  </span>
                </div>
                <h3>{p.title}</h3>
                <p className="blog-card-excerpt">{p.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="card-author">NexusKale</span>
                  <span className="read-more">
                    Read article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!isHome && (
          <div className="blog-newsletter-banner">
            <div className="newsletter-copy">
              <div className="eyebrow purple">NexusKale Dispatch</div>
              <h3>Stay ahead with our latest perspectives</h3>
              <p>
                A monthly technical breakdown of AI workflows, web
                architecture, and cloud systems.
              </p>
            </div>
            <form className="newsletter-form-inline" onSubmit={subscribe}>
              <div className="newsletter-input-wrap">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  className="button primary"
                  disabled={subStatus === "sending"}
                >
                  {subStatus === "sending" ? "Sending..." : "Subscribe"}
                </button>
              </div>
              {subStatus === "success" && (
                <span className="subscribe-status-msg success">
                  <Check size={14} /> Subscribed to insights!
                </span>
              )}
              {subStatus === "error" && (
                <span className="subscribe-status-msg error">{subError}</span>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  </section>
);
}
