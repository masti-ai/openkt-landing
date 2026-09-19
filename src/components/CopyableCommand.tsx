"use client";

import { useState } from "react";

export default function CopyableCommand({
  command,
  noPrefix,
  label = "Copy command",
}: {
  command: string;
  noPrefix?: boolean;
  /** Accessible name of the copy button, e.g. "Copy MCP URL". */
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API can reject — user will just select-and-copy
    }
  }

  return (
    <div className="group relative flex items-center gap-2 bg-warm-50 border border-warm-200 rounded px-3 py-2 font-mono text-[12px] text-warm-800 min-w-0">
      {!noPrefix && <span className="text-warm-400 select-none">$</span>}
      <code className="flex-1 min-w-0 overflow-x-auto whitespace-nowrap">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : label}
        className="shrink-0 text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded border border-warm-200 text-warm-500 hover:text-warm-800 hover:border-warm-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
