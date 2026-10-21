export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  name: "CL Visual Maker — Vidéaste & Photographe de luxe à Bordeaux",
  brand: "CL Visual Maker",
  tagline: "CLVM | Vidéaste, Photographe, télépilote de drone.",
  description:
    "CL Visual Maker (CLVM) est une société de production audiovisuelle haut de gamme basée à Bordeaux. Vidéo, photographie et prises de vue aériennes par drone pour les marques de luxe, l'hôtellerie, l'immobilier de prestige et l'événementiel, en France et partout dans le monde.",
  keywords: [
    "vidéaste luxe",
    "vidéaste bordeaux",
    "photographe bordeaux",
    "production vidéo bordeaux",
    "production vidéo luxe",
    "film de marque luxe",
    "vidéo immobilier de prestige",
    "vidéo hôtellerie de luxe",
    "vidéaste mariage de luxe",
    "vidéaste évènementiel",
    "photographe évènementiel",
    "photographe corporate",
    "télépilote drone bordeaux",
    "prise de vue aérienne drone",
    "vidéaste indépendant",
    "photographe indépendant",
    "videographer bordeaux",
    "luxury videographer",
    "luxury video production france",
    "luxury brand film",
    "drone videographer france",
    "videographer france",
    "photographe professionnel france",
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
      "France",
      "Bordeaux",
      "international",
    ],
  },
} as const;
