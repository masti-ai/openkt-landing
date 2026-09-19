"use client";

import { useState } from "react";

/**
 * A multi-line block with a title bar and a copy button — config snippets
 * and the paste-in prompts. `scroll` caps the height for long text; the
 * copy button always copies the full text.
 */
export default function CopyBlock({
  text,
  title,
  label = "Copy",
  scroll,
  tone = "light",
}: {
  text: string;
  title: string;
  /** Accessible name of the copy button, e.g. "Copy setup prompt". */
  label?: string;
  scroll?: boolean;
  tone?: "light" | "dark";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API can reject — the text stays selectable
    }
  }

  const dark = tone === "dark";
  return (
    <div
      className={`rounded border min-w-0 ${
        dark ? "border-warm-700 bg-warm-800/60" : "border-warm-200 bg-warm-50"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-3 py-2 border-b ${
          dark ? "border-warm-700" : "border-warm-200"
        }`}
      >
        <span
          className={`flex-1 min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.18em] ${
            dark ? "text-warm-400" : "text-warm-500"
          }`}
        >
          {title}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : label}
          className={`shrink-0 text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
            dark
              ? "border-warm-600 text-warm-300 hover:text-warm-50 hover:border-warm-400"
              : "border-warm-200 text-warm-500 hover:text-warm-800 hover:border-warm-400"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        tabIndex={0}
        className={`px-3 py-3 font-mono text-[12px] leading-relaxed whitespace-pre-wrap break-words ${
          scroll ? "max-h-72 overflow-y-auto" : ""
        } ${dark ? "text-warm-100" : "text-warm-800"}`}
      >
        {text}
      </pre>
    </div>
  );
}
