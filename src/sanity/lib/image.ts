// sanity/lib/image.ts
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

function getDpr() {
  if (typeof window === "undefined") return 1;
  const dpr = window.devicePixelRatio || 1;
  return Math.min(dpr, 1.5); // évite 2.0+ qui coûte cher
}

/** URL d’image optimisée pour une texture WebGL */
export function urlForTex(
  source: SanityImageSource,
  opts?: { w?: number; q?: number; dpr?: number },
) {
  const w = opts?.w ?? 1600; // adapte à ton layout
  const q = opts?.q ?? 70; // 60–75 = bon compromis
  const dpr = opts?.dpr ?? getDpr();
  return builder
    .image(source)
    .width(Math.round(w * dpr))
    .fit("max") // pas d’upscale
    .auto("format") // webp/avif si possible
    .quality(q)
    .url();
}
