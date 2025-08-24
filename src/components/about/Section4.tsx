import { AboutSettings } from "@/sanity/types/about";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import Image from "next/image";
import React from "react";

function Section2({ about }: { about: AboutSettings }) {
  const { selectedLanguage } = useIsSelectedLanguage();

  return (
    <div>
      {about.services.map((service, index) => (
        <div
          className={`border-y border-dashed space-y-5 flex flex-col px-5 lg:flex-row justify-between overflow-hidden sticky top-0 bg-black py-32`}
          key={index}
        >
          <h3 className="font-bold text-xl">
            {selectedLanguage === "fr" ? service.title.fr : service.title.en}
          </h3>

          {service.image && (
            <Image
              src={service.image.url as string}
              alt={service.title.fr ? service.title.fr : ""}
              width={500}
              height={500}
            />
          )}

          <p className="lg:w-4/12">{service.text.fr}</p>
        </div>
      ))}
    </div>
  );
}

export default Section2;
