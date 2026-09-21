import { handleSubmission } from "@/lib/submissions";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limiter = rateLimit(`subscribe:${ip}`, 5, 5 * 60 * 1000);

  if (!limiter.allowed) {
    return Response.json(
      {
        error: `Too many requests. Please wait ${Math.ceil(
          limiter.resetMs / 1000,
        )} seconds before trying again.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(limiter.resetMs / 1000).toString(),
        },
      },
    );
  }

  return handleSubmission(request, "subscribers");
}
