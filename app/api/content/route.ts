import { writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { getContent, invalidateContentCache } from "@/lib/content";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return Response.json(await getContent());
}

export async function POST(request: Request) {
  const isAuth = await isAdminAuthenticated(request);
  if (!isAuth) {
    return Response.json(
      { error: "Unauthorized. Please log in to the admin panel." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid content format" }, { status: 400 });
    }

    if (!body.brand || !body.hero || !Array.isArray(body.services) || !Array.isArray(body.projects)) {
      return Response.json(
        { error: "Content structure missing required sections" },
        { status: 400 },
      );
    }

    const filePath = path.join(process.cwd(), "data/content.json");
    const tempPath = `${filePath}.${randomUUID()}.tmp`;

    await writeFile(tempPath, JSON.stringify(body, null, 2), "utf8");
    await rename(tempPath, filePath);

    invalidateContentCache();
    revalidatePath("/", "layout");

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to update content:", error);
    return Response.json(
      { error: "Failed to save content updates" },
      { status: 500 },
    );
  }
}
