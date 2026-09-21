import { readFile } from "node:fs/promises";
import path from "node:path";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const isAuth = await isAdminAuthenticated(request);
  if (!isAuth) {
    return Response.json(
      { error: "Unauthorized. Please log in to the admin panel." },
      { status: 401 },
    );
  }

  const directory =
    process.env.SUBMISSIONS_DIR || path.join(process.cwd(), "data");

  let enquiries: Record<string, unknown>[] = [];
  let subscribers: Record<string, unknown>[] = [];

  try {
    const rawEnquiries = await readFile(
      path.join(directory, "enquiries.json"),
      "utf8",
    );
    enquiries = JSON.parse(rawEnquiries);
  } catch {
    enquiries = [];
  }

  try {
    const rawSubscribers = await readFile(
      path.join(directory, "subscribers.json"),
      "utf8",
    );
    subscribers = JSON.parse(rawSubscribers);
  } catch {
    subscribers = [];
  }

  return Response.json({ enquiries, subscribers });
}
