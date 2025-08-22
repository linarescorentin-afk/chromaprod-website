import { groq } from "next-sanity";
import { client } from "./client";
import type { ContactSettings } from "../types/contact";

const query = groq`*[_type == "contactSettings"][0]{
  h1,
  address,
  phone,
  mail,
  hours,
  "image": image{ "url": asset->url, alt }
}`;

export async function getContactSettings(): Promise<ContactSettings | null> {
  return await client.fetch(query);
}
