#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const options = { target: "public" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--target") options.target = argv[++i] ?? options.target;
    else if (arg === "--help" || arg === "-h") options.help = true;
  }
  return options;
}

async function copyFile(from, to) {
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
}

async function main() {
  const { target, help } = parseArgs(process.argv.slice(2));
  if (help) {
    console.log(`Usage: kamod-brand-sync-docs [--target public]

Copies docs-site logo assets and logo.css into the target public directory.`);
    process.exit(0);
  }

  const targetDir = path.resolve(process.cwd(), target);
  const assets = [
    "logo-kamod-dark.svg",
    "logo-kamod-light.svg",
    "kamod-logo-horizontal.svg",
    "kamod-logo-horizontal-dark.svg",
  ];

  for (const file of assets) {
    const from = path.join(packageRoot, "assets", file);
    const to = path.join(targetDir, file);
    await copyFile(from, to);
    console.log(`Copied ${file} -> ${path.relative(process.cwd(), to)}`);
  }

  const stylesDir = path.join(targetDir, "styles");
  await copyFile(path.join(packageRoot, "styles", "logo.css"), path.join(stylesDir, "logo.css"));
  console.log(`Copied logo.css -> ${path.relative(process.cwd(), path.join(stylesDir, "logo.css"))}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
