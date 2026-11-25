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

  const currentFr =
    data.phone?.fr && !data.phone.fr.includes("7 84 10")
      ? data.phone.fr
      : "+33 6 72 33 33 44";

  return {
    ...data,
    phone: {
      ...data.phone,
      fr: currentFr,
    },
    address: data.address
      ? data.address.replace(/allée de salamandres/i, "allée des salamandres")
      : data.address,
  };
}
