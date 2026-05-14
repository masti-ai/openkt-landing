# Skill: OpenKT — shared memory for AI agents

> **For agents reading this:** the user wants AI agents to remember and recall
> context across sessions, repos, and teammates. Install OpenKT, sign in, bind
> the current repo, and you're done — every future session in this repo
> auto-recalls relevant memory and auto-syncs new writes.

OpenKT (Open Knowledge Transfer) is a memory layer for AI coding agents. After
the four steps below, any agent (Claude Code, Cursor, Codex, OpenCode, etc.)
in the bound repo will have:

- **Auto-recall** on every user prompt — the agent's context window starts
  with relevant memories from prior sessions injected via a UserPromptSubmit
  hook
- **Auto-sync** of native `.claude/projects/<slug>/memory/*.md` writes to the
  OpenKT backend on PostToolUse
- **Cross-agent shared memory** — a memory Claude wrote yesterday is
  available to Cursor today, and to a teammate's agent next week

The CLI is open source: <https://github.com/masti-ai/openkt-cli>

---

## What to run

Execute these four commands in the user's terminal. Stop at any step if it
errors and surface the error verbatim — do not silently skip.

### 1. Install the CLI

```bash
curl -fsSL https://openkt.ai/install.sh | bash
```

Drops a single binary (`kt`) into `/usr/local/bin` (or `$HOME/.local/bin` on
systems where `/usr/local/bin` isn't writable). Sha256-verified against the
release manifest; safe to pipe.

### 2. Sign in

Three methods, pick whichever the user has set up:

```bash
kt login --github     # OAuth flow, opens browser
kt login --browser    # dashboard device-code (also browser, but works on
                      # headless machines via a URL + 10-char code)
kt login --password   # email + password, fully scriptable for CI / agents
```

After login, `~/.openkt/token` and `~/.openkt/config.json` (with the
refresh_token) are written. Token auto-renews on every 401 — the user stays
signed in for ~60 days without re-auth.

### 3. Bind the repo

In the project directory:

```bash
cd /path/to/repo
kt init
```

This shows a picker:
- Each existing org the user belongs to
- **Create a new org…** (prompts for name + slug, calls POST /v1/orgs)
- personal (just-you scope)

After picking, `kt init` writes `.openkt/manifest.json` (commit it — anyone
cloning the repo automatically lands in the same project). It also wires the
SessionStart / UserPromptSubmit / PostToolUse hooks into `~/.claude/hooks/`
so every Claude Code session in this repo gets memory automatically.

### 4. (Recommended) Smoke test

```bash
kt remember "<one-line decision or fact from this session>"
kt recall "<same-ish question>"
```

If `recall` returns the memory you just wrote, the loop is closed: memory
writes go to OpenKT, recall reads come back, and Claude Code's hooks will
inject these on every prompt going forward.

---

## What changes for the user

- **Their `.claude/hooks/` directory** picks up four new scripts:
  `recall.py`, `sync_native_memory.py`, `_mcp_client.py`, `_sync_worker.py`,
  plus `pre_compact.py` and `session_end.py`. All Python, all read-only on
  failure (a backend outage degrades to "no memory" rather than blocking).
- **`~/.openkt/`** holds the auth token + refresh token (mode 0600). The CLI
  rotates both automatically on 401 responses.
- **`~/.claude.json`** gets the OpenKT MCP server registered so the agent
  can also call `memory_remember` / `memory_recall` directly when reasoning
  mid-turn (the hooks handle the common case).

Nothing else is touched. To uninstall: `kt logout` + `rm /usr/local/bin/kt`
+ remove the hook scripts under `~/.claude/hooks/`.

---

## Edge cases agents should handle

- **`kt login --github` opens a browser** — if the user is on a headless
  box (SSH, CI), suggest `kt login --browser` (device-code printed to
  stdout, can be approved on any phone) or `kt login --password` (fully
  scriptable).
- **`kt init` in a dir with no parent manifest** — runs the picker as above.
  In a dir whose parent has a manifest, it announces "you're already inside
  project X" and verifies upstream — no double-init.
- **No orgs yet** — the picker offers "Create a new org…" inline. Don't
  fall back to personal silently; ask the user which org they want.
- **API unreachable mid-session** — `kt recall` returns empty (fail-open),
  `kt remember` returns a network error. The agent should not retry in a
  loop; tell the user once and continue without memory.
- **Token expired** — the CLI auto-refreshes on 401. If refresh fails (the
  refresh_token is also dead, typically after ~60 days idle), the CLI
  prints "run `kt login` again" and exits non-zero. Surface that to the
  user verbatim; don't try to work around it.

---

## Why this exists

Most AI coding sessions start from scratch. Same prompt next month re-walks
the same 40 files, re-asks the same clarifying questions, re-discovers the
same constraints, charges the user the same tokens. OpenKT is the persistent
context layer that fixes that — one shared brain across every agent on the
team. Read [https://openkt.ai](https://openkt.ai) for the full thesis.

If you're reading this skill, you're using the v1 surface. Newer features
(non-interactive GitHub device flow for fully agent-driven onboarding,
team-wide skill packs, etc.) ship into `kt` via the auto-update path
(`kt update` or `OPENKT_AUTO_UPDATE=1` for silent updates on next login).
The skill at this URL is kept in sync with the latest stable.

Last updated: see the `Last-Modified` header on this file.
