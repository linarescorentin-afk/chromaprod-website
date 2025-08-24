"use client";
import { getContactSettings } from "@/sanity/lib/getContactSettings";
import { ContactSettings } from "@/sanity/types/contact";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function ContactPage() {
  const { selectedLanguage } = useIsSelectedLanguage();
  const [content, setContent] = useState<ContactSettings | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContactSettings();
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch contact settings:", error);
      }
    };

    fetchContent();
  }, []);

  const isContentAvailable = useMemo(() => {
    return content !== null;
  }, [content]);

  if (!isContentAvailable || !content) return null;

  return (
    <div className="py-20 font-karla flex flex-col lg:flex-row">
      <div className="px-5 lg:w-6/12 lg:px-10 lg:py-10 space-y-10">
        {/* <h1 className="font-karantina text-[100px] lg:text-[150px] leading-[80px] uppercase">
          {selectedLanguage === "fr" ? content.h1.fr : content.h1.en}
        </h1> */}

        <div className="space-y-5  lg:text-base">
          <h2 className="font-bold border-b pb-2 border-dashed">
            {selectedLanguage === "fr" ? "CONTACT" : "CONTACT"}
          </h2>
          <div className="space-y-2">
            <p>{content.phone?.fr}</p>
            <p>{content.phone?.ca}</p>
            <a
              href={`mailto:${content.mail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {content.mail}
            </a>
          </div>
        </div>

        <div className="space-y-5  lg:text-base">
          <h2 className="font-bold border-b pb-2 border-dashed">
            {selectedLanguage === "fr" ? "ADRESSE" : "ADDRESS"}
          </h2>
          <p>{content.address}</p>
        </div>

        <div className="space-y-5  lg:text-base ">
          <h2 className="font-bold border-b pb-2 border-dashed">
            {selectedLanguage === "fr" ? "HORAIRES" : "HOURS"}
          </h2>
          <div className="space-y-2">
            <p>{content.hours?.monday}</p>
            <p>{content.hours?.tuesday}</p>
            <p>{content.hours?.wednesday}</p>
            <p>{content.hours?.thursday}</p>
            <p>{content.hours?.friday}</p>
            <p>{content.hours?.saturday}</p>
            <p>{content.hours?.sunday}</p>
          </div>
        </div>
        <span className="text-xs pb-10 hidden lg:flex">
          WEBSITE DEVELOP & DESIGN BY THOMAS BARRIAL
        </span>
      </div>
      <div className=" h-[500px] lg:h-full bg-red-200 lg:w-6/12 flex relative lg:fixed lg:right-0 lg:top-0">
        <Image
          src={content.image ? (content.image.url as string) : "/contact.jpg"}
          alt="Contact"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <span className="text-xs mt-10 lg:hidden flex px-5">
        WEBSITE DEVELOP & DESIGN BY THOMAS BARRIAL
      </span>
    </div>
  );
}

export default ContactPage;
