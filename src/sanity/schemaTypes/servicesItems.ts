import { defineType, defineField } from "sanity";

export default defineType({
  name: "serviceItem",
  title: "Service",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Description",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { titleFr: "title.fr", titleEn: "title.en", media: "image" },
    prepare({ titleFr, titleEn, media }) {
      return { title: titleFr || titleEn || "Service", media };
    },
  },
});
