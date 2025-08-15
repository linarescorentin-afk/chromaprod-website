import { client } from "./client";

export interface SocialMedia {
  platform: string;
  url: string;
  image: string;
}

export async function getSocialMedia(): Promise<SocialMedia[]> {
  const query = `*[_type == "socialMedia"] | order(_createdAt asc) {
    platform,
    url,
    "image": image.asset->url
  }`;
  const socialMedia = await client.fetch(query);
  return socialMedia;
}
