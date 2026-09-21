import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type initialContent from "@/data/content.json";

export type Content = typeof initialContent;

let cachedContent: Content | null = null;

export function invalidateContentCache() {
  cachedContent = null;
}

export const getContent = cache(async function getContent(): Promise<Content> {
  if (cachedContent && process.env.NODE_ENV === "production") {
    return cachedContent;
  }
  const fileContent = await readFile(
    path.join(process.cwd(), "data/content.json"),
    "utf8",
  );
  const data = JSON.parse(fileContent);
  if (process.env.NODE_ENV === "production") {
    cachedContent = data;
  }
  return data;
});
