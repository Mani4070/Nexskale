"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import type { Content } from "@/lib/content";
import { useSaveContent } from "./use-save-content";
import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/textarea";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function ServicesManager({ initialContent }: { initialContent: Content }) {
  const [content, setContent] = useState<Content>(initialContent);
  const { saveContent, saving } = useSaveContent();

  function addService() {
    const newService: Content["services"][number] = {
      id: `service-${Date.now()}`,
      icon: "monitor",
      title: "New Service",
      description: "Brief summary of the service offerings.",
      detail: "In-depth description of the service capabilities.",
      features: ["Custom feature 1", "Custom feature 2"],
    };
    setContent((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  }

  function updateService(
    index: number,
    field: string,
    value: string | string[],
  ) {
    setContent((prev) => {
      const services = [...prev.services];
      services[index] = { ...services[index], [field]: value };
      return { ...prev, services };
    });
  }

  function deleteService(index: number) {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Services Management</h1>
          <p>Add, edit, or delete offerings shown on the home page and /services.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="secondary" onClick={addService}>
            <Plus size={15} /> Add Service
          </Button>
          <Button onClick={() => saveContent(content)} isLoading={saving}>
            <Save size={15} /> Save Changes
          </Button>
        </div>
      </div>

      {content.services.map((service, idx) => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle>Service #{idx + 1}: {service.title}</CardTitle>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteService(idx)}
            >
              <Trash2 size={13} /> Delete
            </Button>
          </CardHeader>
          <div className="admin-row">
            <Input
              label="URL Slug (/services/[slug])"
              value={service.id}
              onChange={(e) => updateService(idx, "id", e.target.value)}
            />
            <Input
              label="Service Title"
              value={service.title}
              onChange={(e) => updateService(idx, "title", e.target.value)}
            />
            <Input
              label="Icon Key (monitor, phone, sparkles, box, cloud, palette, rocket, shield)"
              value={service.icon}
              onChange={(e) => updateService(idx, "icon", e.target.value)}
            />
          </div>
          <Textarea
            label="Overview / Card Summary"
            value={service.description}
            onChange={(e) => updateService(idx, "description", e.target.value)}
          />
          <Textarea
            label="Detail Page Content"
            value={service.detail}
            onChange={(e) => updateService(idx, "detail", e.target.value)}
          />
          <Input
            label="Features (comma-separated list)"
            value={service.features.join(", ")}
            onChange={(e) =>
              updateService(
                idx,
                "features",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              )
            }
          />
        </Card>
      ))}
    </div>
  );
}
