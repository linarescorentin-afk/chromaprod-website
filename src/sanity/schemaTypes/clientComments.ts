import { defineType, defineField } from "sanity";

export default defineType({
  name: "clientComment", // <- DOIT correspondre à ce que tu as mis dans "of: [{type:'clientComment'}]"
  title: "Témoignage client",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "comment",
      title: "Commentaire",
      type: "object",
      fields: [
        defineField({ name: "fr", title: "Français", type: "text" }),
        defineField({ name: "en", title: "English", type: "text" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "name" },
    prepare({ title }) {
      return { title: title || "Témoignage" };
    },
  },
});
