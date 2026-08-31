# @kamod-ch/brand

Shared Kamod product logos for PreactPress docs sites and GitHub READMEs.

## Install

```bash
pnpm add @kamod-ch/brand
```

## Docs site (PreactPress)

```tsx
import { KamodProductLogo } from "@kamod-ch/brand";

export default ({ class: className, label, base = "/" }) => (
  <KamodProductLogo class={className} base={base} label={label} suffix="Icons" />
);
```

Import styles in your site config or layout:

```ts
["link", { rel: "stylesheet", href: publicUrl("styles/logo.css") }],
```

Sync static assets before dev/build:

```bash
pnpm exec kamod-brand-sync-docs --target packages/docs/public
```

## GitHub README

Generate product SVGs:

```bash
pnpm exec kamod-brand-readme --product Icons --output .github/assets
```

Use the snippet from `snippets/readme-header.md` or `readmeLogoMarkdown()` from the package.

## Exports

- `KamodProductLogo` — mark + product suffix (header)
- `KamodMarkLogo` — horizontal mark (footer)
- `KamodIcon` — symbol only, no “Kamod” wordmark
- `withBase` — prefix site-relative asset paths
- `readmeLogoMarkdown` — README markdown helper
- `@kamod-ch/brand/logo.css` — shared styles
- `@kamod-ch/brand/assets/kamod-icon.svg` / `kamod-icon-dark.svg` — icon + favicon sources (synced as `favicon-light.svg` / `favicon-dark.svg`)
- `docsFaviconHeadLinks(base)` — light/dark favicon `<link>` entries for PreactPress

Favicon head tags for PreactPress docs:

```ts
import { docsFaviconHeadLinks } from "@kamod-ch/brand";

head: [...docsFaviconHeadLinks(base)],
```
