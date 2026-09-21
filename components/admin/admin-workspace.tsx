"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  Briefcase,
  BookOpen,
  Users,
  Handshake,
  Inbox,
  ExternalLink,
  LogOut,
} from "lucide-react";
import type { Content } from "@/lib/content";
import Logo from "../logo";
import Badge from "../ui/badge";
import HeroEditor from "./hero-editor";
import ServicesManager from "./services-manager";
import ProjectsManager from "./projects-manager";
import BlogManager from "./blog-manager";
import AboutEditor from "./about-editor";
import PartnersManager from "./partners-manager";
import SubmissionsViewer from "./submissions-viewer";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Button from "../ui/button";

export type AdminTab =
  | "overview"
  | "hero"
  | "services"
  | "projects"
  | "blog"
  | "about"
  | "partners"
  | "submissions";

type SubmissionsData = {
  enquiries: Array<{
    id?: string;
    name?: string;
    email?: string;
    company?: string;
    service?: string;
    budget?: string;
    message?: string;
    createdAt?: string;
  }>;
  subscribers: Array<{
    id?: string;
    email?: string;
    createdAt?: string;
  }>;
};

type AdminWorkspaceProps = {
  content: Content;
  submissions: SubmissionsData;
};

const navTabs = [
  { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
  { id: "hero" as const, label: "Hero & Brand", icon: Sparkles },
  { id: "services" as const, label: "Services", icon: Layers, countKey: "services" as const },
  { id: "projects" as const, label: "Work / Projects", icon: Briefcase, countKey: "projects" as const },
  { id: "blog" as const, label: "Blog Insights", icon: BookOpen, countKey: "posts" as const },
  { id: "about" as const, label: "About & Process", icon: Users },
  { id: "partners" as const, label: "Tech Partners", icon: Handshake },
  { id: "submissions" as const, label: "Submissions", icon: Inbox, countKey: "submissions" as const },
];

export default function AdminWorkspace({
  content,
  submissions,
}: AdminWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.reload();
  }

  const counts = {
    services: content.services.length,
    projects: content.projects.length,
    posts: content.posts.length,
    submissions: submissions.enquiries.length + submissions.subscribers.length,
  };

  return (
    <div className="admin-shell">
      {/* Instant Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Logo name={content.brand.name} href="/admin" height={32} mode="full" />
          <Badge variant="purple">CMS</Badge>
        </div>

        <nav className="admin-nav">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const count = tab.countKey ? counts[tab.countKey] : null;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
              >
                <Icon size={16} />
                <span style={{ flex: 1 }}>{tab.label}</span>
                {count !== null && (
                  <span
                    style={{
                      fontSize: "11px",
                      background: "rgba(255, 255, 255, 0.08)",
                      padding: "1px 6px",
                      borderRadius: "10px",
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div
          className="admin-sidebar-footer"
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <Link href="/" target="_blank" className="admin-view-site-link">
            <span>View Live Website</span>
            <ExternalLink size={13} />
          </Link>
          <button
            onClick={handleLogout}
            className="admin-view-site-link"
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              cursor: "pointer",
              width: "100%",
              color: "#94a3b8",
            }}
          >
            <LogOut size={13} />
            <span>Lock Admin / Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="admin-main">
        {activeTab === "overview" && (
          <div>
            <div className="admin-header">
              <div>
                <h1>Command Center Overview</h1>
                <p>Unified real-time management for all sections and client submissions.</p>
              </div>
            </div>

            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <strong>{content.services.length}</strong>
                <span>Active Services</span>
              </div>
              <div className="admin-stat-card">
                <strong>{content.projects.length}</strong>
                <span>Portfolio Projects</span>
              </div>
              <div className="admin-stat-card">
                <strong>{content.posts.length}</strong>
                <span>Published Articles</span>
              </div>
              <div className="admin-stat-card">
                <strong>{submissions.enquiries.length}</strong>
                <span>Client Inquiries</span>
              </div>
              <div className="admin-stat-card">
                <strong>{submissions.subscribers.length}</strong>
                <span>Subscribers</span>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fast Content Shortcuts</CardTitle>
              </CardHeader>
              <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6" }}>
                Switch tabs instantly without page reloads. Any change you save
                is atomically committed to storage and immediately updates the live
                website via edge cache revalidation.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "18px",
                  flexWrap: "wrap",
                }}
              >
                <Button variant="secondary" onClick={() => setActiveTab("hero")}>
                  Hero & Brand
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab("services")}>
                  Services Manager
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab("projects")}>
                  Portfolio Manager
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab("blog")}>
                  Blog Articles
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab("about")}>
                  About & Process
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab("partners")}>
                  Tech Partners
                </Button>
                <Button variant="secondary" onClick={() => setActiveTab("submissions")}>
                  View Submissions
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "hero" && <HeroEditor initialContent={content} />}
        {activeTab === "services" && <ServicesManager initialContent={content} />}
        {activeTab === "projects" && <ProjectsManager initialContent={content} />}
        {activeTab === "blog" && <BlogManager initialContent={content} />}
        {activeTab === "about" && <AboutEditor initialContent={content} />}
        {activeTab === "partners" && <PartnersManager initialContent={content} />}
        {activeTab === "submissions" && <SubmissionsViewer submissions={submissions} />}
      </main>
    </div>
  );
}
