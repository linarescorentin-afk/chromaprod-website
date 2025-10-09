import { client } from "./client";

export interface IVideo {
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  clientName?: string;
  categories: string[];
}

export async function getVideos(): Promise<IVideo[]> {
  return await client.fetch(`*[_type == "video"] | order(coalesce(orderPlace, 9999) asc, _createdAt desc) {
    title,
    description,
    "video": video.asset->url,
    "thumbnail": thumbnail.asset->url,
    clientName,
    "categories": categories[]->title,
    "orderPlace": orderPlace
  }`);
}
