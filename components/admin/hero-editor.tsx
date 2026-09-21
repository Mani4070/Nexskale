"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { Content } from "@/lib/content";
import { useSaveContent } from "./use-save-content";
import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function HeroEditor({ initialContent }: { initialContent: Content }) {
  const [content, setContent] = useState<Content>(initialContent);
  const { saveContent, saving } = useSaveContent();

  function updateBrand(field: keyof Content["brand"], value: string) {
    setContent((prev) => ({
      ...prev,
      brand: { ...prev.brand, [field]: value },
    }));
  }

  function updateHero(field: keyof Content["hero"], value: string) {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  }

  function updateStat(index: number, field: "value" | "label", value: string) {
    setContent((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Hero & Brand Settings</h1>
          <p>Configure brand identity, hero banner copy, and hero metric statistics.</p>
        </div>
        <Button onClick={() => saveContent(content)} isLoading={saving}>
          <Save size={15} /> Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brand Information</CardTitle>
        </CardHeader>
        <div className="admin-row">
          <Input
            label="Brand Name"
            value={content.brand.name}
            onChange={(e) => updateBrand("name", e.target.value)}
          />
          <Input
            label="Contact Email"
            type="email"
            value={content.brand.email}
            onChange={(e) => updateBrand("email", e.target.value)}
          />
        </div>
        <Input
          label="Brand Tagline"
          value={content.brand.tagline}
          onChange={(e) => updateBrand("tagline", e.target.value)}
        />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hero Banner Typography</CardTitle>
        </CardHeader>
        <div className="admin-row">
          <Input
            label="Eyebrow Tag"
            value={content.hero.eyebrow}
            onChange={(e) => updateHero("eyebrow", e.target.value)}
          />
          <Input
            label="Headline First Line"
            value={content.hero.title}
            onChange={(e) => updateHero("title", e.target.value)}
          />
        </div>
        <div className="admin-row">
          <Input
            label="Headline Second Line"
            value={content.hero.secondLine}
            onChange={(e) => updateHero("secondLine", e.target.value)}
          />
          <Input
            label="Gradient Highlight"
            value={content.hero.highlight}
            onChange={(e) => updateHero("highlight", e.target.value)}
          />
        </div>
        <Textarea
          label="Hero Description"
          value={content.hero.description}
          onChange={(e) => updateHero("description", e.target.value)}
        />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hero Metrics / Stats</CardTitle>
        </CardHeader>
        <div className="admin-row">
          {content.stats.map((s, idx) => (
            <div key={idx} className="admin-item-box">
              <Input
                label="Metric Value"
                value={s.value}
                onChange={(e) => updateStat(idx, "value", e.target.value)}
              />
              <Input
                label="Metric Label"
                value={s.label}
                onChange={(e) => updateStat(idx, "label", e.target.value)}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
