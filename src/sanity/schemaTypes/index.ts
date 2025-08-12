import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { photoType } from "./photo";
import { videoType } from "./video";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, photoType, videoType],
};
