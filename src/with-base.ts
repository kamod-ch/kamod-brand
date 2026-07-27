/** Resolve a site-relative asset path against `base` (absolute http(s) URLs are unchanged). */
export function withBase(base: string, link: string): string {
  if (/^https?:\/\//i.test(link)) return link;
  const prefix = base === "/" ? "" : base.replace(/\/$/, "");
  const path = link.startsWith("/") ? link : `/${link}`;
  return `${prefix}${path}`;
}
