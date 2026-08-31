import type { FunctionalComponent } from "preact";
import { withBase } from "./with-base.js";

export interface KamodIconProps {
  base?: string;
  class?: string;
  alt?: string;
  resolveAsset?: (path: string) => string;
}

/** Symbol-only Kamod mark (no wordmark), with light/dark swap via CSS. */
export const KamodIcon: FunctionalComponent<KamodIconProps> = ({
  base = "/",
  class: className,
  alt = "Kamod",
  resolveAsset,
}) => {
  const asset = (path: string) => (resolveAsset ? resolveAsset(path) : withBase(base, path));

  return (
    <span class={["kamod-icon", className].filter(Boolean).join(" ")} aria-hidden="true">
      <img
        src={asset("/kamod-icon.svg")}
        alt={alt}
        class="kamod-icon__img kamod-icon__img--light"
        decoding="async"
      />
      <img
        src={asset("/kamod-icon-dark.svg")}
        alt=""
        class="kamod-icon__img kamod-icon__img--dark"
        decoding="async"
      />
    </span>
  );
};
