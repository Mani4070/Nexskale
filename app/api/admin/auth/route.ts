import { cookies } from "next/headers";
import {
  isValidSecret,
  createSessionToken,
  isAdminAuthenticated,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const authenticated = await isAdminAuthenticated(request);
  return Response.json({ authenticated });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secret = typeof body?.secret === "string" ? body.secret.trim() : "";

    if (!isValidSecret(secret)) {
      return Response.json(
        { error: "Invalid admin passcode" },
        { status: 401 },
      );
    }

    const token = createSessionToken();
    const cookieStore = await cookies();

    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return Response.json({ success: true });
}
