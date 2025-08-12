import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenus")
    .items([
      S.documentTypeListItem("photo").title("Photos"),
      S.documentTypeListItem("category").title("Catégories"),
      S.documentTypeListItem("video").title("Vidéos"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !["photo", "category", "video"].includes(item.getId()!),
      ),
    ]);
