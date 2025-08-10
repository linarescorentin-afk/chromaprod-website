import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenus")
    .items([
      S.documentTypeListItem("photo").title("Photos"),
      S.documentTypeListItem("category").title("Catégories"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !["photo", "category"].includes(item.getId()!),
      ),
    ]);
