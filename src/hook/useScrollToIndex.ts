// utils/photoScroll.ts
export function scrollToIndex(
  el: HTMLElement,
  index: number,
  count: number,
  windowsHeight?: number,
) {
  console.log(windowsHeight);
  const max = el.scrollHeight - el.clientHeight; // hauteur scrollable en px
  const t = count <= 1 ? 0 : index / (count - 1); // [0..1]
  const windowsHeightFactor = windowsHeight ? windowsHeight * 0.031 : 1;
  console.log({ max, t, windowsHeightFactor });
  el.scrollTo({
    top: t * max - index * windowsHeightFactor,
    behavior: "smooth",
  });
}
