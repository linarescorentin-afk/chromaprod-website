import { defineType, defineField } from "sanity";

export default defineType({
  name: "localeText",
  title: "Texte long (FR/EN)",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "text", rows: 5 }),
    defineField({ name: "en", title: "English", type: "text", rows: 5 }),
  ],
});
