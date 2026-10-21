import AboutPage from "@/components/about/AboutPage";
import { getAboutSettings } from "@/sanity/lib/getAboutSettings";
import { getSocialMedia } from "@/sanity/lib/getSocialMedia";
import type { Metadata } from "next";
import React from "react";
import { site } from "../seo/site";

export const metadata: Metadata = {
  title: "À propos — Corentin Linares, Artiste vidéaste & photographe",
  description:
    "Découvrez l'univers de Corentin Linares (CL Visual Maker) : artiste vidéaste et photographe spécialisé en hôtellerie de luxe (Resort), immobilier de prestige, film de marque, événementiel et prise de vue aérienne par drone partout dans le monde.",
  alternates: { canonical: `${site.url}/about` },
};

async function page() {
  const [about, socialMedia] = await Promise.all([
    getAboutSettings(),
    getSocialMedia(),
  ]);

  return (
    <div className="min-h-screen w-full bg-black">
      <AboutPage initialAbout={about} initialSocialMedia={socialMedia} />
    </div>
  );
}

export default page;
