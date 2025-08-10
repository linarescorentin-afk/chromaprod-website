import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { photoType } from "./photo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, photoType],
};
