// /schemas/documents/aboutSettings.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutSettings",
  title: "Page – À propos (Chroma)",
  type: "document",
  fields: [
    defineField({
      name: "h1",
      title: "H1",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "h2",
      title: "H2 (paragraphe principal)",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "h3",
      title: "H3 (sous-texte / citation)",
      type: "localeText",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "serviceItem" }],
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: "logoPartners",
      title: "Logos partenaires",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "clientComments",
      title: "Témoignages clients",
      type: "array",
      of: [{ type: "clientComment" }],
    }),

    // (Optionnel) Images statiques actuellement dans le composant :
    defineField({
      name: "heroPortrait",
      title: "Image portrait (section 1)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "contactSideImage",
      title: "Image latérale (section contact)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "À propos – Chroma" };
    },
  },
});
