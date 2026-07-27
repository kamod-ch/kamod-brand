#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const options = { product: "", output: ".github/assets" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--product") options.product = argv[++i] ?? "";
    else if (arg === "--output") options.output = argv[++i] ?? options.output;
    else if (arg === "--help" || arg === "-h") options.help = true;
  }
  return options;
}

function slugify(product) {
  return product.trim().toLowerCase().replace(/\s+/g, "-");
}

async function readMarkBase64(theme) {
  const file = path.join(packageRoot, "assets", `logo-kamod-${theme}.svg`);
  const svg = await fs.readFile(file, "utf8");
  const match = svg.match(/xlink:href="data:image\/png;base64,([^"]+)"/);
  if (!match) throw new Error(`Could not extract PNG from ${file}`);
  return match[1];
}

function estimateLayout(suffix) {
  const markWidth = 610;
  const gap = 18;
  const textX = suffix.length <= 3 ? markWidth + gap + (5 - suffix.length) * 17 : markWidth + gap;
  const charWidth = 35;
  const width = Math.max(780, textX + suffix.length * charWidth + 52);
  return { textX, width };
}

function buildReadmeSvg({ suffix, theme, pngBase64 }) {
  const label = `kamod ${suffix}`;
  const { textX, width } = estimateLayout(suffix);
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="105" viewBox="0 0 ${width} 105" role="img" aria-label="${label}">
  <title>${label}</title>
  <image width="610" height="105" xlink:href="data:image/png;base64,${pngBase64}" />
  <text x="${textX}" y="78" font-family="'Quicksand', system-ui, sans-serif" font-weight="700" font-size="58" fill="#f9a01b" letter-spacing="-0.03em">${suffix}</text>
</svg>
`;
}

async function main() {
  const { product, output, help } = parseArgs(process.argv.slice(2));
  if (help || !product) {
    console.log(`Usage: kamod-brand-readme --product Icons [--output .github/assets]

Generates logo-kamod-<slug>-dark.svg and logo-kamod-<slug>-light.svg for GitHub READMEs.`);
    process.exit(help ? 0 : 1);
  }

  const slug = slugify(product);
  const outDir = path.resolve(process.cwd(), output);
  await fs.mkdir(outDir, { recursive: true });

  const [darkPng, lightPng] = await Promise.all([readMarkBase64("dark"), readMarkBase64("light")]);

  for (const theme of ["dark", "light"]) {
    const svg = buildReadmeSvg({
      suffix: product,
      theme,
      pngBase64: theme === "dark" ? darkPng : lightPng,
    });
    const filename = `logo-kamod-${slug}-${theme}.svg`;
    await fs.writeFile(path.join(outDir, filename), svg, "utf8");
    console.log(`Wrote ${path.join(output, filename)}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
