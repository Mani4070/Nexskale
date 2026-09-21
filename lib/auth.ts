import { createHash } from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "nexskale_admin_session";
const DEFAULT_SECRET = "admin123";

function getExpectedToken(): string {
  const secret = process.env.ADMIN_SECRET || DEFAULT_SECRET;
  return createHash("sha256").update(`nexskale-admin:${secret}`).digest("hex");
}

export function isValidSecret(inputSecret: string): boolean {
  const activeSecret = process.env.ADMIN_SECRET || DEFAULT_SECRET;
  return inputSecret === activeSecret;
}

export function createSessionToken(): string {
  return getExpectedToken();
}

export async function isAdminAuthenticated(request?: Request): Promise<boolean> {
  const expected = getExpectedToken();

  // 1. Check Bearer Authorization header if provided
  if (request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7).trim();
      if (token === expected) return true;
    }
  }

  // 2. Check HTTP cookie
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (sessionCookie && sessionCookie.value === expected) {
      return true;
    }
  } catch {
    // If outside request context or failed reading cookies
  }

  return false;
}

export { ADMIN_COOKIE_NAME };
