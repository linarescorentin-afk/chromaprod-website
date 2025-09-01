import type { MetadataRoute } from "next";
import { site } from "./seo/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const statics = ["", "/about", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency:
      p === "" ? "weekly" : ("monthly" as "daily" | "weekly" | "monthly"),
    priority: p === "" ? 1 : 0.7,
  }));

  return [...statics];
}
