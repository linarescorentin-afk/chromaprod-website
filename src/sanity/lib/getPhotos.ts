import { client } from "./client";

export interface IPhoto {
  image: string;
  date: string;
  client: string;
  name: string;
  formats: "horizontal" | "vertical";
  categories: string[];
}

export async function getPhotos(): Promise<IPhoto[]> {
  return await client.fetch(`*[_type == "photo"] | order(date asc) {
    name,
    client,
    date,
    formats,
    "image": image.asset->url,
    "categories": categories[]->title
  }`);
}
