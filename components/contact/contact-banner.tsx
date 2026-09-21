import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export function ContactBanner() {
  return (
    <section className="contact-banner" aria-label="Contact Callout">
      <div className="banner-wave" aria-hidden="true" />
      <div className="container banner-content">
        <div>
          <div className="eyebrow">Start a conversation</div>
          <h2>Let&apos;s build something remarkable together.</h2>
          <p>
            Whether you&apos;re starting from scratch or looking to scale,
            we&apos;re here to help bring your vision to life.
          </p>
        </div>
        <div className="banner-actions">
          <Link className="button white" href="/contact">
            Start a project <ArrowRight size={15} />
          </Link>
          <Link className="schedule-button" href="/contact">
            <Calendar size={14} />
            Schedule a call
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContactBanner;
