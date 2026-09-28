<p align="center">
  <img src="https://raw.githubusercontent.com/kamod-ch/.github/main/assets/logo-kamod-brand.svg" alt="Kamod Brand" width="280" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@kamod-ch/brand"><img src="https://img.shields.io/npm/v/%40kamod-ch%2Fbrand" alt="npm version" /></a>
  <a href="https://github.com/kamod-ch/kamod-brand/stargazers"><img src="https://img.shields.io/github/stars/kamod-ch/kamod-brand?style=social" alt="GitHub stars" /></a>
  <a href="https://github.com/kamod-ch/kamod-brand/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license" /></a>
</p>

<p align="center">
  <strong><a href="https://www.npmjs.com/package/@kamod-ch/brand">npm</a></strong> ·
  <strong><a href="https://github.com/kamod-ch/kamod-brand">GitHub</a></strong> ·
  <strong><a href="https://github.com/kamod-ch/kamod-brand/issues">Issues</a></strong>
</p>

> If Kamod Brand saves you time, **[star the repo](https://github.com/kamod-ch/kamod-brand)** — it helps others discover the project.

# Kamod Brand

Shared Kamod product logos for PreactPress docs sites and GitHub READMEs.

```tsx
import { KamodProductLogo } from '@kamod-ch/brand'

export default function Logo({ base = '/' }: { base?: string }) {
  return <KamodProductLogo base={base} label="Kamod State" suffix="State" />
}
```

```bash
pnpm exec kamod-brand-sync-docs --target public
pnpm exec kamod-brand-readme --product State --output .github/assets
```

To make the favicon follow both the manual docs theme and the operating-system theme, add the head links to the PreactPress config and mount `FaviconSync` once in the theme layout:

```tsx
// .preactpress/config.ts
import { docsFaviconHeadLinks } from '@kamod-ch/brand'

export default {
  head: docsFaviconHeadLinks('/'),
}
```

```tsx
// .preactpress/theme/Layout.tsx
import { FaviconSync } from '@kamod-ch/brand'

export default function Layout() {
  return <><FaviconSync base="/" />{/* layout */}</>
}
```

Preact is a peer dependency for the components. CLI helpers ship with the package (`kamod-brand-sync-docs`, `kamod-brand-readme`).
