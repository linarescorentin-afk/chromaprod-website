import type { Metadata } from "next";
import { Karantina, Karla } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";
import IntroWebsite from "@/components/loader/IntroWebsite";
import { site } from "./seo/site";
import { Analytics } from "@vercel/analytics/next";

const karantina = Karantina({
  variable: "--font-karantina",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const metadataBase = new URL(site.url);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${site.brand} — ${site.tagline}`,
    template: `%s — ${site.brand}`,
  },
  description: site.description,
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
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.brand,
    title: `${site.brand} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: `${site.url}/coverChromProd.png`,
        width: 1200,
        height: 630,
        alt: `${site.brand} — ${site.tagline}`,
      },
    ],
    locale: "fr_CA",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};

function JsonLd<T>({ data }: { data: T }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: site.brand,
    url: site.url,
    legalName: site.business.legalName,
    image: new URL(site.business.image, site.url).toString(),
    logo: new URL(site.business.logo, site.url).toString(),
    description: site.description,
    telephone: site.business.phone,
    email: site.business.email,
    priceRange: site.business.priceRange,
    sameAs: site.business.sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.business.address.streetAddress,
      addressLocality: site.business.address.addressLocality,
      addressRegion: site.business.address.addressRegion,
      postalCode: site.business.address.postalCode,
      addressCountry: site.business.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.business.geo.latitude,
      longitude: site.business.geo.longitude,
    },
    openingHours: site.business.openingHours,
    areaServed: site.business.areaServed,
  };

  // JSON-LD WebSite + SearchAction
  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: site.url,
    name: site.brand,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="fr-CA">
      <head>
        <JsonLd data={localBusiness} />
        <JsonLd data={webSite} />
      </head>
      <body
        className={`${karla.variable} ${karantina.variable} antialiased bg-black`}
      >
        <NavBar />
        <Analytics />
        <IntroWebsite />

        {children}
      </body>
    </html>
  );
}
