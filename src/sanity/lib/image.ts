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

/** URL d’image optimisée pour une texture WebGL ou affichage optimisé */
export function urlForTex(
  source: SanityImageSource,
  opts?: { w?: number; q?: number; dpr?: number },
) {
  if (!source) return "";

  let cleanSource = source;
  if (typeof cleanSource === "string") {
    // Si la chaîne contient déjà des query params, on les retire pour permettre à @sanity/image-url de parser l'URL correctement
    if (cleanSource.includes("?")) {
      cleanSource = cleanSource.split("?")[0];
    }
  }

  try {
    const w = opts?.w ?? 1600; // adapte au layout
    const q = opts?.q ?? 70; // 60–75 = bon compromis
    const dpr = opts?.dpr ?? getDpr();
    return builder
      .image(cleanSource)
      .width(Math.round(w * dpr))
      .fit("max") // pas d’upscale
      .auto("format") // webp/avif si possible
      .quality(q)
      .url();
  } catch (err) {
    console.warn("urlForTex error fallback:", err);
    return typeof source === "string" ? source : "";
  }
}
