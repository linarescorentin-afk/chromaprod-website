// utils/photoScroll.ts
export function scrollToIndex(el: HTMLElement, index: number, count: number) {
  const max = el.scrollHeight - el.clientHeight; // hauteur scrollable en px
  const t = count <= 1 ? 0 : index / (count - 1); // [0..1]
  el.scrollTo({ top: t * max - index * 40, behavior: "smooth" });
}
