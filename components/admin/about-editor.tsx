"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { Content } from "@/lib/content";
import { useSaveContent } from "./use-save-content";
import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function AboutEditor({ initialContent }: { initialContent: Content }) {
  const [content, setContent] = useState<Content>(initialContent);
  const { saveContent, saving } = useSaveContent();

  function updateAbout(field: keyof Content["about"], value: string) {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }));
  }

  function updatePrinciple(index: number, field: "title" | "description", value: string) {
    setContent((prev) => {
      const principles = [...prev.about.principles];
      principles[index] = { ...principles[index], [field]: value };
      return {
        ...prev,
        about: { ...prev.about, principles },
      };
    });
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>About Section & Principles</h1>
          <p>Manage company presentation, vision, photography, and guiding principles.</p>
        </div>
        <Button onClick={() => saveContent(content)} isLoading={saving}>
          <Save size={15} /> Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Section Details</CardTitle>
        </CardHeader>
        <Input
          label="Headline Title"
          value={content.about.title}
          onChange={(e) => updateAbout("title", e.target.value)}
        />
        <Textarea
          label="Introductory Description"
          value={content.about.description}
          onChange={(e) => updateAbout("description", e.target.value)}
        />
        <div className="admin-row">
          <Input
            label="Meeting Room / Office Image URL"
            value={content.about.image}
            onChange={(e) => updateAbout("image", e.target.value)}
          />
          <Input
            label="Image Accessible Alt Text"
            value={content.about.imageAlt}
            onChange={(e) => updateAbout("imageAlt", e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Core Principles</CardTitle>
        </CardHeader>
        <div className="admin-row">
          {content.about.principles.map((p, idx) => (
            <div key={idx} className="admin-item-box">
              <Input
                label="Principle Title"
                value={p.title}
                onChange={(e) => updatePrinciple(idx, "title", e.target.value)}
              />
              <Textarea
                label="Principle Description"
                value={p.description}
                onChange={(e) => updatePrinciple(idx, "description", e.target.value)}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
