"use client";

import { useState } from "react";
import { apiUrl } from "@/lib/api";

const MAILTO_FALLBACK =
  "mailto:prathamonchain@gmail.com?subject=Open%20KT%20Pilot";

type Status = "idle" | "sending" | "sent" | "error";

export default function PilotContact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [team, setTeam] = useState("");
  const [building, setBuilding] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const message = [
      team ? `Team: ${team}` : null,
      building ? `Building: ${building}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(apiUrl("/api/billing/enterprise-interest"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || undefined,
          email: email || undefined,
          company: company || undefined,
          message: message || "Pilot application",
          source: "open-kt-pilot",
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMsg(body.error || `submission failed (${res.status})`);
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "network error");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="relative bg-white p-7">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 text-accent/70">
          <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-current" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-current" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-current" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-current" />
        </div>
        <div className="flex items-center gap-2 mb-3 text-[10px] uppercase tracking-[0.2em] font-mono text-accent">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
          application received
        </div>
        <p
          className="text-xl text-warm-900"
          style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
        >
          You're on the list.
        </p>
        <p className="mt-2 text-[13.5px] text-warm-700 leading-relaxed">
          We'll be in touch within one business day. If we're a fit, we'll book
          a 30-minute call and walk you through the pilot setup the same week.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-warm-300 px-0 py-2.5 text-[14px] text-warm-900 placeholder:text-warm-400 focus:outline-none focus:border-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="relative bg-white p-7 sm:p-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 text-warm-400">
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-current" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-current" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-current" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-current" />
      </div>

      <div className="flex items-center gap-2 mb-6 text-[10px] uppercase tracking-[0.2em] font-mono text-warm-500">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
        pilot application · open-kt-pilot.form
      </div>

      <div className="space-y-5">
        <Field label="01 · Name">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={fieldClass}
          />
        </Field>
        <Field label="02 · Work email" required>
          <input
            required
            type="email"
            placeholder="you@team.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={fieldClass}
          />
        </Field>
        <Field label="03 · Company">
          <input
            type="text"
            placeholder="Acme Inc."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
            className={fieldClass}
          />
        </Field>
        <Field label="04 · Team size + harnesses">
          <input
            type="text"
            placeholder="e.g. 8 engineers, mostly Claude Code + Cursor"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="05 · What are you building?" required>
          <textarea
            required
            placeholder="One paragraph is plenty — what your team ships, what hurts about agent sessions today."
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            rows={3}
            maxLength={2000}
            className={`${fieldClass} resize-y leading-relaxed`}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "sending" || email.trim().length === 0 || building.trim().length === 0}
        className="mt-7 inline-flex items-center justify-center w-full h-12 rounded-md bg-accent text-white text-[14px] font-medium hover:bg-accent/90 transition-all shadow-sm hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-ring"
      >
        {status === "sending" ? "Sending…" : "Apply to the pilot →"}
      </button>

      {errorMsg ? (
        <p className="mt-3 text-[11px] text-red-600">
          {errorMsg} —{" "}
          <a href={MAILTO_FALLBACK} className="underline hover:no-underline">
            email us directly
          </a>
        </p>
      ) : (
        <p className="mt-3 text-[10px] uppercase tracking-[0.18em] font-mono text-warm-500 text-center">
          5–10 spots · same-week response · no spam
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-mono text-warm-500 mb-1">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
