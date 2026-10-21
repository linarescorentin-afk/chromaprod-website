"use server";
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
  const data = await client.fetch<ContactSettings | null>(query);
  if (!data) return null;

  return {
    ...data,
    address: data.address
      ? data.address.replace(/allée de salamandres/i, "allée des salamandres")
      : data.address,
  };
}
