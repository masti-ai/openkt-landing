/**
 * Every outbound URL the landing uses, in one place.
 *
 * GITHUB_URL: the OpenKT AI repository (renamed from masti-ai/openkt-next).
 * Change this one line if it moves again; every button, footer link and doc
 * link below derives from it.
 */
export const GITHUB_URL = "https://github.com/masti-ai/OpenKT-ai";

/** Hosted MCP endpoint (docs/specs/04-api-contract.md: `POST /mcp`, Streamable HTTP, OAuth). */
export const MCP_URL = "https://mcp.openkt.ai/mcp";

/** Mac desktop app, Apple silicon. Unsigned during the preview. */
export const DMG_URL =
  "https://openkt-downloads-724772068721.s3.ap-south-1.amazonaws.com/desktop/OpenKT-latest-arm64.dmg";

export const INSTALL_NOTE_URL = `${GITHUB_URL}/blob/main/apps/desktop/INSTALL-UNSIGNED.md`;
export const PRODUCT_DOC_URL = `${GITHUB_URL}/blob/main/docs/product.md`;
export const LICENSE_URL = `${GITHUB_URL}/blob/main/LICENSE`;

/**
 * The paste-into-any-AI setup prompt is served as a static file so agents
 * can also fetch it by URL. `public/setup-prompt.md` is a verbatim copy of
 * `plugin/SETUP_PROMPT.md` in the OpenKT repository (synced from main @ 7307030).
 *
 * TODO(sync): the prompt is being reworked on `feat/mcp-connect` and may be
 * renamed `plugin/SETUP-PROMPT.md`. When it lands, copy it over
 * `public/setup-prompt.md` unchanged — the page reads that file at build time.
 */
export const SETUP_PROMPT_PATH = "/setup-prompt.md";

/** The one command that clears macOS quarantine on the unsigned preview build. */
export const XATTR_COMMAND = "xattr -dr com.apple.quarantine /Applications/OpenKT.app";

/** A short prompt a person gives their own AI agent to install the Mac app. */
export const MAC_INSTALL_PROMPT = `Install the OpenKT desktop app on my Mac for me. It is an unsigned preview build, so macOS quarantines it; that is expected.

1. Download ${DMG_URL} to ~/Downloads.
2. Mount the disk image, copy OpenKT.app to /Applications, then eject it.
3. Run: ${XATTR_COMMAND}
4. Open OpenKT.

Tell me each command before you run it. Do not use sudo. If a step fails or asks for my password, stop and tell me.`;
