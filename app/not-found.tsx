import Link from "next/link";
import Logo from "@/components/logo";

export default function NotFound() {
  return (
    <main className="not-found">
      <div style={{ marginBottom: "28px", display: "inline-flex" }}>
        <Logo height={40} mode="full" />
      </div>
      <br />
      <span className="eyebrow purple">404 · Page not found</span>
      <h1>
        Let’s get you back
        <br />
        on the right path.
      </h1>
      <p>This page may have moved, or the link may be incorrect.</p>
      <Link href="/" className="button primary">
        Back to home →
      </Link>
    </main>
  );
}
