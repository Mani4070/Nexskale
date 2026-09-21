"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import type { Content } from "@/lib/content";
import { useSaveContent } from "./use-save-content";
import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function ProjectsManager({ initialContent }: { initialContent: Content }) {
  const [content, setContent] = useState<Content>(initialContent);
  const { saveContent, saving } = useSaveContent();

  function addProject() {
    const newProject: Content["projects"][number] = {
      id: `project-${Date.now()}`,
      title: "New Project",
      category: "AI",
      description: "Short project summary.",
      theme: "purple",
      product: "Concept Product",
      detail: "Detailed project background and outcome.",
      features: ["Core Feature 1"],
      stack: ["Next.js", "TypeScript"],
    };
    setContent((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  }

  function updateProject(
    index: number,
    field: string,
    value: string | string[],
  ) {
    setContent((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  }

  function deleteProject(index: number) {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Projects & Portfolio Management</h1>
          <p>Manage product concepts shown on the home page, /work, and /products.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="secondary" onClick={addProject}>
            <Plus size={15} /> Add Project
          </Button>
          <Button onClick={() => saveContent(content)} isLoading={saving}>
            <Save size={15} /> Save Changes
          </Button>
        </div>
      </div>

      {content.projects.map((proj, idx) => (
        <Card key={proj.id}>
          <CardHeader>
            <CardTitle>Project #{idx + 1}: {proj.title}</CardTitle>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteProject(idx)}
            >
              <Trash2 size={13} /> Delete
            </Button>
          </CardHeader>
          <div className="admin-row">
            <Input
              label="URL Slug (/products/[slug])"
              value={proj.id}
              onChange={(e) => updateProject(idx, "id", e.target.value)}
            />
            <Input
              label="Project Title"
              value={proj.title}
              onChange={(e) => updateProject(idx, "title", e.target.value)}
            />
            <Input
              label="Category (AI, Mobile App, Web Platform, Cloud Infrastructure)"
              value={proj.category}
              onChange={(e) => updateProject(idx, "category", e.target.value)}
            />
          </div>
          <div className="admin-row">
            <Input
              label="Product Brand Name"
              value={proj.product}
              onChange={(e) => updateProject(idx, "product", e.target.value)}
            />
            <Input
              label="Technology Stack (comma-separated)"
              value={proj.stack.join(", ")}
              onChange={(e) =>
                updateProject(
                  idx,
                  "stack",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                )
              }
            />
          </div>
          <Textarea
            label="Card Summary"
            value={proj.description}
            onChange={(e) => updateProject(idx, "description", e.target.value)}
          />
          <Textarea
            label="In-Depth Case Study / Detail"
            value={proj.detail}
            onChange={(e) => updateProject(idx, "detail", e.target.value)}
          />
        </Card>
      ))}
    </div>
  );
}
