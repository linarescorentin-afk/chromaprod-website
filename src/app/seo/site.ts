export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  name: "Chroma Production — Vidéaste & Photographe à Montréal",
  brand: "Chroma Production",
  tagline: "Vidéaste & Photographe indépendant à Montréal et au Québec",
  description:
    "Vidéaste et photographe indépendant à Montréal. Films corporate, évènementiel, pub, et photographie professionnelle au Québec.",
  keywords: [
    "vidéaste indépendant montréal",
    "photographe indépendant montréal",
    "production vidéo montréal",
    "agence communication vidéo montréal",
    "corporate video montreal",
    "social media video montreal",
    "event videographer montreal",
    "corporate photo montreal",
    "social media photo montreal",
    "event photographer montreal",
    "studio photo montréal",
    "photographe professionnel montréal",
    "photographe corporate montréal",
    "photographe évènementiel montréal",
    "photo entreprise montréal",
    "video production quebec",
    "videographer quebec",
    "video production france",
    "videographer france",
    "photographe professionnel quebec",
    "photographe professionnel france",
    "photographe professionnel bordeaux",
    "videaste professionnel bordeaux",
  ],
  // Business info (used for LocalBusiness JSON‑LD)
  business: {
    legalName: "Chroma Production",
    email: "linarescorentin@gmail.com",
    phone: "+1 438 439 1921",
    logo: "/logos/chromalogo.png", // place a real logo in /public/og/
    image: "/coverChromProd.png", // main brand image
    priceRange: "$$", // $, $$, $$$ …
    address: {
      streetAddress: "5250 Rue Molson",
      addressLocality: "Montréal",
      addressRegion: "QC",
      postalCode: "H1Y 0C7",
      addressCountry: "CA",
    },
    geo: {
      latitude: 45.556, // put your true lat
      longitude: -73.568, // put your true lng
    },
    sameAs: [
      "https://www.instagram.com/corentin.linares/",
      "https://www.youtube.com/@corentinlinares",
      "https://www.facebook.com/cl.visualmaker",
      "https://www.tiktok.com/@chromaprodmtl",
      // add LinkedIn/YouTube/TikTok/Behance, etc.
    ],
    openingHours: [
      // Optional; remove if not relevant
      "Mo-Fr 09:00-18:00",
    ],
    areaServed: [
      "Montréal",
      "Québec",
      "Canada",
      "France",
      "Bordeaux",
      "international",
    ],
  },
} as const;
