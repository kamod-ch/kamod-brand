export interface ReadmeLogoOptions {
  product: string;
  productSlug?: string;
  label?: string;
  width?: number;
  /** Relative paths for GitHub repo READMEs. */
  variant?: "github" | "npm";
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

  const src = (file: string) => {
    if (variant === "npm" && options.repo) {
      const branch = options.branch ?? "main";
      return `https://raw.githubusercontent.com/${options.repo}/${branch}/.github/assets/${file}`;
    }
    return `.github/assets/${file}`;
  };

  return `<p align="center">
  <img src="${src(dark)}#gh-light-mode-only" alt="${label}" width="${width}" />
  <img src="${src(light)}#gh-dark-mode-only" alt="${label}" width="${width}" />
</p>`;
}
