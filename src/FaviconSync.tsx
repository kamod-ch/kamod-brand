import type { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { withBase } from "./with-base.js";

export interface FaviconSyncProps {
  /** Base URL used by the docs site, e.g. "/" or "/project/". */
  base?: string;
}

type ColorTheme = "light" | "dark";

/** Matches PreactPress `PREACTPRESS_THEME_STORAGE_KEY`. */
const PREACTPRESS_THEME_STORAGE_KEY = "preactpress-theme";

function readStoredTheme(): ColorTheme | null {
  try {
    const value = localStorage.getItem(PREACTPRESS_THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function activeTheme(): ColorTheme {
  const root = document.documentElement;
  const stored = readStoredTheme();
  if (stored) return stored;

  const explicitTheme = root.getAttribute("data-theme");
  if (explicitTheme === "light" || explicitTheme === "dark") return explicitTheme;
  if (root.classList.contains("dark")) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function syncFavicon(base: string): void {
  // OS `prefers-color-scheme` icon links must not override a manual docs theme.
  document.querySelectorAll('link[rel="icon"][media]').forEach((node) => node.remove());

  const href = withBase(base, `favicon-${activeTheme()}.svg`);
  const icons = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]'));
  let icon = icons.find((link) => !link.media) ?? icons[0];

  for (const candidate of icons) {
    if (candidate !== icon) candidate.remove();
  }

  if (!icon) {
    icon = document.createElement("link");
    icon.rel = "icon";
    document.head.append(icon);
  }
  icon.removeAttribute("media");
  icon.type = "image/svg+xml";
  icon.href = href;

  document.querySelectorAll<HTMLLinkElement>('link[rel="apple-touch-icon"]').forEach((link) => {
    link.href = href;
  });
}

/** Keeps docs-site favicons in sync with preactpress-theme, data-theme, html.dark, and the OS theme. */
export const FaviconSync: FunctionalComponent<FaviconSyncProps> = ({ base = "/" }) => {
  useEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => syncFavicon(base);
    const observer = new MutationObserver(update);
    const onStorage = (event: StorageEvent) => {
      if (event.key === PREACTPRESS_THEME_STORAGE_KEY) update();
    };

    update();
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    colorScheme.addEventListener("change", update);
    window.addEventListener("storage", onStorage);

    return () => {
      observer.disconnect();
      colorScheme.removeEventListener("change", update);
      window.removeEventListener("storage", onStorage);
    };
  }, [base]);

  return null;
};
