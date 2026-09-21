"use client";

import { useState } from "react";
import { useToast } from "./toast";
import type { Content } from "@/lib/content";

export function useSaveContent() {
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  async function saveContent(updatedContent: Content): Promise<boolean> {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContent),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      showToast("success", "Changes saved! Site updated and revalidated.");
      return true;
    } catch (err) {
      showToast(
        "error",
        err instanceof Error ? err.message : "Failed to save changes",
      );
      return false;
    } finally {
      setSaving(false);
    }
  }

  return { saveContent, saving };
}
