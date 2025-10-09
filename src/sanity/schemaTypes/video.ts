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
    defineField({
      name: "orderPlace",
      title: "Ordre d’affichage",
      type: "number",
      description: "Unique pour chaque vidéo. Plus petit = affiché plus haut.",
      // Optionnel: autoincrément (voir plus bas)
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .custom(async (value, context) => {
            if (value === undefined || value === null) return true;
            const { document, getClient } = context;
            const client = getClient({ apiVersion: "2023-10-01" });
            const currentId = document?._id?.replace(/^drafts\./, "");

            // On cherche des vidéos (publiées ou brouillons) avec la même valeur
            const count = await client.fetch(
              `count(*[
                _type == "video" && orderPlace == $value &&
                // Exclure ce document (publié & draft)
                !(_id in [$id, "drafts." + $id])
              ])`,
              { value, id: currentId },
            );

            return (
              count === 0 ||
              "Cette valeur est déjà utilisée par une autre vidéo."
            );
          }),
    }),
  ],

  orderings: [
    {
      title: "Ordre d’affichage (asc)",
      name: "orderPlaceAsc",
      by: [{ field: "orderPlace", direction: "asc" }],
    },
    {
      title: "Ordre d’affichage (desc)",
      name: "orderPlaceDesc",
      by: [{ field: "orderPlace", direction: "desc" }],
    },
  ],
});
