export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  name: "CL VisualMaker — Vidéaste & Photographe à Montréal",
  brand: "CL VisualMaker",
  tagline: "CLVM | Vidéaste, Photographe, télépilote de drone.",
  description:
    "CL Visualmaker est une entreprise de production audiovisuelle passionnée par la création de contenus visuels exceptionnels. Notre équipe talentueuse travaille avec engagement pour donner vie à des projets uniques et innovants. Nous sommes fiers de raconter des histoires captivantes à travers la puissance de l'audiovisuel.",
  keywords: [
    "vidéaste indépendant" ,
    "photographe indépendant" ,
    "production vidéo" ,
    "agence communication vidéo" ,
    "corporate video montreal",
    "social media video montreal",
    "event videographer montreal",
    "corporate photo montreal",
    "social media photo montreal",
    "event photographer montreal",
    "studio photo" ,
    "photographe professionnel" ,
    "photographe corporate" ,
    "photographe évènementiel" ,
    "photo entreprise" ,
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
    logo: "/chromalogo.png", // place a real logo in /public/og/
    image: "/coverChromProd.png", // main brand image
    priceRange: "$$", // $, $$, $$$ …
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
      "https://www.tiktok.com/@chromaprodmtl",
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
