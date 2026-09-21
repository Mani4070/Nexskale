"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Content } from "@/lib/content";
import Dashboard from "./dashboard";

type WorkSectionProps = {
  projects: Content["projects"];
  isHome?: boolean;
};

export default function WorkSection({
  projects,
  isHome = false,
}: WorkSectionProps) {
  const [filter, setFilter] = useState("All");
  const showFilters = !isHome;

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const displayedProjects = projects
    .filter((p) => filter === "All" || p.category === filter)
    .slice(0, isHome ? 3 : undefined);

  return (
    <section className="section work-section" id="work">
      <div className="container">
        <div className="section-heading compact">
          <div>
            <div className="eyebrow purple">
              {isHome ? "Featured work" : "Our portfolio"}
            </div>
            <h2>
              {isHome
                ? "Real products. Real possibilities."
                : "Explore the products."}
            </h2>
          </div>
          <Link className="text-link" href="/work">
            View all work <ArrowRight size={15} />
          </Link>
        </div>
        {showFilters && (
          <div className="filters" aria-label="Filter projects">
            {categories.map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}
        <div className="projects-grid">
          {displayedProjects.map((p) => (
            <Link
              className="project-card"
              key={p.id}
              href={`/products/${p.id}`}
            >
              <Dashboard project={p} />
              <div className="project-copy">
                <span className="tag">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ArrowUpRight size={19} className="card-arrow" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
