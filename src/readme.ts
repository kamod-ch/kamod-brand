export interface ReadmeLogoOptions {
  product: string;
  productSlug?: string;
  label?: string;
  width?: number;
  /**
   * - `github`: relative `.github/assets` paths with GitHub theme fragments.
   * - `github-absolute`: raw GitHub URLs + theme fragments (repo README also published to npm).
   * - `npm`: one logo via raw GitHub URL (npm has no `#gh-*-mode-only` support).
   */
  variant?: "github" | "github-absolute" | "npm";
  repo?: string;
  branch?: string;
}

function slugify(product: string): string {
  return product.trim().toLowerCase().replace(/\s+/g, "-");
}

function logoBasename(productSlug: string, theme: "dark" | "light"): string {
  return `logo-kamod-${productSlug}-${theme}.svg`;
}

export function readmeLogoMarkdown(options: ReadmeLogoOptions): string {
  const productSlug = options.productSlug ?? slugify(options.product);
  const label = options.label ?? `Kamod ${options.product}`;
  const width = options.width ?? 280;
  const variant = options.variant ?? "github";
  const dark = logoBasename(productSlug, "dark");
  const light = logoBasename(productSlug, "light");

  const branch = options.branch ?? "main";
  const assetPath = (file: string) => `.github/assets/${file}`;
  const rawUrl = (file: string) => {
    if (!options.repo) {
      throw new Error("readmeLogoMarkdown: `repo` is required for github-absolute and npm variants");
    }
    return `https://raw.githubusercontent.com/${options.repo}/${branch}/${assetPath(file)}`;
  };

  if (variant === "npm") {
    return `<p align="center">
  <img src="${rawUrl(dark)}" alt="${label}" width="${width}" />
</p>`;
  }

  const src = (file: string) => (variant === "github-absolute" ? rawUrl(file) : assetPath(file));

  return `<p align="center">
  <img src="${src(dark)}#gh-light-mode-only" alt="${label}" width="${width}" />
  <img src="${src(light)}#gh-dark-mode-only" alt="${label}" width="${width}" />
</p>`;
}
