import { defineType, defineField } from "sanity";

export default defineType({
  name: "phoneNumbers",
  title: "Téléphones",
  type: "object",
  fields: [
    defineField({
      name: "ca",
      title: "Canada",
      type: "string",
      description: "Ex: +1 438 439 1921",
    }),
    defineField({
      name: "fr",
      title: "France",
      type: "string",
      description: "Ex: +33 7 84 10 35 54",
    }),
  ],
});
