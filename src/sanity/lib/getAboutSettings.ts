"use server";
import { groq } from "next-sanity";
import { client } from "./client";
import type { AboutSettings, ServiceItem } from "../types/about";
import { urlForTex } from "./image";

const query = groq`{
  "about": *[_type == "aboutSettings"][0]{
    h1, h2, h3,
    services[]{
      title,
      "image": image{ "url": asset->url },
      text
    },
    logoPartners[]{ "url": asset->url, alt },
    "heroPortrait": heroPortrait{ "url": asset->url },
    "contactSideImage": contactSideImage{ "url": asset->url },
    clientComments[]{
      name,
      comment
    }
  },
  "resortImage": *[_type == "photo" && ("Resort" in categories[]->title || "resort" in categories[]->title)][0].image.asset->url
}`;

export async function getAboutSettings(): Promise<AboutSettings | null> {
  const result: { about: AboutSettings | null; resortImage?: string } =
    await client.fetch(query);

  const about = result?.about;
  if (!about) return null;

  const services: ServiceItem[] = Array.isArray(about.services)
    ? about.services.map((s) => ({ ...s }))
    : [];

  // 1.1 Fix inverted texts between EVENT and SOCIAL MEDIA if still inverted in Sanity
  const eventIdx = services.findIndex(
    (s) => s.title?.en?.toUpperCase() === "EVENT",
  );
  const socialIdx = services.findIndex(
    (s) => s.title?.en?.toUpperCase() === "SOCIAL MEDIA",
  );

  if (
    eventIdx !== -1 &&
    socialIdx !== -1 &&
    services[eventIdx].text?.fr?.includes("Instagram")
  ) {
    const tempText = services[eventIdx].text;
    services[eventIdx].text = services[socialIdx].text;
    services[socialIdx].text = tempText;
  }

  // 1.1 Add RESORT service block if not already present in Sanity
  const hasResort = services.some((s) =>
    s.title?.en?.toLowerCase().includes("resort"),
  );

  if (!hasResort) {
    const rawResortUrl =
      result.resortImage ||
      "https://cdn.sanity.io/images/zpajpvv0/production/5c9177eb55ece1d452577580475d6179b4d532ac-5232x3918.webp";

    services.push({
      title: {
        fr: "RESORT",
        en: "RESORT",
      },
      image: {
        url: urlForTex(rawResortUrl, { w: 900, q: 80 }),
      },
      text: {
        fr: "Sublimez vos établissements d’exception, hôtels de luxe, villas et domaines privés grâce à des films et photographies au rendu cinématographique. Prises de vue au sol et par drone, mise en valeur de l’architecture, de l’art de vivre et de l’expérience client : nous créons des visuels haut de gamme pensés pour séduire une clientèle internationale.",
        en: "Elevate your exceptional properties, luxury hotels, villas, and private estates with cinematic films and photography. Combining ground and drone footage to showcase architecture, lifestyle, and guest experience, we craft high-end visuals designed to captivate an international clientele.",
      },
    });
  }

  // Ordre des catégories souhaité : 1. Resort, 2. Corporate, 3. Événementiel, 4. Réseaux Sociaux
  const getOrderRank = (item: ServiceItem) => {
    const en = item.title?.en?.toLowerCase().trim() || "";
    const fr = item.title?.fr?.toLowerCase().trim() || "";
    if (en.includes("resort") || fr.includes("resort")) return 1;
    if (en.includes("corporate") || fr.includes("corporate")) return 2;
    if (
      en.includes("event") ||
      fr.includes("évènement") ||
      fr.includes("événement") ||
      fr.includes("evenement")
    )
      return 3;
    if (en.includes("social") || fr.includes("réseau") || fr.includes("reseau"))
      return 4;
    return 99;
  };

  services.sort((a, b) => getOrderRank(a) - getOrderRank(b));

  return {
    ...about,
    services,
  };
}
