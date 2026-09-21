"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { Content } from "@/lib/content";
import { useSaveContent } from "./use-save-content";
import Button from "../ui/button";
import Textarea from "../ui/textarea";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function PartnersManager({ initialContent }: { initialContent: Content }) {
  const [content, setContent] = useState<Content>(initialContent);
  const { saveContent, saving } = useSaveContent();

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Technology Partners & Stack</h1>
          <p>Manage logos and brand technology badges shown on the home page marquee.</p>
        </div>
        <Button onClick={() => saveContent(content)} isLoading={saving}>
          <Save size={15} /> Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partner Technologies List</CardTitle>
        </CardHeader>
        <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "16px" }}>
          Provide the partner names as a comma-separated list (e.g. Next.js, AWS, Google Cloud, Anthropic, Vercel, Supabase, Tailwind).
        </p>
        <Textarea
          label="Partners List"
          style={{ minHeight: "120px" }}
          value={content.partners.join(", ")}
          onChange={(e) =>
            setContent((prev) => ({
              ...prev,
              partners: e.target.value
                .split(",")
                .map((p) => p.trim())
                .filter(Boolean),
            }))
          }
        />
      </Card>
    </div>
  );
}
