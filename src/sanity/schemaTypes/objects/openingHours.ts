import { defineType, defineField } from "sanity";

export default defineType({
  name: "openingHours",
  title: "Horaires d'ouverture",
  type: "object",
  fields: [
    defineField({ name: "monday", title: "Lundi", type: "string" }),
    defineField({ name: "tuesday", title: "Mardi", type: "string" }),
    defineField({ name: "wednesday", title: "Mercredi", type: "string" }),
    defineField({ name: "thursday", title: "Jeudi", type: "string" }),
    defineField({ name: "friday", title: "Vendredi", type: "string" }),
    defineField({ name: "saturday", title: "Samedi", type: "string" }),
    defineField({ name: "sunday", title: "Dimanche", type: "string" }),
  ],
});
