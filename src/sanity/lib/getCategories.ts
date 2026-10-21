"use server";
import { client } from "./client";

export interface ICategoryItem {
  value: string;
  nameEn: string;
  nameFr: string;
}

interface RawCategory {
  _id: string;
  title?: string;
  titleFr?: string;
  orderPlace?: number;
}

const DEFAULT_TRANSLATIONS: Record<string, { nameEn: string; nameFr: string }> = {
  corporate: { nameEn: "Corporate", nameFr: "Corporate" },
  events: { nameEn: "Events", nameFr: "Événements" },
  socialmedia: { nameEn: "SocialMedia", nameFr: "RéseauxSociaux" },
  resort: { nameEn: "Resort", nameFr: "Resort" },
};

export async function getCategories(): Promise<ICategoryItem[]> {
  const rawCategories: RawCategory[] = await client.fetch(
    `*[_type == "category"] | order(coalesce(orderPlace, 9999) asc, _createdAt asc) {
      _id,
      title,
      titleFr,
      orderPlace
    }`,
  );

  const mapped = rawCategories
    .filter((cat) => Boolean(cat.title && cat.title.trim()))
    .map((cat) => {
      const rawTitle = cat.title!.trim();
      const key = rawTitle.toLowerCase();
      const fallback = DEFAULT_TRANSLATIONS[key];

      return {
        value: key,
        nameEn: fallback?.nameEn ?? rawTitle,
        nameFr: cat.titleFr?.trim() || fallback?.nameFr || rawTitle,
      };
    });

  return [{ value: "all", nameEn: "All", nameFr: "Tout" }, ...mapped];
}
