import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactSettings",
  title: "Page – Contact",
  type: "document",
  fields: [
    defineField({
      name: "h1",
      title: "H1",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Téléphones",
      type: "phoneNumbers",
    }),
    defineField({
      name: "mail",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "hours",
      title: "Horaires",
      type: "openingHours",
    }),
    defineField({
      name: "image",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact – Settings" };
    },
  },
});
