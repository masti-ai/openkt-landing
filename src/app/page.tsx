import { readFileSync } from "node:fs";
import path from "node:path";
import CopyBlock from "@/components/CopyBlock";
import CopyableCommand from "@/components/CopyableCommand";
import Reveal from "@/components/Reveal";
import {
  DMG_URL,
  GITHUB_URL,
  INSTALL_NOTE_URL,
  LICENSE_URL,
  MAC_INSTALL_PROMPT,
  MCP_URL,
  PRODUCT_DOC_URL,
  SETUP_PROMPT_PATH,
  XATTR_COMMAND,
} from "@/lib/site";

/* -------------------------------------------------------------------------
 * Copy source: masti-ai/OpenKT-ai docs/product.md and README.md.
 * No metrics, testimonials or logos — every claim traces to product.md.
 * ------------------------------------------------------------------------- */

/** The paste-in setup prompt: everything below the first `---` of the file. */
function readSetupPrompt(): string {
  const raw = readFileSync(path.join(process.cwd(), "public", SETUP_PROMPT_PATH), "utf8");
  const parts = raw.split(/\n---\n/);
  return (parts.length > 1 ? parts.slice(1).join("\n---\n") : raw).trim();
}

const SERIF = { fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 } as const;

/* -------------------------------------------------------------------------
 * Building blocks
 * ------------------------------------------------------------------------- */

function BoxCorners({ tone = "warm" }: { tone?: "warm" | "dark" | "accent" }) {
  const color =
    tone === "dark" ? "text-warm-700" : tone === "accent" ? "text-accent/70" : "text-warm-400";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 z-10 ${color}`}>
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-current" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-current" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-current" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-current" />
    </div>
  );
}

function Kicker({ children, tone = "warm" }: { children: React.ReactNode; tone?: "warm" | "accent" }) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.2em] font-mono ${
        tone === "accent" ? "text-accent" : "text-warm-500"
      }`}
    >
      {children}
    </p>
  );
}

function frame(text: string, width = 67) {
  return `┌${"─".repeat(width)}┐\n│${text.padEnd(width)}│\n└${"─".repeat(width)}┘`;
}

const HERO_FRAME = frame("  OPEN  KT  ›  SHARED  CONTEXT  FOR  YOUR  TEAM'S  AI");

const HERO_ASCII = `
   ██████╗ ██████╗ ███████╗███╗   ██╗     ██╗  ██╗████████╗
  ██╔═══██╗██╔══██╗██╔════╝████╗  ██║     ██║ ██╔╝╚══██╔══╝
  ██║   ██║██████╔╝█████╗  ██╔██╗ ██║     █████╔╝    ██║
  ██║   ██║██╔═══╝ ██╔══╝  ██║╚██╗██║     ██╔═██╗    ██║
  ╚██████╔╝██║     ███████╗██║ ╚████║     ██║  ██╗   ██║
   ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═══╝     ╚═╝  ╚═╝   ╚═╝
            open  knowledge  transfer · over MCP
`;

// Every tool in, one shared store, recall out — filtered by access.
const FLOW_ASCII = `
          Claude ─┐                                       ┌─▶  your next session
          Cowork ─┤                                       │
         ChatGPT ─┼─▶  [  O P E N   K T  ]  ─── recall ───┼─▶  a teammate's AI
           Codex ─┤     save · attribute · grant          │
          Cursor ─┤                                       └─▶  only what they may see
  browser agents ─┘
`;

const TRY_FOR_MAC_CLASS =
  "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors shadow-sm focus-ring";
const OUTLINE_CLASS =
  "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md border border-warm-300 text-warm-700 text-sm font-medium hover:border-warm-500 hover:text-warm-900 transition-colors focus-ring";

/* -------------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------------- */

export default function LandingPage() {
  const setupPrompt = readSetupPrompt();
  return (
    <main className="bg-warm-50 text-warm-800 antialiased overflow-x-hidden">
      <OpenSourceBanner />
      <TopNav />
      <Hero />
      <Problem />
      <HowItWorks />
      <Setup setupPrompt={setupPrompt} />
      <Desktop />
      <OpenSource />
      <Footer />
    </main>
  );
}

/* -------------------------------------------------------------------------
 * Banner + nav
 * ------------------------------------------------------------------------- */

function OpenSourceBanner() {
  return (
    <a
      href={GITHUB_URL}
      className="group block w-full bg-warm-900 text-warm-50 hover:bg-warm-800 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center gap-3 text-[11px] sm:text-[12px] tracking-[0.18em] uppercase font-mono">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
        <span className="text-warm-200">OpenKT is open source</span>
        <span className="hidden sm:inline text-warm-500">·</span>
        <span className="hidden sm:inline text-warm-300">Apache-2.0</span>
        <span className="text-accent group-hover:translate-x-0.5 transition-transform">
          → GitHub
        </span>
      </div>
    </a>
  );
}

function TopNav() {
  return (
    <header className="border-b border-warm-200 bg-warm-50/85 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto h-14 px-4 sm:px-6 flex items-center gap-6">
        <a href="#top" className="text-[15px] tracking-tight text-warm-900" style={SERIF}>
          OpenKT
        </a>
        <nav className="hidden md:flex items-center gap-5 text-[13px] text-warm-500">
          <a href="#how" className="hover:text-warm-900 transition-colors">How it works</a>
          <a href="#setup" className="hover:text-warm-900 transition-colors">Setup</a>
          <a href="#desktop" className="hover:text-warm-900 transition-colors">Mac app</a>
          <a href="#open-source" className="hover:text-warm-900 transition-colors">Open source</a>
          <a href={GITHUB_URL} className="hover:text-warm-900 transition-colors">GitHub</a>
        </nav>
        <div className="flex-1" />
        <a
          href={DMG_URL}
          className="inline-flex items-center h-8 px-3 rounded-md bg-accent text-white text-[13px] font-medium hover:bg-accent/90 transition-colors shadow-sm whitespace-nowrap"
        >
          Try free for Mac
        </a>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------
 * Hero — the problem, then the promise. product.md › What it is / The problem
 * ------------------------------------------------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-warm-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] animate-drift"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "var(--accent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
        <Reveal i={0}>
          <pre className="hidden sm:block text-[10px] sm:text-[11px] leading-[1.2] font-mono text-warm-500 mb-4 select-none overflow-x-auto">
{HERO_FRAME}
          </pre>
        </Reveal>
        <Reveal i={1}>
          <pre className="hidden md:block text-[10px] leading-[1.15] text-accent/80 mb-8 overflow-x-auto whitespace-pre select-none animate-ascii-flicker">
{HERO_ASCII}
          </pre>
        </Reveal>
        <Reveal i={2}>
          <Kicker>Open-source shared context for teams</Kicker>
        </Reveal>
        <Reveal i={3}>
          <h1
            className="mt-3 text-4xl sm:text-6xl tracking-tight text-warm-900 max-w-5xl leading-[1.05] text-balance"
            style={SERIF}
          >
            Stop re-explaining your team to every AI.
            <br />
            <span className="text-warm-500">
              What one person&apos;s AI learns, the whole team&apos;s AI knows.
            </span>
            <span
              className="inline-block w-[0.55ch] h-[0.9em] ml-2 align-[-0.1em] bg-accent animate-blink"
              aria-hidden
            />
          </h1>
        </Reveal>
        <Reveal i={4}>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-warm-600">
            OpenKT saves decisions and context from every AI tool and meeting, and hands them to
            your teammates&apos; agents — only what each person may see.
          </p>
        </Reveal>
        <Reveal i={5}>
          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2 max-w-2xl text-[13px] text-warm-700">
            <li className="flex items-baseline gap-2">
              <span className="text-accent font-mono">▸</span>
              <span><span className="text-warm-900 font-medium">Any MCP tool</span> connects</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-accent font-mono">▸</span>
              <span><span className="text-warm-900 font-medium">Every item</span> attributed</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-accent font-mono">▸</span>
              <span><span className="text-warm-900 font-medium">Access</span> like a code host</span>
            </li>
          </ul>
        </Reveal>
        <Reveal i={6}>
          <div className="mt-8 flex flex-wrap items-start gap-3">
            <div className="flex flex-col">
              <a href={DMG_URL} className={TRY_FOR_MAC_CLASS}>
                Try free for Mac
              </a>
              <span className="mt-2 text-[11px] font-mono text-warm-500">
                Apple silicon · free · open source
              </span>
            </div>
            <a href="#setup" className={OUTLINE_CLASS}>
              Add to your AI tool <span aria-hidden>↓</span>
            </a>
            <a href={GITHUB_URL} className={OUTLINE_CLASS}>
              View on GitHub <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Problem band — product.md › The problem (the three losses)
 * ------------------------------------------------------------------------- */

const LOSSES: { n: string; title: string; body: string }[] = [
  { n: "01", title: "Between sessions", body: "Tomorrow's session starts cold." },
  {
    n: "02",
    title: "Between tools",
    body: "What you told your coding agent, your chat assistant never hears. Meetings reach no tool at all.",
  },
  {
    n: "03",
    title: "Between people",
    body: "A teammate's AI re-derives what yours learned last week, or gets it wrong.",
  },
];

function Problem() {
  return (
    <section
      id="problem"
      aria-label="The problem"
      className="border-b border-warm-200 bg-warm-100/50 py-14 sm:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="text-[15px] sm:text-base text-warm-700 max-w-3xl leading-relaxed">
            People spend a real part of their day explaining things to AI tools: how the team
            deploys, what the customer asked for, which approach was already tried and dropped.{" "}
            <span className="text-warm-900 font-medium">
              That explanation is thrown away three times over.
            </span>
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {LOSSES.map((l, i) => (
            <Reveal key={l.n} i={i + 1}>
              <div className="relative h-full bg-white p-5">
                <BoxCorners />
                <span className="font-mono text-[11px] tabular-nums text-warm-400">{l.n}</span>
                <h2 className="mt-1 text-base text-warm-900" style={SERIF}>
                  {l.title}
                </h2>
                <p className="mt-1.5 text-[13.5px] text-warm-700 leading-relaxed">{l.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * How it works — connect → save → recall. product.md › How it works, Principles
 * ------------------------------------------------------------------------- */

const STEPS: { n: string; title: string; bullets: string[] }[] = [
  {
    n: "01",
    title: "Connect your AI tools.",
    bullets: [
      "Claude, Cowork, ChatGPT, Codex, Cursor and browser agents connect through MCP.",
      "One URL. You sign in through your browser — never a token in a chat.",
    ],
  },
  {
    n: "02",
    title: "They save as you work.",
    bullets: [
      "Decisions, facts, how-tos and open questions become short statements that stand on their own.",
      "Each one is attributed to who said it and the session it came from.",
    ],
  },
  {
    n: "03",
    title: "Every teammate's AI recalls them.",
    bullets: [
      "At the start of a session, and whenever the model needs it.",
      "Only what that person is allowed to see — access is enforced inside the search, not after it.",
    ],
  },
];

function HowItWorks() {
  return (
    <section id="how" className="border-b border-warm-200 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <pre className="hidden md:block text-[10.5px] leading-tight text-warm-500 font-mono mb-10 select-none overflow-x-auto whitespace-pre">
{FLOW_ASCII}
          </pre>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <Reveal>
              <Kicker>How it works</Kicker>
            </Reveal>
            <Reveal i={1}>
              <h2 className="text-3xl sm:text-4xl tracking-tight text-warm-900" style={SERIF}>
                Connect → Save → Recall.
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="text-warm-700 text-[15px] leading-relaxed">
                Everything works with only the MCP server connected. The Mac app adds notes, voice
                and screenshots; hooks improve it where a tool has them. Neither is required.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-3 space-y-3">
            {STEPS.map((s, i) => {
              const dark = i === 2;
              return (
                <Reveal key={s.n} i={i} direction="right">
                  <div
                    className={`relative flex items-start gap-5 p-6 hover-lift ${
                      i === 0
                        ? "bg-white text-warm-900"
                        : i === 1
                          ? "bg-warm-200/55 text-warm-900"
                          : "bg-warm-900 text-warm-50"
                    }`}
                  >
                    <BoxCorners tone={dark ? "dark" : "warm"} />
                    <span
                      className={`font-mono text-[11px] tabular-nums mt-1 ${
                        dark ? "text-warm-400" : "text-warm-500"
                      }`}
                    >
                      {s.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base mb-2" style={SERIF}>
                        {s.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className={`flex items-baseline gap-2 text-[13px] leading-snug ${
                              dark ? "text-warm-200" : "text-warm-700"
                            }`}
                          >
                            <span className="font-mono shrink-0 text-accent">▸</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Setup — MCP URL, per-tool one-liners, the paste-in prompt.
 * Source: openkt-next plugin/SETUP_PROMPT.md (step 2 + step 3).
 * ------------------------------------------------------------------------- */

type Tool = {
  name: string;
  steps?: string;
  code?: { title: string; text: string };
  after?: string;
};

const TOOLS: Tool[] = [
  {
    name: "Claude · Cowork",
    steps:
      "In claude.ai, Claude Desktop or Cowork: Customize → Connectors → + → Add custom connector. Name it OpenKT, paste the URL, then Connect. On Team and Enterprise plans an owner adds it first under Organization settings → Connectors.",
  },
  {
    name: "Claude Code",
    code: { title: "terminal", text: `claude mcp add --transport http openkt ${MCP_URL}` },
    after: "Then run /mcp, choose openkt and sign in.",
  },
  {
    name: "ChatGPT",
    steps:
      "Turn on Developer mode in Settings, then create a connector: name OpenKT, MCP server URL as above, authentication OAuth. Add it to a chat from the tools menu. In a workspace, an admin may need to allow it first.",
  },
  {
    name: "Codex",
    code: { title: "~/.codex/config.toml", text: `[mcp_servers.openkt]\nurl = "${MCP_URL}"` },
    after: "Then run codex mcp login openkt.",
  },
  {
    name: "Cursor",
    code: { title: "~/.cursor/mcp.json · inside mcpServers", text: `"openkt": { "url": "${MCP_URL}" }` },
    after: "Then enable openkt in Cursor's MCP settings.",
  },
  {
    name: "Any other MCP client",
    steps:
      "Browser agents, VS Code, Gemini CLI and the rest: add a remote (Streamable HTTP) server named openkt with the URL above and OAuth. Leave client ID and secret empty.",
  },
];

function Setup({ setupPrompt }: { setupPrompt: string }) {
  return (
    <section id="setup" className="border-b border-warm-200 py-20 sm:py-24 bg-warm-100/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Kicker>Setup · one URL</Kicker>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mt-2 text-3xl sm:text-4xl tracking-tight text-warm-900 max-w-3xl" style={SERIF}>
            Add OpenKT to your AI tool.
          </h2>
        </Reveal>
        <Reveal i={2}>
          <p className="mt-3 text-[15px] text-warm-600 max-w-2xl leading-relaxed">
            OpenKT is a remote MCP server. Add this URL to your tool, then sign in through your
            browser. Running your own server? Use its <code className="font-mono text-[13px]">/mcp</code>{" "}
            URL instead.
          </p>
        </Reveal>
        <Reveal i={3}>
          <div className="mt-6 max-w-xl">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] font-mono text-warm-500">
              MCP server URL
            </p>
            <CopyableCommand command={MCP_URL} noPrefix label="Copy MCP URL" />
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOOLS.map((t, i) => (
            <Reveal key={t.name} i={i % 2}>
              <div className="relative h-full bg-white p-5 sm:p-6 min-w-0">
                <BoxCorners />
                <h3 className="text-base text-warm-900" style={SERIF}>
                  {t.name}
                </h3>
                {t.steps && (
                  <p className="mt-2 text-[13.5px] text-warm-700 leading-relaxed">{t.steps}</p>
                )}
                {t.code && (
                  <div className="mt-3">
                    <CopyBlock title={t.code.title} text={t.code.text} label={`Copy ${t.name} snippet`} />
                  </div>
                )}
                {t.after && <p className="mt-2 text-[13px] text-warm-600">{t.after}</p>}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div id="setup-prompt" className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
            <div className="lg:col-span-2">
              <Kicker tone="accent">Or let your AI do it</Kicker>
              <h3 className="mt-2 text-2xl tracking-tight text-warm-900" style={SERIF}>
                Paste this prompt into any AI tool.
              </h3>
              <p className="mt-3 text-[14px] text-warm-700 leading-relaxed">
                It connects OpenKT in the tool you are using, asks before it changes anything, and
                never needs your password in the chat. It ends with a round trip — save, recall,
                forget — so you know it works.
              </p>
              <p className="mt-3 text-[13px] text-warm-600">
                Also at{" "}
                <a
                  href={SETUP_PROMPT_PATH}
                  className="text-accent hover:text-accent-light underline underline-offset-2"
                >
                  openkt.ai{SETUP_PROMPT_PATH}
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-3 min-w-0">
              <CopyBlock title="setup prompt" text={setupPrompt} label="Copy setup prompt" scroll />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Desktop app for Mac — product.md › Feature set (Capture, Desktop app),
 * Privacy and trust. Install steps: apps/desktop/INSTALL-UNSIGNED.md.
 * ------------------------------------------------------------------------- */

const CAPTURE: [string, string][] = [
  ["Notes", "Write directly, into any space. A note is a session like any other."],
  ["Voice", "Hold a key and speak. Transcribed on your Mac; the audio never leaves it."],
  ["Screenshots", "A hotkey captures what is on screen, described by a local vision model."],
  ["Who sees what", "Spaces, grants and each tool's default — changeable on any one session."],
];

function Desktop() {
  return (
    <section
      id="desktop"
      className="relative border-b border-warm-200 py-20 sm:py-24 bg-warm-900 text-warm-100 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <Reveal>
              <Kicker tone="accent">Desktop app for Mac · preview</Kicker>
            </Reveal>
            <Reveal i={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl tracking-tight text-warm-50" style={SERIF}>
                Capture what never reaches a chat.
                <br />
                <span className="text-warm-400">Decide who sees it.</span>
              </h2>
            </Reveal>
            <Reveal i={2}>
              <ul className="mt-7 space-y-3">
                {CAPTURE.map(([title, body]) => (
                  <li key={title} className="flex items-baseline gap-3 text-[14px] leading-relaxed">
                    <span className="font-mono text-accent shrink-0">▸</span>
                    <span className="text-warm-200">
                      <span className="text-warm-50 font-medium">{title}.</span> {body}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal i={3}>
              <div className="mt-8">
                <a href={DMG_URL} className={TRY_FOR_MAC_CLASS}>
                  Download for Mac (Apple silicon)
                </a>
                <p className="mt-3 text-[12.5px] text-warm-400 leading-relaxed max-w-md">
                  Free and open source. Apple silicon, macOS 13.3 or later. On first launch it
                  downloads its local models (about 3–5 GB). The preview build is unsigned, so macOS
                  blocks it the first time —{" "}
                  <a
                    href={INSTALL_NOTE_URL}
                    className="text-warm-200 underline underline-offset-2 hover:text-warm-50"
                  >
                    how to open it
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right" i={2}>
            <figure>
              <div className="relative border border-warm-700 bg-white">
                <BoxCorners tone="accent" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/desktop-session.png"
                  alt="The OpenKT desktop app showing a meeting session: a summary, the decisions, actions and facts saved from it with who said each, and who can read it."
                  width={1280}
                  height={800}
                  className="block w-full h-auto"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 text-[11px] font-mono text-warm-500">
                The Mac app, shown with sample data.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <div id="install-mac" className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
            <div className="lg:col-span-2">
              <h3 className="text-xl sm:text-2xl tracking-tight text-warm-50" style={SERIF}>
                Let your AI install it.
              </h3>
              <p className="mt-3 text-[14px] text-warm-300 leading-relaxed">
                Give this to Claude Code, Codex, Cowork or any agent that can run commands on your
                Mac. It downloads the app, moves it to Applications, clears the quarantine flag on
                the unsigned build, and opens it.
              </p>
            </div>
            <div className="lg:col-span-3 min-w-0 space-y-4">
              <CopyBlock
                title="install prompt"
                text={MAC_INSTALL_PROMPT}
                label="Copy install prompt"
                tone="dark"
              />
              <div>
                <p className="mb-2 text-[12.5px] text-warm-300">
                  If macOS says OpenKT can&apos;t be opened, run this in Terminal:
                </p>
                <CopyableCommand command={XATTR_COMMAND} label="Copy xattr command" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Open source — product.md › Principles, Self-hosting, Privacy and trust
 * ------------------------------------------------------------------------- */

const OPEN: { title: string; body: string }[] = [
  {
    title: "Apache-2.0",
    body: "Server, Mac app and plugin, under one licence. No hosted-only features.",
  },
  {
    title: "Self-hostable",
    body: "One server and one Postgres. No graph database, no message broker. Use a hosted instance or run your own.",
  },
  {
    title: "Every model hot-swappable",
    body: "Any OpenAI-compatible endpoint, including one you run locally. Tool providers are plugins you can replace.",
  },
  {
    title: "Local-first capture",
    body: "Audio, images and first-pass extraction run on your machine. Only text and what you choose to keep sync to your team's server.",
  },
];

function OpenSource() {
  return (
    <section id="open-source" className="border-b border-warm-200 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Kicker>Open source</Kicker>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mt-2 text-3xl sm:text-4xl tracking-tight text-warm-900 max-w-3xl" style={SERIF}>
            Yours to run, read and change.
          </h2>
        </Reveal>
        <Reveal i={2}>
          <p className="mt-3 text-[15px] text-warm-600 max-w-2xl leading-relaxed">
            Your team&apos;s context lives on a server your team controls. OpenKT never trains
            models on it.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OPEN.map((o, i) => (
            <Reveal key={o.title} i={i}>
              <div className="relative h-full bg-white p-5 hover-lift">
                <BoxCorners />
                <h3 className="text-base text-warm-900" style={SERIF}>
                  {o.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-warm-700 leading-relaxed">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={GITHUB_URL} className={OUTLINE_CLASS}>
              View on GitHub <span aria-hidden>→</span>
            </a>
            <a href={PRODUCT_DOC_URL} className={OUTLINE_CLASS}>
              Read the product doc <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Footer
 * ------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center gap-3 justify-between text-xs text-warm-500">
        <div className="flex flex-wrap items-center gap-2">
          <span style={SERIF} className="text-warm-700">
            OpenKT AI
          </span>
          <span>·</span>
          <span>open-source shared context for teams</span>
          <span>·</span>
          <a href={LICENSE_URL} className="font-mono hover:text-warm-800 transition-colors">
            Apache-2.0
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href={GITHUB_URL} className="hover:text-warm-800 transition-colors">
            GitHub
          </a>
          <a href="#setup" className="hover:text-warm-800 transition-colors">
            Setup
          </a>
          <a href={DMG_URL} className="hover:text-warm-800 transition-colors">
            Mac app
          </a>
          <a href="mailto:prathamonchain@gmail.com?subject=OpenKT" className="hover:text-warm-800 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
