import { defineArrayMember, defineField, defineType } from "sanity";

// studio/schemas/photo.ts
export const videoType = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Une image est requise."),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
    }),
    defineField({
      name: "formats",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Horizontal", value: "horizontal" },
          { title: "Vertical", value: "vertical" },
        ],
      },
      validation: (Rule) => Rule.required().error("Le format est obligatoire."),
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
      validation: (Rule) =>
        Rule.required().error("La catégorie est obligatoire."),
    }),
  ],
});
