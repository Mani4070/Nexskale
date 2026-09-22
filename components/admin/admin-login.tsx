"use client";

import { useState, type FormEvent } from "react";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import Logo from "../logo";
import Button from "../ui/button";
import Input from "../ui/input";

export default function AdminLogin({ brandName }: { brandName: string }) {
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: passcode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");

      // Reload to re-render server layout with valid session
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid passcode");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at top, #1e1136 0%, #090c15 70%)",
        padding: "20px",
      }}
    >
      <div
        className="ui-card"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "36px 32px",
          backdropFilter: "blur(16px)",
          background: "rgba(15, 20, 34, 0.8)",
          borderColor: "rgba(124, 58, 237, 0.3)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ display: "inline-block", marginBottom: "16px" }}>
            <Logo name={brandName} mode="full" height={42} />
          </div>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 8px 0",
              letterSpacing: "-0.4px",
            }}
          >
            Admin Authentication
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>
            Enter your admin passcode to access the Content Management System.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <Input
              label="Admin Passcode"
              type="password"
              placeholder="••••••••"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              autoFocus
            />
          </div>

          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--brand-lilac)",
                fontSize: "12px",
                marginBottom: "16px",
                background: "rgba(124, 58, 237, 0.1)",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid rgba(124, 58, 237, 0.2)",
              }}
            >
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            style={{ width: "100%" }}
            isLoading={loading}
          >
            <Lock size={15} />
            Unlock Admin Panel
            <ArrowRight size={15} />
          </Button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginTop: "20px",
              color: "#64748b",
              fontSize: "11px",
            }}
          >
            <ShieldCheck size={13} color="var(--brand-cyan)" />
            <span>Encrypted Session · Configurable via ADMIN_SECRET</span>
          </div>
        </form>
      </div>
    </div>
  );
}
