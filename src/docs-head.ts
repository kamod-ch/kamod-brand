import { withBase } from "./with-base.js";

export type DocsHeadLink = [tag: "link", attrs: Record<string, string>];

/** PreactPress head entries for light/dark favicons synced via kamod-brand-sync-docs. */
export function docsFaviconHeadLinks(base = "/"): DocsHeadLink[] {
  const light = withBase(base, "favicon-light.svg");
  const dark = withBase(base, "favicon-dark.svg");

  return [
    ["link", { rel: "icon", href: light, type: "image/svg+xml", media: "(prefers-color-scheme: light)" }],
    ["link", { rel: "icon", href: dark, type: "image/svg+xml", media: "(prefers-color-scheme: dark)" }],
    ["link", { rel: "icon", href: light, type: "image/svg+xml" }],
    ["link", { rel: "apple-touch-icon", href: light }],
  ];
}
