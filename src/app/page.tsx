import Link from "next/link";
import type { Metadata } from "next";
import InstallTabs from "@/components/InstallTabs";
import PilotContact from "@/components/PilotContact";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Open KT — the shared intelligence layer for AI-native teams",
  description:
    "Open KT (Open Knowledge Transfer) turns every agentic discovery into permanent team capital. Compounding context. One brain, every harness. Works with Claude Code, Codex, Cursor, and anything that speaks MCP.",
};

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

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-warm-500 font-mono">
      {children}
    </p>
  );
}

const HERO_FRAME = `┌─────────────────────────────────────────────────────────────────┐
│  OPEN  KT  ›  THE  SHARED  INTELLIGENCE  LAYER                  │
└─────────────────────────────────────────────────────────────────┘`;

const HERO_ASCII = `
   ██████╗ ██████╗ ███████╗███╗   ██╗     ██╗  ██╗████████╗
  ██╔═══██╗██╔══██╗██╔════╝████╗  ██║     ██║ ██╔╝╚══██╔══╝
  ██║   ██║██████╔╝█████╗  ██╔██╗ ██║     █████╔╝    ██║
  ██║   ██║██╔═══╝ ██╔══╝  ██║╚██╗██║     ██╔═██╗    ██║
  ╚██████╔╝██║     ███████╗██║ ╚████║     ██║  ██╗   ██║
   ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═══╝     ╚═╝  ╚═╝   ╚═╝
            open  knowledge  transfer · over MCP
`;

// Substrate diagram — every harness in, one shared brain out.
const SUBSTRATE_ASCII = `
   Claude Code ─┐                              ┌─▶  Memory
       Codex ───┤                              ├─▶  Skills
      Cursor ───┼──▶  [  O P E N   K T  ]  ───┼─▶  Workflows
    OpenCode ───┤         one shared brain     ├─▶  Receipts
       Aider ───┘                              └─▶  Audit trail
`;

// Compact at-a-glance Before / Open KT comparison — used on the bridge strip.
const COMPARE_ASCII = `
   ┌─  WITHOUT  ────────────────────┐     ┌─  WITH  OPEN  KT  ────────────────┐
   │  > read 40 files…              │     │  > recall STAGING_FIX_01          │
   │  > 47k tokens · 6m 14s         │     │  > 412 tokens · 5s                │
   │  > re-derived yesterday's fix  │     │  > inherited the team's last run  │
   └────────────────────────────────┘     └───────────────────────────────────┘
`;

// One-line "what arrives in the next session" mock — used on Solution intro.
const RECEIPT_ASCII = `
  [recall]  STAGING_FIX_01   scope:ORG   src:agent-A   replays:14   tok:328k saved
`;

// Thesis maxim — sits between Hero and Problem as a punctuation beat.
// Lifted from docs/product-thesis.md core maxim. Carries the
// commodity-vs-moat frame that re-shapes how a buyer reads the
// rest of the page.
const MAXIM_ASCII = `
   ┌──────────────────────────────────────────────────────────────────┐
   │   the harness is a commodity   ·   the intelligence is the moat  │
   └──────────────────────────────────────────────────────────────────┘
`;

// Token-tax receipt — a one-line ledger entry that visualises the
// "Stochastic Tax" the Problem section names. Lives just above the
// Problem bullets so the cost of starting cold has a face.
const TAX_ASCII = `
  [session·19:42·CLAUDE-CODE]  cold start  ·  read 47k tok  ·  spent  $4.71  ·  re-derived STAGING_FIX_01  ·  again
`;

/* -------------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <main className="bg-warm-50 text-warm-800 antialiased overflow-x-hidden">
      <PilotBanner />
      <TopNav />
      <Hero />
      <Maxim />
      <Problem />
      <Compare />
      <Solution />
      <HowItWorks />
      <SampleRun />
      <HarnessStrip />
      <Pilot />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* -------------------------------------------------------------------------
 * Pilot banner — slim, full-bleed, dismissible-feel link to #pilot.
 * ------------------------------------------------------------------------- */

function PilotBanner() {
  return (
    <a
      href="#pilot"
      className="group block w-full bg-warm-900 text-warm-50 hover:bg-warm-800 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center gap-3 text-[11px] sm:text-[12px] tracking-[0.18em] uppercase font-mono">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
        <span className="text-warm-200">Open KT is in private pilot</span>
        <span className="hidden sm:inline text-warm-500">·</span>
        <span className="hidden sm:inline text-warm-300">5–10 design partners</span>
        <span className="text-accent group-hover:translate-x-0.5 transition-transform">
          → Join the pilot
        </span>
      </div>
    </a>
  );
}

/* -------------------------------------------------------------------------
 * Nav
 * ------------------------------------------------------------------------- */

function TopNav() {
  return (
    <header className="border-b border-warm-200 bg-warm-50/85 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto h-14 px-4 sm:px-6 flex items-center gap-6">
        <span className="flex items-baseline gap-2">
          <span
            className="text-[15px] tracking-tight text-warm-900"
            style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
          >
            Open KT
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-warm-400 font-mono">
            by openkt
          </span>
        </span>
        <nav className="hidden md:flex items-center gap-5 text-[13px] text-warm-500">
          <a href="#problem" className="hover:text-warm-900 transition-colors">Problem</a>
          <a href="#compare" className="hover:text-warm-900 transition-colors">Compare</a>
          <a href="#solution" className="hover:text-warm-900 transition-colors">Solution</a>
          <a href="#how" className="hover:text-warm-900 transition-colors">How it works</a>
          <a href="#pilot" className="hover:text-warm-900 transition-colors">Pilot</a>
          <a href="#faq" className="hover:text-warm-900 transition-colors">FAQ</a>
        </nav>
        <div className="flex-1" />
        <Link
          href="#pilot"
          className="inline-flex items-center h-8 px-3 rounded-md bg-accent text-white text-[13px] font-medium hover:bg-accent/90 transition-colors shadow-sm"
        >
          Join the pilot →
        </Link>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------
 * Hero — heading preserved verbatim per user direction.
 * ------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-warm-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] animate-drift"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          color: "var(--accent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative">
        <Reveal i={0}>
          <pre className="hidden sm:block text-[10px] sm:text-[11px] leading-[1.2] font-mono text-warm-500 mb-4 select-none">
{HERO_FRAME}
          </pre>
        </Reveal>
        <Reveal i={1}>
          <pre className="hidden md:block text-[10px] leading-[1.15] text-accent/80 mb-8 overflow-x-auto whitespace-pre select-none animate-ascii-flicker">
{HERO_ASCII}
          </pre>
        </Reveal>
        <Reveal i={2}>
          <Kicker>The Shared Intelligence Layer</Kicker>
        </Reveal>
        <Reveal i={3}>
          <h1
            className="mt-3 text-4xl sm:text-6xl font-medium tracking-tight text-warm-900 max-w-4xl leading-[1.05]"
            style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
          >
            Your team's AI shouldn't
            <br />
            <span className="text-warm-500">start from zero.</span>
            <span
              className="inline-block w-[0.55ch] h-[0.9em] ml-2 align-[-0.1em] bg-accent animate-blink"
              aria-hidden
            />
          </h1>
        </Reveal>
        <Reveal i={4}>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-warm-600">
            One shared brain for every coding agent on your team. They inherit yesterday's
            decisions, share today's discoveries, and skip the 47k-token repo scan every
            morning.
          </p>
        </Reveal>
        <Reveal i={5}>
          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2 max-w-2xl text-[13px] text-warm-700">
            <li className="flex items-baseline gap-2">
              <span className="text-accent font-mono">▸</span>
              <span><span className="text-warm-900 font-medium">One brain</span> across harnesses</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-accent font-mono">▸</span>
              <span><span className="text-warm-900 font-medium">Day-one ready</span> agents</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-accent font-mono">▸</span>
              <span><span className="text-warm-900 font-medium">~99%</span> less re-exploration</span>
            </li>
          </ul>
        </Reveal>
        <Reveal i={6}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#pilot"
              className="inline-flex items-center h-11 px-5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all shadow-sm hover:scale-[1.02] focus-ring"
            >
              Join the pilot
            </Link>
            <a
              href="#sample-run"
              className="inline-flex items-center h-11 px-5 rounded-md border border-warm-300 text-warm-700 text-sm font-medium hover:border-warm-500 hover:text-warm-900 transition-colors focus-ring"
            >
              Watch a sample run →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Maxim — slim full-bleed band that lands the thesis line between Hero
 * and Problem. Carries the "commodity vs moat" frame so the reader
 * walks into Problem already on our terms.
 * ------------------------------------------------------------------------- */

function Maxim() {
  return (
    <section
      aria-label="Open KT thesis"
      className="border-b border-warm-200 bg-warm-100/50 py-10 sm:py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <pre className="hidden md:block text-[10.5px] sm:text-[11px] leading-tight font-mono text-warm-500 select-none mb-6 overflow-x-auto whitespace-pre">
{MAXIM_ASCII}
          </pre>
        </Reveal>
        <Reveal i={1}>
          <p className="text-center text-[15px] sm:text-base text-warm-700 max-w-2xl mx-auto leading-relaxed">
            Every team will swap Cursor for Claude Code for Codex three times this year.
            What stays — what compounds — is what the team has{" "}
            <span className="text-warm-900 font-medium">already learned</span>. That layer
            is the product.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Tweet card — social proof, used inside the Problem section.
 * ------------------------------------------------------------------------- */

function TweetCard({
  handle,
  name,
  role,
  url,
  body,
}: {
  handle: string;
  name: string;
  role: string;
  url: string;
  body: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative bg-white p-5 hover-lift focus-ring"
    >
      <BoxCorners />
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-[11px] font-medium text-accent uppercase">
          {name.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-warm-900 leading-tight">{name}</div>
          <div className="text-[11px] text-warm-500 leading-tight">
            {handle} · {role}
          </div>
        </div>
        <div className="flex-1" />
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="text-warm-400"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <p className="text-[13px] text-warm-700 leading-relaxed">{body}</p>
    </a>
  );
}

/* -------------------------------------------------------------------------
 * Problem (PAS) — Stochastic Tax framing without the "amnesia" word.
 * ------------------------------------------------------------------------- */

function Problem() {
  return (
    <section id="problem" className="border-b border-warm-200 py-20 sm:py-24 bg-warm-100/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3 space-y-6">
            <Reveal>
              <Kicker>The cost of starting from zero</Kicker>
            </Reveal>
            <Reveal i={1}>
              <h2
                className="text-3xl sm:text-4xl tracking-tight text-warm-900 max-w-3xl"
                style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
              >
                Your agents pay rent every morning,
                <br />
                <span className="text-warm-500">on knowledge they already had.</span>
              </h2>
            </Reveal>

            <Reveal i={2}>
              <pre className="hidden md:block text-[10.5px] leading-tight font-mono text-warm-500 select-none mt-4 overflow-x-auto whitespace-pre">
{TAX_ASCII}
              </pre>
            </Reveal>

            <Reveal i={2}>
              <ul className="space-y-3 max-w-xl">
                <li className="flex items-baseline gap-3 text-[14.5px] text-warm-800">
                  <span className="font-mono text-accent shrink-0">▸</span>
                  <span>
                    A new chat opens. The agent re-scans 40 files to find a fix
                    your teammate's agent shipped yesterday.
                  </span>
                </li>
                <li className="flex items-baseline gap-3 text-[14.5px] text-warm-800">
                  <span className="font-mono text-accent shrink-0">▸</span>
                  <span>
                    The keep-alive setting, the auth regex, the deploy
                    incantation — none of it survives the chat window.
                  </span>
                </li>
                <li className="flex items-baseline gap-3 text-[14.5px] text-warm-800">
                  <span className="font-mono text-accent shrink-0">▸</span>
                  <span>
                    Switch from Claude Code to Codex next quarter — the rest
                    goes with it.
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal i={3}>
              <p className="text-[13px] text-warm-500 pt-2">
                The harness is rented. The intelligence should be owned.
              </p>
            </Reveal>
          </div>

          <Reveal direction="right" i={2} className="lg:col-span-2">
            <div className="relative bg-white p-7">
              <BoxCorners />
              <div className="text-[10px] uppercase tracking-[0.2em] text-warm-500 font-mono mb-5">
                What every session costs you
              </div>
              <ul className="space-y-4">
                {[
                  ["~47k", "tokens", "spent re-exploring per session"],
                  ["3×", "/ year", "harness migrations wipe your context"],
                  ["80%", "lost", "of learnings die in chat windows"],
                  ["0%", "by default", "of it compounds for the team"],
                ].map(([v, unit, l]) => (
                  <li key={l} className="flex items-baseline gap-4">
                    <span className="flex items-baseline gap-1.5 w-24 shrink-0">
                      <span className="font-mono tabular-nums text-warm-900 text-2xl font-medium">
                        {v}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-warm-500">
                        {unit}
                      </span>
                    </span>
                    <span className="text-[13px] text-warm-700 leading-snug">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Tweet pair — industry voices echoing the problem framing. */}
        <div className="mt-12 pt-10 border-t border-warm-200/80">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.22em] text-warm-500 font-mono mb-5">
              People who saw this coming
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Reveal i={1} direction="left">
              <TweetCard
                handle="@garrytan"
                name="Garry Tan"
                role="CEO, Y Combinator"
                url="https://x.com/garrytan/status/2043198780800197025"
                body="Skills and memory are the real moat. The harness is a commodity — you'll switch yours three times this year. What survives is the knowledge and workflow your agents carry between runs."
              />
            </Reveal>
            <Reveal i={2} direction="right">
              <TweetCard
                handle="@theo"
                name="Theo"
                role="t3.gg"
                url="https://x.com/theo/status/2043819374889554261"
                body="Thin harness, fat skills. Anyone still shipping a fat harness in 2026 is building on sand — the agents that win are the ones that share context, not the ones that re-learn it every session."
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Compare — ICY-style at-a-glance row. Side-by-side rows, one per dimension.
 * Sits between Problem and Solution as a fast scannable transition.
 * ------------------------------------------------------------------------- */

const COMPARE_ROWS: { label: string; before: string; after: string }[] = [
  { label: "Per session",          before: "47k tokens re-explored",   after: "300-token recall" },
  { label: "First useful action",  before: "~6 minutes",                after: "~5 seconds" },
  { label: "Token bill / month",   before: "Scales linearly with sessions", after: "Sub-linear — recall caps growth" },
  { label: "Onboarding a new agent", before: "Hours of context-loading", after: "Inherits the team brief on turn 1" },
  { label: "When you switch harnesses", before: "Context dies with it", after: "Memory + skills travel" },
  { label: "Team capital",         before: "Dies in chat windows",     after: "Compounds on disk" },
  { label: "Audit trail",          before: "None — try git blame",     after: "Receipt per recall" },
];

function Compare() {
  return (
    <section
      id="compare"
      className="relative border-b border-warm-200 py-16 sm:py-20 bg-warm-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Kicker>At a glance</Kicker>
        </Reveal>
        <Reveal i={1}>
          <h2
            className="mt-2 text-2xl sm:text-3xl tracking-tight text-warm-900 max-w-3xl"
            style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
          >
            Same prompt. Different bill.
          </h2>
        </Reveal>

        <Reveal i={2}>
          <pre className="hidden md:block mt-8 text-[10.5px] leading-tight text-warm-500 font-mono overflow-x-auto whitespace-pre select-none">
{COMPARE_ASCII}
          </pre>
        </Reveal>

        <Reveal i={3}>
          <div className="mt-8 relative bg-white">
            <BoxCorners />
            {/* header row */}
            <div className="grid grid-cols-3 px-5 sm:px-7 py-3 border-b border-warm-200 text-[10px] uppercase tracking-[0.2em] font-mono text-warm-500">
              <span></span>
              <span>Without</span>
              <span className="text-accent">With Open KT</span>
            </div>
            <ul>
              {COMPARE_ROWS.map((r, i) => (
                <li
                  key={r.label}
                  className={`grid grid-cols-3 px-5 sm:px-7 py-4 items-baseline ${
                    i < COMPARE_ROWS.length - 1 ? "border-b border-warm-200/70" : ""
                  }`}
                >
                  <span className="text-[12px] uppercase tracking-[0.16em] font-mono text-warm-500 pr-3">
                    {r.label}
                  </span>
                  <span className="flex items-baseline gap-2 text-[13.5px] text-warm-700 pr-3">
                    <span className="font-mono text-warm-400 shrink-0">×</span>
                    <span>{r.before}</span>
                  </span>
                  <span className="flex items-baseline gap-2 text-[13.5px] text-warm-900 font-medium">
                    <span className="font-mono text-accent shrink-0">✓</span>
                    <span>{r.after}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Solution — three OneCards (Memory / Skills / Workflows). Replaces both
 * the old "TheLayer" and "UseCases" sections — single source of truth.
 * ------------------------------------------------------------------------- */

type Example = { id: string; insight: string; payoff: string };
type OneCard = {
  n: string;
  layer: string;
  title: string;
  bullets: string[];
  examples: Example[];
};

const ONE_CARDS: OneCard[] = [
  {
    n: "01",
    layer: "Memory",
    title: "Discoveries that compound.",
    bullets: [
      "One agent finds the answer; every agent after recalls it.",
      "300-token lookup, not a 47k-token rescan.",
      "Scoped: personal → project → org. Promotion is reviewed.",
    ],
    examples: [
      {
        id: "STAGING_FIX_01",
        insight: "Postgres drops staging connections without a 60s keep-alive.",
        payoff: "14 replays this week · 328k tokens saved · 0 reopens",
      },
      {
        id: "AUTH_REGEX_NOTE",
        insight: "JWT subject claim is base64url, not base64. Strip padding.",
        payoff: "9 replays · ended a 3-day cross-team bug loop",
      },
      {
        id: "DEPLOY_INCANT",
        insight: "Cloud Run revision must pin --concurrency=8 for our queue worker.",
        payoff: "6 replays · 0 outages in the 8 weeks since promoted",
      },
    ],
  },
  {
    n: "02",
    layer: "Skills",
    title: "Procedures every agent inherits.",
    bullets: [
      "Authored once by your lead — every harness on the team ships day-one ready.",
      "L1 metadata loads at startup; L2 expertise pulls only on invoke.",
      "Versioned, scoped, replaceable — never a copy-paste prompt.",
    ],
    examples: [
      {
        id: "TAILWIND_STYLE_COP",
        insight: "Audits component naming, contrast, focus, prefers-reduced-motion.",
        payoff: "Run by every UI agent · 0 contrast regressions in 6 weeks",
      },
      {
        id: "PR_DESCRIBE",
        insight: "Writes PR title + summary + test plan in your team's house style.",
        payoff: "44 PRs this month · review-ready on first push",
      },
      {
        id: "MIGRATION_REVIEW",
        insight: "Flags non-backwards-compatible schema diffs before they ship.",
        payoff: "Caught 3 silent breakages last quarter · zero post-merge rollbacks",
      },
    ],
  },
  {
    n: "03",
    layer: "Workflows",
    title: "Routine work at code speed.",
    bullets: [
      "Stable patterns get promoted to deterministic ADK pipelines.",
      "The LLM shapes intent — the pipeline runs the mechanical part.",
      "Stop paying LLM rates for sequences that never vary.",
    ],
    examples: [
      {
        id: "AUTO_RELEASE_SWEEP",
        insight: "Bumps versions, regenerates docs, opens release PR, posts changelog.",
        payoff: "60-min ritual → 90s deterministic run · runs every Friday",
      },
      {
        id: "ADK_DEPLOY",
        insight: "Builds, runs migrations gated by health checks, promotes if green.",
        payoff: "8 deploys/week · 0 prod rollbacks since adopted",
      },
      {
        id: "INCIDENT_TRIAGE",
        insight: "Pulls logs, paginates Sentry, drafts the incident doc skeleton.",
        payoff: "First-pass postmortem in 90s · saves the on-call 30 min",
      },
    ],
  },
];

function Solution() {
  return (
    <section id="solution" className="border-b border-warm-200 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Kicker>Solution · Three layers</Kicker>
        </Reveal>
        <Reveal i={1}>
          <h2
            className="mt-2 text-3xl sm:text-4xl tracking-tight text-warm-900 max-w-3xl"
            style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
          >
            Three layers of compounding intelligence.
          </h2>
        </Reveal>
        <Reveal i={2}>
          <p className="mt-3 text-warm-600 leading-relaxed max-w-2xl">
            Throwaway chat becomes durable team capital — searchable, scope-aware, traceable to the session that earned it.
          </p>
        </Reveal>
        <Reveal i={3}>
          <pre className="hidden md:block mt-6 text-[10.5px] leading-tight text-warm-500 font-mono select-none overflow-x-auto whitespace-pre">
{RECEIPT_ASCII}
          </pre>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {ONE_CARDS.map((c, i) => (
            <Reveal key={c.n} i={3 + i} as="article">
              <article className="one-card p-6 sm:p-7 flex flex-col h-full">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-[11px] tabular-nums text-warm-500">
                    [ {c.n} ]
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-accent">
                    {c.layer}
                  </span>
                </div>
                <h3
                  className="text-lg font-medium text-warm-900 mb-3"
                  style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
                >
                  {c.title}
                </h3>
                <ul className="space-y-1.5 mb-5">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-baseline gap-2 text-[13px] text-warm-700 leading-snug"
                    >
                      <span className="font-mono text-accent shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-warm-200/80">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-warm-500 mb-3">
                    On disk · examples
                  </div>
                  <ul className="space-y-3">
                    {c.examples.map((ex) => (
                      <li key={ex.id}>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="inline-block w-1 h-1 rounded-full bg-accent/70" />
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-warm-500">
                            {ex.id}
                          </span>
                        </div>
                        <p className="text-[12.5px] text-warm-800 leading-snug">{ex.insight}</p>
                        <p className="mt-0.5 text-[10.5px] text-warm-500 leading-snug font-mono">
                          ▸ {ex.payoff}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * How It Works — Observe → Promote → Inherit
 * ------------------------------------------------------------------------- */

const STEPS: { n: string; title: string; bullets: string[] }[] = [
  {
    n: "01",
    title: "Observe.",
    bullets: [
      "Watches every session — recalls, skill runs, closed tasks.",
      "Mines the patterns your team keeps repeating.",
    ],
  },
  {
    n: "02",
    title: "Promote.",
    bullets: [
      "Useful personal memory → project memory.",
      "Repeated prompt sequence → candidate skill.",
      "Stable skill → deterministic workflow.",
      "Reviewed before it escalates. Every promotion leaves a receipt.",
    ],
  },
  {
    n: "03",
    title: "Inherit.",
    bullets: [
      "Next session opens with the relevant org context attached.",
      "Picks up where a teammate's agent left off.",
      "Routine sequences offload to the pipeline. Each loop costs less.",
    ],
  },
];

function HowItWorks() {
  return (
    <section id="how" className="border-b border-warm-200 py-20 sm:py-24 bg-warm-100/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <pre className="hidden md:block text-[10.5px] leading-tight text-warm-500 font-mono mb-10 select-none overflow-x-auto whitespace-pre">
{SUBSTRATE_ASCII}
          </pre>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <Reveal>
              <Kicker>How it works</Kicker>
            </Reveal>
            <Reveal i={1}>
              <h2
                className="text-3xl sm:text-4xl tracking-tight text-warm-900"
                style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
              >
                Observe → Promote → Inherit.
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="text-warm-700 text-[15px] leading-relaxed">
                One agent's discovery becomes an org-wide capability. Every transition leaves a receipt. Every receipt seeds the next observation.
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
                      <h3
                        className="text-base font-medium mb-2"
                        style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
                      >
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
                            <span
                              className={`font-mono shrink-0 ${
                                dark ? "text-accent" : "text-accent"
                              }`}
                            >
                              ▸
                            </span>
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
 * Sample Run — split-screen terminal: Naive vs Open KT.
 * Lines stagger in via .term-line (CSS) when the terminal becomes visible.
 * ------------------------------------------------------------------------- */

type RunLineKind = "user" | "agent" | "openkt" | "meta" | "ok" | "warn";

const NAIVE_LINES: ReadonlyArray<readonly [RunLineKind, string]> = [
  ["user", "Prepare staging for the new deploy."],
  ["agent", "Reading 40 files to find staging config…"],
  ["meta", "↳ tokens consumed: 47,184"],
  ["agent", "Trying connection — drops after 38s."],
  ["agent", "Re-checking middleware…"],
  ["meta", "↳ tokens consumed: 71,902"],
  ["warn", "Re-deriving keep-alive setting from scratch."],
  ["agent", "Done. ~6 minutes."],
];

const OPENKT_LINES: ReadonlyArray<readonly [RunLineKind, string]> = [
  ["user", "Prepare staging for the new deploy."],
  ["openkt", "[ injecting  STAGING_FIX_01 · scope: ORG ]"],
  ["agent", "Applying keep-alive (60s) from prior session."],
  ["agent", "Validating connection — stable."],
  ["meta", "↳ tokens consumed: 412"],
  ["ok", "Pre-briefed. 0 redundant exploration."],
  ["agent", "Done. ~5 seconds."],
];

function SampleRun() {
  return (
    <section
      id="sample-run"
      className="relative border-b border-warm-200 py-20 sm:py-24 bg-warm-900 text-warm-100 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-accent/10 to-transparent terminal-scan"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-mono">
            Sample run · the gift
          </p>
        </Reveal>
        <Reveal i={1}>
          <h2
            className="mt-2 text-3xl sm:text-4xl tracking-tight text-warm-50 max-w-3xl"
            style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
          >
            One discovery. Free for every agent that follows.
          </h2>
        </Reveal>
        <Reveal i={2}>
          <p className="mt-3 text-warm-300 leading-relaxed max-w-2xl">
            Same prompt, two agents. The naïve one re-explores from zero; the Open KT agent inherits the team's last session. Watch the cost.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal direction="left" i={2}>
            <Terminal
              chrome="naive-agent · no Open KT"
              kicker="Without Open KT"
              tone="naive"
              lines={NAIVE_LINES}
              footer={[
                ["meta", "↳ session cost: 71,902 tokens · 6m 14s"],
                ["meta", "↳ outcome: re-discovered yesterday's fix"],
              ]}
            />
          </Reveal>
          <Reveal direction="right" i={3}>
            <Terminal
              chrome="agent · openkt-injected"
              kicker="With Open KT"
              tone="openkt"
              lines={OPENKT_LINES}
              footer={[
                ["meta", "↳ session cost: 412 tokens · 5s"],
                ["meta", "↳ outcome: inherited STAGING_FIX_01 · 99.4% saved"],
              ]}
            />
          </Reveal>
        </div>

        <Reveal i={4}>
          <div className="mt-10 max-w-3xl">
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 text-warm-200">
              <div className="flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-3xl text-warm-50 font-medium">
                  −99.4%
                </span>
                <span className="text-[12px] text-warm-400 font-mono uppercase tracking-[0.18em]">
                  cost
                </span>
              </div>
              <span className="hidden sm:inline text-warm-700">·</span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-3xl text-warm-50 font-medium">
                  6m → 5s
                </span>
                <span className="text-[12px] text-warm-400 font-mono uppercase tracking-[0.18em]">
                  wall clock
                </span>
              </div>
              <span className="hidden sm:inline text-warm-700">·</span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-3xl text-warm-50 font-medium">
                  1
                </span>
                <span className="text-[12px] text-warm-400 font-mono uppercase tracking-[0.18em]">
                  receipt on disk
                </span>
              </div>
            </div>
            <p className="mt-4 text-[13.5px] text-warm-300 leading-relaxed">
              Same prompt, two agents. The naïve one rebuilds context from scratch. The Open KT one inherits yesterday's answer and gets to work.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Terminal({
  chrome,
  kicker,
  tone,
  lines,
  footer,
}: {
  chrome: string;
  kicker: string;
  tone: "naive" | "openkt";
  lines: ReadonlyArray<readonly [RunLineKind, string]>;
  footer: ReadonlyArray<readonly [RunLineKind, string]>;
}) {
  const accentTone = tone === "openkt" ? "text-accent" : "text-warm-500";
  return (
    <div className="relative bg-warm-800/70 p-0 overflow-hidden h-full flex flex-col">
      <BoxCorners tone={tone === "openkt" ? "accent" : "dark"} />
      {/* terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-warm-700/70 bg-warm-900/55">
        <span className="inline-block w-2 h-2 rounded-full bg-warm-700" />
        <span className="inline-block w-2 h-2 rounded-full bg-warm-700" />
        <span className="inline-block w-2 h-2 rounded-full bg-warm-700" />
        <span className="ml-3 font-mono text-[10px] tracking-[0.18em] uppercase text-warm-500">
          {chrome}
        </span>
        <span className="flex-1" />
        <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${accentTone}`}>
          {kicker}
        </span>
      </div>
      <div className="px-5 py-5 font-mono text-[12px] leading-relaxed flex-1">
        {lines.map(([kind, text], i) => (
          <RunLine key={i} kind={kind} text={text} index={i} />
        ))}
      </div>
      <div className="px-5 py-3 border-t border-warm-700/70 space-y-1">
        {footer.map(([kind, text], i) => (
          <RunLine key={`f-${i}`} kind={kind} text={text} index={i + lines.length} />
        ))}
      </div>
    </div>
  );
}

function RunLine({ kind, text, index }: { kind: RunLineKind; text: string; index: number }) {
  const styles: Record<RunLineKind, { tag: string; tagClass: string; lineClass: string }> = {
    user:   { tag: "user",  tagClass: "text-warm-500",     lineClass: "text-warm-100" },
    agent:  { tag: "agent", tagClass: "text-warm-500",     lineClass: "text-warm-200" },
    openkt: { tag: "opnkt", tagClass: "text-accent/80",    lineClass: "text-accent" },
    meta:   { tag: "     ", tagClass: "text-warm-600",     lineClass: "text-warm-500" },
    ok:     { tag: "  ok ", tagClass: "text-emerald-300/80", lineClass: "text-emerald-200/90" },
    warn:   { tag: " warn", tagClass: "text-amber-300/80", lineClass: "text-amber-200/90" },
  };
  const s = styles[kind];
  return (
    <div
      className="term-line flex gap-2.5"
      style={{ ["--i" as string]: index } as React.CSSProperties}
    >
      <span className={`select-none ${s.tagClass}`}>{s.tag}</span>
      <span className={s.lineClass}>{text}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Harness strip — JUST the marquee. No grid, no card walls.
 * Lives between the Sample Run and Pricing as a slim trust band.
 * ------------------------------------------------------------------------- */

function HarnessStrip() {
  const harnesses = [
    "Claude Code", "Claude Desktop", "Codex", "Cursor", "OpenCode",
    "Aider", "Hermes", "Auggie", "OpenClaw", "Any MCP",
  ];
  return (
    <section id="harnesses" className="border-b border-warm-200 py-12 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-[11px] uppercase tracking-[0.22em] font-mono text-warm-500">
            One install · every harness · one shared brain
          </p>
        </Reveal>
        <Reveal i={1}>
          <div className="mt-5 overflow-hidden border-y border-warm-200 py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee-track flex items-center gap-12 whitespace-nowrap text-[12px] uppercase tracking-[0.22em] font-mono text-warm-600 w-max">
              {[...harnesses, ...harnesses, ...harnesses].map((h, i) => (
                <span key={`${h}-${i}`} className="flex items-center gap-2.5">
                  <span className="inline-block w-1 h-1 rounded-full bg-accent/70" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal i={2}>
          <div id="install" className="mt-12">
            <div className="mb-6">
              <Kicker>Install · MCP over HTTP</Kicker>
              <h2
                className="mt-2 text-2xl sm:text-3xl tracking-tight text-warm-900 max-w-2xl"
                style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
              >
                One line per harness. Same shared brain.
              </h2>
            </div>
            <InstallTabs />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Pilot — replaces Pricing. Two-column: structured benefits + contact form.
 * ------------------------------------------------------------------------- */

const PILOT_BENEFITS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Direct line to the founders",
    body: "Slack or Telegram, same week onboarding. No support tickets.",
  },
  {
    n: "02",
    title: "We ship your first skill with you",
    body: "Pair on a custom skill or workflow that fits your team's stack.",
  },
  {
    n: "03",
    title: "Your data, your region",
    body: "Self-hosted, region-pinned, or on our infra — your call.",
  },
  {
    n: "04",
    title: "Lifetime price-lock",
    body: "What you sign up for is what you pay. Forever, no seat creep.",
  },
];

function Pilot() {
  return (
    <section id="pilot" className="border-b border-warm-200 py-20 sm:py-24 bg-warm-100/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Kicker>Pilot · Limited spots</Kicker>
        </Reveal>
        <Reveal i={1}>
          <h2
            className="mt-2 text-3xl sm:text-4xl tracking-tight text-warm-900 max-w-2xl"
            style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
          >
            Starting private pilots.
            <br />
            <span className="text-warm-500">Be one of the first ten.</span>
          </h2>
        </Reveal>
        <Reveal i={2}>
          <p className="mt-3 text-warm-600 max-w-xl">
            We're picking 5–10 design partners — teams who feel the cost of starting from zero and ship fast. Same-week response.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <Reveal direction="left" i={3} className="lg:col-span-2">
            <div className="space-y-1">
              <div className="mb-6 text-[10px] uppercase tracking-[0.22em] font-mono text-warm-500">
                What's included
              </div>
              <ul className="space-y-5">
                {PILOT_BENEFITS.map((b) => (
                  <li key={b.n} className="flex gap-4">
                    <span className="font-mono text-[11px] tabular-nums text-warm-400 mt-1 shrink-0">
                      {b.n}
                    </span>
                    <div>
                      <div className="text-[14.5px] font-medium text-warm-900">{b.title}</div>
                      <div className="mt-0.5 text-[13px] text-warm-700 leading-relaxed">
                        {b.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="right" i={4} className="lg:col-span-3">
            <PilotContact />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * FAQ — folds in the old Scope + Governance content as objection handling.
 * Native <details> for progressive disclosure (no JS needed).
 * ------------------------------------------------------------------------- */

const FAQS: { q: string; a: string }[] = [
  {
    q: "Where does the data live? Is anything sent to a third party?",
    a: "Your data lives where you choose — self-hosted, region-pinned, or on our infra. Nothing is sent to a third party unless you wire it. You own the store; we own the pipe.",
  },
  {
    q: "How is this different from putting context in CLAUDE.md / cursor rules?",
    a: "Static files are write-only. They don't learn from sessions, don't scope to projects, and don't compound across agents. Open KT is a living system — it observes, promotes, and inherits.",
  },
  {
    q: "What if I switch harnesses next quarter?",
    a: "Your intelligence layer stays. Switch from Claude Code to Codex to Cursor — the memory, skills, and workflows travel with you. The harness changes; the brain doesn't.",
  },
  {
    q: "Who can see what? How does scoping work?",
    a: "Three scopes: personal, project, org. Memory written in one scope only surfaces in that scope. Promotion across scopes is reviewed, not automatic.",
  },
  {
    q: "Is there an audit trail for what the agent did?",
    a: "Yes. Every recall and every promotion writes a receipt — which agent, which session, which scope. Replayable, exportable, query-able.",
  },
  {
    q: "What happens to memories that are wrong or outdated?",
    a: "Memories decay. Low-use patterns fade. Wrong patterns get flagged and retired. The system cleans itself; you don't have to.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="border-b border-warm-200 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Reveal>
              <Kicker>Frequently asked</Kicker>
            </Reveal>
            <Reveal i={1}>
              <h2
                className="mt-2 text-3xl sm:text-4xl tracking-tight text-warm-900"
                style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
              >
                The objections every CTO has, answered.
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="mt-3 text-warm-600 leading-relaxed">
                Six things people ask before they install. If something else is on your mind,{" "}
                <a
                  href="mailto:prathamonchain@gmail.com?subject=Open%20KT%20question"
                  className="text-accent hover:text-accent-light underline underline-offset-2"
                >
                  write us
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <ul className="border-t border-warm-200">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} i={i} as="li">
                  <details className="group border-b border-warm-200 py-5">
                    <summary className="flex items-baseline justify-between cursor-pointer list-none focus-ring">
                      <span className="flex items-baseline gap-3 pr-4">
                        <span className="font-mono text-[11px] tabular-nums text-warm-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] sm:text-base text-warm-900 font-medium">
                          {f.q}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="font-mono text-warm-500 group-open:rotate-45 transition-transform duration-300"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 ml-9 text-[13.5px] text-warm-700 leading-relaxed max-w-prose">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Final CTA
 * ------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="border-b border-warm-200 py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="relative bg-warm-900 p-10 sm:p-14 text-warm-50 overflow-hidden">
            <BoxCorners tone="accent" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-accent/15 to-transparent terminal-scan"
            />
            <p className="text-[11px] uppercase tracking-[0.2em] font-mono text-accent">
              Ready to compound?
            </p>
            <h2
              className="mt-4 text-3xl sm:text-4xl tracking-tight max-w-3xl"
              style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
            >
              Your team already has context.
              <br />
              <span className="text-warm-400">Your agents should too.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-warm-200">
              5–10 design partners. Same-week response. Lifetime price-lock.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#pilot"
                className="inline-flex items-center h-11 px-5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors shadow-sm focus-ring"
              >
                Join the pilot
              </Link>
              <a
                href="mailto:prathamonchain@gmail.com?subject=Open%20KT"
                className="inline-flex items-center h-11 px-5 rounded-md border border-warm-200/40 text-warm-50 text-sm font-medium hover:bg-warm-800/40 transition-colors focus-ring"
              >
                Email us →
              </a>
            </div>
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
        <div className="flex items-center gap-2">
          <span
            style={{ fontFamily: "'Bitter', Georgia, serif", fontWeight: 500 }}
            className="text-warm-700"
          >
            Open KT
          </span>
          <span>·</span>
          <span className="font-mono text-warm-500">by openkt</span>
          <span>·</span>
          <span>the shared intelligence layer</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/masti-ai/openkt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-warm-800 transition-colors"
          >
            GitHub
          </a>
          <a href="mailto:prathamonchain@gmail.com" className="hover:text-warm-800 transition-colors">
            Contact
          </a>
          <a
            href="https://app.openkt.ai/memories"
            className="hover:text-warm-800 transition-colors"
          >
            Open app
          </a>
        </div>
      </div>
    </footer>
  );
}
