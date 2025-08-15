import { defineField, defineType } from "sanity";

export const socialMedia = defineType({
  name: "socialMedia",
  title: "Social Media",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Une image est requise."),
    }),
  ],
});
