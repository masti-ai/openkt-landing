// Static landing posts marketing forms cross-origin to the dashboard.
// Set NEXT_PUBLIC_OPENKT_API_BASE at build time to override the default.
export const OPENKT_API_BASE =
  process.env.NEXT_PUBLIC_OPENKT_API_BASE ?? "https://app.openkt.ai";

export function apiUrl(path: string): string {
  const rel = path.startsWith("/") ? path : `/${path}`;
  return `${OPENKT_API_BASE}${rel}`;
}
