import type { ComponentChildren, FunctionalComponent } from "preact";
import { withBase } from "./with-base.js";

export interface KamodProductLogoProps {
  /** Visible product name next to the Kamod mark, e.g. "Icons". */
  suffix: ComponentChildren;
  /** Full accessible label, e.g. "Kamod Icons". */
  label: string;
  base?: string;
  class?: string;
  /** Optional asset resolver (e.g. site-specific withBasePath). */
  resolveAsset?: (path: string) => string;
}

export const KamodProductLogo: FunctionalComponent<KamodProductLogoProps> = ({
  suffix,
  label,
  base = "/",
  class: className,
  resolveAsset,
}) => {
  const asset = (path: string) => (resolveAsset ? resolveAsset(path) : withBase(base, path));

  return (
    <span class={["kamod-logo", className].filter(Boolean).join(" ")} aria-label={label}>
      <span class="kamod-logo__mark" aria-hidden="true">
        <img
          src={asset("/logo-kamod-dark.svg")}
          alt=""
          class="kamod-logo__mark-img kamod-logo__mark-img--light"
          decoding="async"
        />
        <img
          src={asset("/logo-kamod-light.svg")}
          alt=""
          class="kamod-logo__mark-img kamod-logo__mark-img--dark"
          decoding="async"
        />
      </span>
      <span class="kamod-logo__suffix" aria-hidden="true">
        {suffix}
      </span>
    </span>
  );
};
