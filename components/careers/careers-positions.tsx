"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export type JobPosition = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
};

const jobPositions: JobPosition[] = [
  {
    id: "sr-frontend",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Hybrid / Remote",
    type: "Full-time",
  },
  {
    id: "backend-node",
    title: "Backend Developer (Node.js)",
    department: "Engineering",
    location: "Hyderabad",
    type: "Full-time",
  },
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Hyderabad / Remote",
    type: "Full-time",
  },
  {
    id: "aiml-engineer",
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Hyderabad",
    type: "Full-time",
  },
  {
    id: "product-manager",
    title: "Technical Product Manager",
    department: "Product",
    location: "Hybrid / Remote",
    type: "Full-time",
  },
  {
    id: "ops-lead",
    title: "Operations & Delivery Lead",
    department: "Operations",
    location: "Hyderabad",
    type: "Full-time",
  },
];

const departments = ["All", "Engineering", "Design", "Product", "Operations"];

export default function CareersPositions({
  brandEmail,
}: {
  brandEmail: string;
}) {
  const [activeDept, setActiveDept] = useState("All");

  const filteredJobs = jobPositions.filter(
    (job) =>
      activeDept === "All" ||
      job.department.toLowerCase() === activeDept.toLowerCase(),
  );

  return (
    <section className="careers-jobs-section" id="open-roles">
      <div className="interior-wrap">
        <div>
          <span
            className="section-kicker"
            style={{
              color: "var(--brand-blue)",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            We Are Hiring
          </span>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#0f172a",
              margin: "6px 0 0",
            }}
          >
            Open Positions
          </h2>
        </div>

        {/* Filter Pills */}
        <div
          className="mockup-filter-bar"
          role="tablist"
          aria-label="Filter jobs by department"
        >
          {departments.map((dept) => (
            <button
              key={dept}
              role="tab"
              aria-selected={activeDept === dept}
              className={`mockup-filter-pill ${activeDept === dept ? "active" : ""}`}
              onClick={() => setActiveDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="careers-jobs-list">
          {filteredJobs.map((job) => (
            <a
              key={job.id}
              href={`mailto:${brandEmail}?subject=Application%20for%20${encodeURIComponent(job.title)}`}
              className="careers-job-row"
            >
              <div>
                <span className="careers-job-title">{job.title}</span>
              </div>
              <div className="careers-job-meta">
                <span>{job.location}</span>
                <span className="careers-job-badge">{job.type}</span>
                <span className="careers-job-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Resume Banner */}
        <div
          className="mockup-cta-banner"
          style={{ marginTop: "60px", marginBottom: "30px" }}
        >
          <div className="mockup-cta-copy">
            <h2>Don't see a role that fits?</h2>
            <p>
              We're always looking for great engineers, designers, and builders.
              Send us your background and tell us how you'd like to contribute.
            </p>
            <a
              href={`mailto:${brandEmail}?subject=General%20Career%20Enquiry`}
              className="mockup-btn-primary"
            >
              Send your resume <ArrowRight size={16} />
            </a>
          </div>
          <div className="mockup-cta-image">
            <img
              src="/images/about/careers-cta-photo.jpg"
              alt="NexSkale team culture"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
