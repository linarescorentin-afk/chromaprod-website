import { defineArrayMember, defineField, defineType } from "sanity";

export const videoType = defineType({
  name: "video",
  title: "Vidéo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "video",
      title: "Fichier Vidéo",
      type: "file",
      options: {
        accept: "video/mp4",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Miniature",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Nom du client",
      type: "string",
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
