// /sanity/lib/getAboutSettings.ts
import { groq } from "next-sanity";
import { client } from "./client"; // ton client Sanity configuré
import type { AboutSettings } from "../types/about";

const query = groq`*[_type == "aboutSettings"][0]{
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
}`;

export async function getAboutSettings(): Promise<AboutSettings | null> {
  return await client.fetch(query);
}
