import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import type { Content } from "@/lib/content";

type BlogArticleProps = {
  post: Content["posts"][number];
  allPosts: Content["posts"];
};

export default function BlogArticle({ post, allPosts }: BlogArticleProps) {
  const readTime = Math.max(
    2,
    Math.ceil(post.body.join(" ").split(" ").length / 200),
  );
  const relatedPosts = allPosts.filter((p) => p.id !== post.id);

  return (
    <section className="container section article-page">
      <article className="article-wrapper">
        <div className="article-meta-ribbon">
          <span className="article-cat-pill">{post.category}</span>
          <span className="meta-bullet">·</span>
          <span className="article-date-pill">{post.date}</span>
          <span className="meta-bullet">·</span>
          <span className="article-time-pill">
            <Clock size={13} /> {readTime} min read
          </span>
        </div>

        <div className="article-media-hero">
          <img className="article-hero-img" src={post.image} alt={post.title} />
          <div className="article-hero-badge">
            <Sparkles size={13} /> NexSkale Research & Engineering
          </div>
        </div>

        <div className="article-layout">
          <aside className="article-sidebar">
            <div className="author-card">
              <div className="author-avatar-badge">N</div>
              <div>
                <h4 className="author-name">NexSkale Editorial</h4>
                <p className="author-subtitle">Engineering & AI Systems</p>
              </div>
            </div>

            <div className="article-meta-box">
              <div className="meta-row">
                <span className="m-label">Domain</span>
                <span className="m-value">{post.category}</span>
              </div>
              <div className="meta-row">
                <span className="m-label">Published</span>
                <span className="m-value">{post.date}</span>
              </div>
              <div className="meta-row">
                <span className="m-label">Read time</span>
                <span className="m-value">{readTime} min read</span>
              </div>
            </div>

            <Link href="/blog" className="back-link">
              <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> All articles
            </Link>
          </aside>

          <div className="article-main">
            <div className="article-takeaway">
              <div className="takeaway-badge">
                <Sparkles size={15} /> Key Takeaway
              </div>
              <p>{post.excerpt}</p>
            </div>

            <div className="article-content">
              {post.body.map((p, i) => (
                <p key={i} className={i === 0 ? "article-lead-paragraph" : ""}>
                  {p}
                </p>
              ))}
            </div>

            <div className="article-pullquote">
              <div className="quote-mark">“</div>
              <p>
                The most impactful digital products begin with a clear problem,
                a focused architecture, and disciplined iteration.
              </p>
            </div>

            <div className="article-cta-box">
              <div className="cta-text">
                <h3>Want to implement this architecture in your business?</h3>
                <p>
                  Our team develops full-stack web, AI agents, and scalable
                  cloud systems.
                </p>
              </div>
              <Link className="button primary" href="/contact">
                Talk with our engineers <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <div className="related-articles-section">
        <div className="section-heading compact">
          <div>
            <div className="eyebrow purple">Further reading</div>
            <h2>More perspectives from our blog</h2>
          </div>
          <Link className="text-link" href="/blog">
            View all articles <ArrowRight size={15} />
          </Link>
        </div>

        <div className="blog-grid">
          {relatedPosts.map((p) => (
            <Link className="blog-card" key={p.id} href={`/blog/${p.id}`}>
              <div className="blog-image">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="blog-tag-badge">{p.category}</span>
              </div>
              <div className="blog-copy">
                <div className="post-meta">
                  <span>{p.date}</span>
                  <span>·</span>
                  <span className="read-time-pill">
                    <Clock size={11} /> 3 min read
                  </span>
                </div>
                <h3>{p.title}</h3>
                <p className="blog-card-excerpt">{p.excerpt}</p>
                <span className="read-more">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
