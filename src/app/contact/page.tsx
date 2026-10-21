import ContactPage from "@/components/contact/ContactPage";
import { getContactSettings } from "@/sanity/lib/getContactSettings";
import type { Metadata } from "next";
import { site } from "../seo/site";

export const metadata: Metadata = {
  title: "Contact — Corentin Linares, Artiste vidéaste & photographe",
  description:
    "Contactez Corentin Linares (CL Visual Maker) pour vos projets de film de marque, photographie et prise de vue aérienne par drone en France et partout dans le monde.",
  alternates: { canonical: `${site.url}/contact` },
};

async function page() {
  const content = await getContactSettings();

  return (
    <div className="min-h-screen w-full bg-black">
      <ContactPage initialContent={content} />
    </div>
  );
}

export default page;
