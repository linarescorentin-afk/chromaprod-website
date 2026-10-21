import { defineType, defineField } from "sanity";

export default defineType({
  name: "phoneNumbers",
  title: "Téléphones",
  type: "object",
  fields: [
    defineField({
      name: "ca",
      title: "Second numéro (optionnel)",
      type: "string",
      description: "Laisser vide pour ne pas l'afficher (ancien numéro Canada)",
    }),
    defineField({
      name: "fr",
      title: "France",
      type: "string",
      description: "Ex: +33 7 84 10 35 54",
    }),
  ],
});
