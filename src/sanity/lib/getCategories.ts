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
  resort: { nameEn: "Resort", nameFr: "Resort" },
  corporate: { nameEn: "Corporate", nameFr: "Corporate" },
  events: { nameEn: "Events", nameFr: "Événements" },
  socialmedia: { nameEn: "SocialMedia", nameFr: "RéseauxSociaux" },
};

const getCategoryRank = (key: string, orderPlace?: number): number => {
  if (typeof orderPlace === "number") return orderPlace;
  if (key.includes("resort")) return 1;
  if (key.includes("corporate")) return 2;
  if (key.includes("event") || key.includes("evenement")) return 3;
  if (key.includes("social") || key.includes("reseau")) return 4;
  return 99;
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
        orderRank: getCategoryRank(key, cat.orderPlace),
      };
    })
    .sort((a, b) => a.orderRank - b.orderRank)
    .map(({ value, nameEn, nameFr }) => ({ value, nameEn, nameFr }));

  return [{ value: "all", nameEn: "All", nameFr: "Tout" }, ...mapped];
}
