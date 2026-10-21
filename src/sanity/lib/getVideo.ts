"use server";
import { client } from "./client";
import { urlForTex } from "./image";

export interface IVideo {
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  clientName?: string;
  categories: string[];
}

export async function getVideos(): Promise<IVideo[]> {
  const videos: IVideo[] = await client.fetch(
    `*[_type == "video"] | order(coalesce(orderPlace, 9999) asc, _createdAt desc) {
      title,
      description,
      "video": video.asset->url,
      "thumbnail": thumbnail.asset->url,
      clientName,
      "categories": categories[]->title,
      "orderPlace": orderPlace
    }`,
  );

  return videos.map((v) => ({
    ...v,
    thumbnail: v.thumbnail
      ? urlForTex(v.thumbnail, { w: 1200, q: 75 })
      : v.thumbnail,
  }));
}
