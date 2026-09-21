"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import type { Content } from "@/lib/content";
export default function ContactForm({
  content: c,
  selectedService = "",
}: {
  content: Content;
  selectedService?: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Please try again.");
    }
  }

  if (status === "success")
    return (
      <div className="success-state" role="status">
        <CheckCircle2 size={48} />
        <h2>Great ideas start here.</h2>
        <p>
          Your enquiry has been saved. Thank you for sharing your project with
          NexSkale.
        </p>
        <Link href="/" className="button primary">
          Back to exploring <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submitContact}>
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input
            name="name"
            required
            minLength={2}
            maxLength={120}
            placeholder="Alex Morgan"
            autoComplete="name"
          />
        </label>
        <label>
          Work email <span>*</span>
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder="alex@company.com"
            autoComplete="email"
          />
        </label>
      </div>
      <label>
        Company
        <input
          name="company"
          maxLength={200}
          placeholder="Your company or startup"
          autoComplete="organization"
        />
      </label>
      <div className="form-row">
        <label>
          I’m interested in
          <select name="service" defaultValue={selectedService}>
            <option value="">Select a service</option>
            <option>Discovery call</option>
            {c.services.map((s) => (
              <option key={s.id}>{s.title}</option>
            ))}
          </select>
        </label>
        <label>
          Project budget
          <select name="budget" defaultValue="">
            <option value="">Select a range</option>
            <option>Under $5,000</option>
            <option>$5,000 – $15,000</option>
            <option>$15,000 – $50,000</option>
            <option>$50,000+</option>
            <option>Let’s discuss</option>
          </select>
        </label>
      </div>
      <label>
        A little about your project <span>*</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder="What are you looking to build?"
        />
      </label>
      <p className="form-error" role="alert">
        {error}
      </p>
      <button
        className="button primary submit-button"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            Sending <LoaderCircle className="spin" size={16} />
          </>
        ) : (
          <>
            Send project enquiry <ArrowRight size={16} />
          </>
        )}
      </button>
      <p className="form-note">
        We’ll use your information to respond to your enquiry.
      </p>
    </form>
  );
}
