import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Catégorie",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nom (EN / Identifiant)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleFr",
      title: "Nom (FR)",
      description: "Optionnel — s'affiche quand le site est en français (sinon utilise le nom par défaut)",
      type: "string",
    }),
    defineField({
      name: "orderPlace",
      title: "Ordre d'affichage",
      description: "Optionnel — plus petit chiffre affiché en premier dans le menu",
      type: "number",
    }),
  ],
});
