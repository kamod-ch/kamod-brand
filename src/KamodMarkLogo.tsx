import type { FunctionalComponent } from "preact";
import { withBase } from "./with-base.js";

export interface KamodMarkLogoProps {
  base?: string;
  class?: string;
  alt?: string;
  resolveAsset?: (path: string) => string;
}

/** Horizontal Kamod wordmark for footers (light/dark swap via CSS). */
export const KamodMarkLogo: FunctionalComponent<KamodMarkLogoProps> = ({
  base = "/",
  class: className,
  alt = "Kamod",
  resolveAsset,
}) => {
  const asset = (path: string) => (resolveAsset ? resolveAsset(path) : withBase(base, path));

  return (
    <span class={["kamod-mark", className].filter(Boolean).join(" ")} aria-hidden="true">
      <img
        src={asset("/kamod-logo-horizontal.svg")}
        alt={alt}
        class="kamod-mark__img kamod-mark__img--light"
        decoding="async"
      />
      <img
        src={asset("/kamod-logo-horizontal-dark.svg")}
        alt=""
        class="kamod-mark__img kamod-mark__img--dark"
        decoding="async"
      />
    </span>
  );
};
