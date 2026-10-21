export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  name: "CL Visual Maker — Artiste vidéaste & photographe",
  brand: "CL Visual Maker",
  tagline: "CLVM | Artiste vidéaste & photographe.",
  description:
    "CL Visual Maker (CLVM) — Corentin Linares, artiste vidéaste et photographe. Films de marque, photographie d'art et commerciale, contenus haut de gamme et prises de vue aériennes par drone, réalisés en France et partout dans le monde.",
  keywords: [
    "artiste vidéaste",
    "artiste photographe",
    "vidéaste et photographe",
    "photographe international",
    "vidéaste international",
    "photographe luxe",
    "vidéaste luxe",
    "film de marque",
    "photographie haut de gamme",
    "production vidéo haut de gamme",
    "vidéo hôtellerie de luxe",
    "vidéo immobilier de prestige",
    "vidéaste évènementiel",
    "photographe évènementiel",
    "réalisateur vidéo",
    "télépilote drone",
    "prise de vue aérienne drone",
    "photographe",
    "filmmaker",
    "freelance filmmaker",
    "travel filmmaker",
    "luxury filmmaker",
    "luxury photographer",
    "luxury brand film",
    "video artist",
    "destination videographer",
    "drone filmmaker",
    "filmmaker worldwide",
    "photographer worldwide",
  ],
  // Business info (used for LocalBusiness JSON‑LD)
  business: {
    legalName: "CL Visual Maker",
    email: "linarescorentin@gmail.com",
    phone: "+33 7 84 10 35 54",
    logo: "/logo-clvm.png",
    image: "/og-clvm.png", // main brand image
    priceRange: "$$$", // $, $$, $$$ …
    address: {
      streetAddress: "9 allée des salamandres",
      addressLocality: "Gradignan",
      postalCode: "33170",
      addressCountry: "FR",
    },
    sameAs: [
      "https://www.instagram.com/corentin.linares/",
      "https://www.youtube.com/@corentinlinares",
      "https://www.facebook.com/cl.visualmaker",
      // add LinkedIn/YouTube/TikTok/Behance, etc.
    ],
    openingHours: [
      // Optional; remove if not relevant
      "Mo-Fr 09:00-18:00",
    ],
    areaServed: [
      "Worldwide",
      "Europe",
      "France",
    ],
  },
} as const;
