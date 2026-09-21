import { readFile } from "node:fs/promises";
import path from "node:path";
import { getContent } from "@/lib/content";
import AdminWorkspace from "@/components/admin/admin-workspace";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getContent();

  const directory =
    process.env.SUBMISSIONS_DIR || path.join(process.cwd(), "data");

  let enquiries = [];
  let subscribers = [];

  try {
    const raw = await readFile(path.join(directory, "enquiries.json"), "utf8");
    enquiries = JSON.parse(raw);
  } catch {
    enquiries = [];
  }

  try {
    const raw = await readFile(path.join(directory, "subscribers.json"), "utf8");
    subscribers = JSON.parse(raw);
  } catch {
    subscribers = [];
  }

  return (
    <AdminWorkspace
      content={content}
      submissions={{ enquiries, subscribers }}
    />
  );
}
