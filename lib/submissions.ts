import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
const globalStore = globalThis as typeof globalThis & {
  submissionQueue?: Promise<unknown>;
};
export function saveSubmission(
  kind: "enquiries" | "subscribers",
  data: Record<string, string>,
) {
  const operation = (globalStore.submissionQueue ?? Promise.resolve())
    .catch(() => {})
    .then(async () => {
      const directory =
        process.env.SUBMISSIONS_DIR || path.join(process.cwd(), "data");
      await mkdir(directory, { recursive: true });
      const file = path.join(directory, `${kind}.json`);
      let entries: Record<string, string>[] = [];
      try {
        entries = JSON.parse(await readFile(file, "utf8"));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      if (
        kind === "subscribers" &&
        entries.some((entry) => entry.email === data.email)
      )
        return;
      entries.push({
        ...data,
        id: randomUUID(),
        createdAt: new Date().toISOString(),
      });
      const temporary = `${file}.${randomUUID()}.tmp`;
      await writeFile(temporary, JSON.stringify(entries, null, 2), "utf8");
      await rename(temporary, file);
    });
  globalStore.submissionQueue = operation;
  return operation;
}
export async function handleSubmission(
  request: Request,
  kind: "enquiries" | "subscribers",
) {
  try {
    if (Number(request.headers.get("content-length") || 0) > 16000)
      return Response.json(
        { error: "Please keep your message under 5,000 characters." },
        { status: 413 },
      );
    const raw = await request.text();
    if (raw.length > 16000)
      return Response.json({ error: "Request too large." }, { status: 413 });
    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
    if (!input || typeof input !== "object")
      return Response.json({ error: "Invalid request." }, { status: 400 });
    const email =
      typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    const data: Record<string, string> = { email };
    if (kind === "enquiries") {
      for (const key of ["name", "company", "service", "budget", "message"])
        data[key] = typeof input[key] === "string" ? input[key].trim() : "";
      if (
        data.name.length < 2 ||
        data.name.length > 120 ||
        data.message.length < 10 ||
        data.message.length > 5000 ||
        data.company.length > 200 ||
        data.service.length > 120 ||
        data.budget.length > 100
      )
        return Response.json(
          {
            error:
              "Please enter your name and a project description between 10 and 5,000 characters.",
          },
          { status: 400 },
        );
    }
    await saveSubmission(kind, data);
    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Submission storage failed", error);
    return Response.json(
      { error: "We could not save your request. Please try again." },
      { status: 500 },
    );
  }
}
