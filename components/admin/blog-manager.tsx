"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import type { Content } from "@/lib/content";
import { useSaveContent } from "./use-save-content";
import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function BlogManager({ initialContent }: { initialContent: Content }) {
  const [content, setContent] = useState<Content>(initialContent);
  const { saveContent, saving } = useSaveContent();

  function addPost() {
    const newPost: Content["posts"][number] = {
      id: `post-${Date.now()}`,
      title: "New Article Title",
      category: "AI",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      excerpt: "Short introductory excerpt for the article.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
      body: ["Paragraph 1 of the article.", "Paragraph 2 of the article."],
    };
    setContent((prev) => ({
      ...prev,
      posts: [newPost, ...prev.posts],
    }));
  }

  function updatePost(index: number, field: string, value: string | string[]) {
    setContent((prev) => {
      const posts = [...prev.posts];
      posts[index] = { ...posts[index], [field]: value };
      return { ...prev, posts };
    });
  }

  function deletePost(index: number) {
    setContent((prev) => ({
      ...prev,
      posts: prev.posts.filter((_, i) => i !== index),
    }));
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Blog & Perspectives Manager</h1>
          <p>Publish, edit, and organize editorial articles and research posts.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="secondary" onClick={addPost}>
            <Plus size={15} /> Write New Article
          </Button>
          <Button onClick={() => saveContent(content)} isLoading={saving}>
            <Save size={15} /> Save Changes
          </Button>
        </div>
      </div>

      {content.posts.map((post, idx) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>Article #{idx + 1}: {post.title}</CardTitle>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deletePost(idx)}
            >
              <Trash2 size={13} /> Delete
            </Button>
          </CardHeader>
          <div className="admin-row">
            <Input
              label="URL Slug (/blog/[slug])"
              value={post.id}
              onChange={(e) => updatePost(idx, "id", e.target.value)}
            />
            <Input
              label="Article Title"
              value={post.title}
              onChange={(e) => updatePost(idx, "title", e.target.value)}
            />
            <Input
              label="Category (AI, Engineering, Systems, Cloud)"
              value={post.category}
              onChange={(e) => updatePost(idx, "category", e.target.value)}
            />
            <Input
              label="Published Date"
              value={post.date}
              onChange={(e) => updatePost(idx, "date", e.target.value)}
            />
          </div>
          <Input
            label="Cover Image URL"
            value={post.image}
            onChange={(e) => updatePost(idx, "image", e.target.value)}
          />
          <Textarea
            label="Short Excerpt"
            value={post.excerpt}
            onChange={(e) => updatePost(idx, "excerpt", e.target.value)}
          />
          <Textarea
            label="Article Body (paragraphs separated by double line break)"
            style={{ minHeight: "150px" }}
            value={post.body.join("\n\n")}
            onChange={(e) =>
              updatePost(
                idx,
                "body",
                e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean),
              )
            }
          />
        </Card>
      ))}
    </div>
  );
}
