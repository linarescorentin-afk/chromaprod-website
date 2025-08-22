"use client";
import { getAboutSettings } from "@/sanity/lib/getAboutSettings";
import { getSocialMedia, SocialMedia } from "@/sanity/lib/getSocialMedia";
import { AboutSettings } from "@/sanity/types/about";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AboutPage() {
  const { selectedLanguage } = useIsSelectedLanguage();
  const [socialMedia, setSocialMedia] = useState<SocialMedia[] | null>(null);
  const [about, setAbout] = useState<AboutSettings | null>(null);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      const data = await getSocialMedia();
      setSocialMedia(data);
    };

    const fetchAbout = async () => {
      const data = await getAboutSettings();
      setAbout(data);
    };

    fetchSocialMedia();
    fetchAbout();
  }, []);

  if (!about || !socialMedia) return null;

  return (
    <div className="lg:pt-32 lg:pb-0 py-20 font-karla uppercase flex flex-col items-center space-y-20">
      {/* SECTION 1 */}
      <div className="-translate-y-10 lg:translate-y-0">
        <div className="flex flex-col lg:flex-row lg:items-start">
          <div className="flex flex-col justify-between h-full  lg:min-h-[80vh] lg:w-12/12 lg:pl-5">
            <h1 className="font-karantina text-[100px] lg:text-[150px] leading-[80px] lg:leading-[120px]   px-5 translate-y-20 lg:translate-y-0 lg:min-w-[800px]">
              {selectedLanguage === "fr"
                ? about.h1.fr?.toUpperCase()
                : about.h1.en?.toUpperCase()}
            </h1>
            <h2 className="mt-10 w-8/12 border-b pb-10  px-5 hidden lg:flex">
              {selectedLanguage === "fr" ? about.h2.fr : about.h2.en}
            </h2>
          </div>
          <div className="flex flex-col items-end space-y-2 w-full h-[90vh] ">
            <div className="relative w-full h-full">
              <Image
                layout="fill"
                objectFit="cover"
                className="mt-10 lg:mt-0"
                src={
                  about.heroPortrait
                    ? (about.heroPortrait.url as string)
                    : "/corentinlinares.webp"
                }
                alt="corentinlinares"
              />
            </div>
            <h3 className="w-10/12  italic text-sm  px-5 lg:w-full">
              {selectedLanguage === "fr" ? about.h3.fr : about.h3.en}
            </h3>
          </div>
        </div>
        <h2 className="mt-10 w-8/12 border-b pb-10  px-5 lg:hidden">
          {selectedLanguage === "fr" ? about.h2.fr : about.h2.en}
        </h2>
      </div>

      <div>
        {about.services.map((service, index) => (
          <div
            className="border-y border-dashed py-10 space-y-5 flex flex-col px-5 lg:flex-row justify-between"
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
      <div className="flex flex-wrap gap-10 items-center justify-center px-5 lg:px-10">
        {about.logoPartners.map((logo, index) => (
          <Image
            key={index}
            src={logo.url as string}
            alt="Partenaire"
            width={120}
            height={100}
          />
        ))}
      </div>
      {about.clientComments && (
        <div className="space-y-10 lg:flex lg:flex-wrap lg:items-start lg:w-6/12">
          {about.clientComments.map((comment, index) => (
            <div
              key={index}
              className="border-b lg:border-b-0 lg:border-l border-dashed  py-5 px-5 flex flex-col space-y-5 lg:h-[200px] "
            >
              <p className="font-bold text-lg">{comment.name}</p>
              <p>
                {selectedLanguage === "fr"
                  ? (comment.comment.fr as string)
                  : (comment.comment.en as string)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row  w-full ">
        <div className="px-5 lg:px-10 space-y-10 w-full lg:w-6/12 lg:py-20">
          <div className="space-y-5">
            <h2 className="font-karantina text-[100px] leading-[80px]">
              {selectedLanguage === "fr"
                ? "COMMENT POUVONS NOUS AIDER ?"
                : "LET'S WORK TOGETHER"}
            </h2>
            <Link href="/contact">
              <button className="border font-karantina text-4xl border-black px-5 py-2 bg-white text-black">
                {selectedLanguage === "fr"
                  ? "CONTACTER NOUS"
                  : "LET'S WORK TOGETHER"}
              </button>
            </Link>
          </div>
          <div className="space-y-5">
            <h3>Corentin Linares</h3>
            <h3>Video Making & Photography</h3>
          </div>

          <div className="space-y-2 flex flex-col">
            {socialMedia &&
              socialMedia.map((soc, key) => (
                <a
                  className="underline"
                  key={key}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h4>{soc.platform}</h4>
                </a>
              ))}
          </div>

          <span className="text-xs">
            WEBSITE develop & DESIGN BY THOMAS BARRIAL
          </span>
        </div>
        <div className="lg:w-6/12 hidden lg:flex bg-red-600 relative">
          <Image
            src={about.contactSideImage?.url || "/mtlcontact.webp"}
            alt="Contact"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
