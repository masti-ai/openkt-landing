"use client";

import { useState } from "react";
import CopyableCommand from "./CopyableCommand";

type HarnessKey = "claude-code" | "claude-desktop" | "codex" | "cursor" | "custom";

type Harness = {
  key: HarnessKey;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
};

const CURSOR_CONFIG = { url: "https://api.openkt.ai/mcp", type: "http" };
const CURSOR_DEEPLINK = `cursor://anysphere.cursor-deeplink/mcp/install?name=openkt&config=${
  typeof window === "undefined"
    ? Buffer.from(JSON.stringify(CURSOR_CONFIG)).toString("base64")
    : btoa(JSON.stringify(CURSOR_CONFIG))
}`;

const HARNESSES: Harness[] = [
  {
    key: "claude-code",
    label: "Claude Code",
    subtitle: "CLI",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-hidden>
        <path d="M4.5 4.5h4l3.5 6 3.5-6h4l-5.5 9 5.5 10h-4L12 15l-3.5 8.5h-4L10 13.5z" />
      </svg>
    ),
  },
  {
    key: "claude-desktop",
    label: "Claude Desktop",
    subtitle: "GUI",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
        <path d="M9 20h6M12 17v3" strokeLinecap="round" />
        <path d="M8.5 8.5l3 5 3-5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
      </svg>
    ),
  },
  {
    key: "codex",
    label: "Codex",
    subtitle: "CLI",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-hidden>
        <path d="M12 2.5c5.25 0 9.5 4.25 9.5 9.5s-4.25 9.5-9.5 9.5S2.5 17.25 2.5 12 6.75 2.5 12 2.5zm0 2.5a7 7 0 100 14 7 7 0 000-14zm0 2.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
      </svg>
    ),
  },
  {
    key: "cursor",
    label: "Cursor",
    subtitle: "GUI",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" aria-hidden>
        <path d="M3.5 3L20.5 12 3.5 21V3z" opacity="0.85" />
        <path d="M3.5 3l8.5 9-8.5 9V3z" opacity="0.5" />
      </svg>
    ),
  },
  {
    key: "custom",
    label: "Custom",
    subtitle: "Any MCP",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
        <path d="M6.5 10l3 2.5-3 2.5M12 15h4" />
      </svg>
    ),
  },
];

function BoxCorners() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 text-warm-400"
    >
      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-current" />
      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-current" />
      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-current" />
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-current" />
    </div>
  );
}

export default function InstallTabs() {
  const [active, setActive] = useState<HarnessKey>("claude-code");

  function onTabKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    const i = HARNESSES.findIndex((h) => h.key === active);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive(HARNESSES[(i + 1) % HARNESSES.length].key);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive(HARNESSES[(i - 1 + HARNESSES.length) % HARNESSES.length].key);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(HARNESSES[0].key);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(HARNESSES[HARNESSES.length - 1].key);
    }
  }

  return (
    <div className="relative bg-white p-6 sm:p-8">
      <BoxCorners />

      <div role="tablist" aria-label="Install target" className="flex flex-wrap gap-1 sm:gap-2 border-b border-warm-200 -mx-2 px-2 pb-0">
        {HARNESSES.map((h) => {
          const selected = h.key === active;
          return (
            <button
              key={h.key}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`install-panel-${h.key}`}
              id={`install-tab-${h.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(h.key)}
              onKeyDown={onTabKey}
              className={`group relative flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-t ${
                selected
                  ? "text-warm-900"
                  : "text-warm-500 hover:text-warm-800"
              }`}
            >
              <span className={`w-4 h-4 shrink-0 ${selected ? "text-accent" : "text-current"}`}>
                {h.icon}
              </span>
              <span className="hidden sm:inline font-medium">{h.label}</span>
              {selected && (
                <span className="pointer-events-none absolute left-2 right-2 -bottom-px h-0.5 bg-accent" />
              )}
            </button>
          );
        })}
      </div>

      {HARNESSES.map((h) => (
        <div
          key={h.key}
          role="tabpanel"
          id={`install-panel-${h.key}`}
          aria-labelledby={`install-tab-${h.key}`}
          hidden={h.key !== active}
          className="pt-6"
        >
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-base font-medium text-warm-900">{h.label}</h3>
            <span className="text-[10px] uppercase tracking-[0.15em] text-warm-500">
              {h.subtitle}
            </span>
          </div>
          <Panel harness={h.key} />
        </div>
      ))}
    </div>
  );

  function Panel({ harness }: { harness: HarnessKey }) {
    switch (harness) {
      case "claude-code":
        return (
          <>
            <CopyableCommand command="claude mcp add --transport http openkt https://api.openkt.ai/mcp -s user" />
            <p className="mt-3 text-[13px] text-warm-600 leading-relaxed">
              One command. Verifies connection, stores at user scope so every project picks it up.
            </p>
          </>
        );
      case "claude-desktop":
        return (
          <>
            <CopyableCommand command="https://api.openkt.ai/mcp" noPrefix />
            <p className="mt-3 text-[13px] text-warm-600 leading-relaxed">
              Settings → <span className="text-warm-800">Connectors</span> → <span className="text-warm-800">Add Custom Connector</span>. Paste the URL above.
            </p>
          </>
        );
      case "codex":
        return (
          <>
            <CopyableCommand command="codex mcp add openkt --transport http --url https://api.openkt.ai/mcp" />
            <p className="mt-3 text-[13px] text-warm-600 leading-relaxed">
              Codex ≥ 0.24 speaks MCP natively. Same server, same tools — no re-wiring.
            </p>
          </>
        );
      case "cursor":
        return (
          <>
            <a
              href={CURSOR_DEEPLINK}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Install in Cursor
              <span aria-hidden>→</span>
            </a>
            <p className="mt-3 text-[13px] text-warm-600 leading-relaxed">
              One click opens Cursor and installs the MCP server. No copy-paste, no config file.
            </p>
          </>
        );
      case "custom":
        return (
          <>
            <CopyableCommand command="https://api.openkt.ai/mcp" noPrefix />
            <p className="mt-3 text-[13px] text-warm-600 leading-relaxed">
              Drop this URL into whatever MCP configuration your harness uses — OpenCode, Auggie, Hermit, anything that speaks MCP over HTTP.
            </p>
          </>
        );
    }
  }
}
