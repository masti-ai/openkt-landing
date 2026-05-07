import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open KT — the shared intelligence layer for AI-native teams",
  description:
    "Open KT (Open Knowledge Transfer) turns every agentic discovery into permanent team capital. Compounding context. One brain, every harness. Works with Claude Code, Codex, Cursor, and anything that speaks MCP.",
  metadataBase: new URL("https://openkt.ai"),
  openGraph: {
    title: "Open KT — the shared intelligence layer for AI-native teams",
    description:
      "One shared brain for every coding agent on your team. They inherit yesterday's decisions, share today's discoveries, and skip the 47k-token repo scan every morning.",
    url: "https://openkt.ai",
    siteName: "Open KT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open KT — the shared intelligence layer for AI-native teams",
    description:
      "One shared brain for every coding agent on your team. They inherit yesterday's decisions, share today's discoveries, and skip the 47k-token repo scan every morning.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
