import type { Metadata } from "next";
import "./globals.css";

const TITLE = "OpenKT AI — shared context for your team's AI";
const DESCRIPTION =
  "Stop re-explaining your team to every AI. OpenKT saves decisions and context from every AI tool and meeting, and hands them to your teammates' agents — only what each person may see. Open source, Apache-2.0.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://openkt.ai"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://openkt.ai",
    siteName: "OpenKT AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
