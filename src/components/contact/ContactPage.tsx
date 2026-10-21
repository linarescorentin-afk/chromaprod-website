"use client";
import { getContactSettings } from "@/sanity/lib/getContactSettings";
import { ContactSettings } from "@/sanity/types/contact";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import LenisProvider from "../LenisProvider";
import { useInView } from "react-intersection-observer";
import AnimUp from "../ui/animated/AnimUp";
import { useIsAnimated } from "@/store/useIsAnimated";

function ContactPage({
  initialContent = null,
}: {
  initialContent?: ContactSettings | null;
}) {
  const { selectedLanguage } = useIsSelectedLanguage();
  const {
    isContactAnimated,
    setIsContactAnimated,
    isNavBarAnimated,
    setIsNavBarAnimated,
  } = useIsAnimated();
  const [content, setContent] = useState<ContactSettings | null>(
    initialContent,
  );
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      setIsContactAnimated(true);
    }
  }, [inView, setIsContactAnimated]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContactSettings();
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch contact settings:", error);
      }
    };

    if (!isNavBarAnimated) {
      setIsNavBarAnimated(true);
    }

    if (!initialContent) {
      fetchContent();
    }
  }, [isNavBarAnimated, setIsNavBarAnimated, initialContent]);

  const isContentAvailable = useMemo(() => {
    return content !== null;
  }, [content]);

  if (!isContentAvailable || !content) return null;

  const activePhone = content.phone?.ca || "+1 438 439 1921";
  const cleanPhoneHref = `tel:${activePhone.replace(/\s+/g, "")}`;

  return (
    <LenisProvider>
      <div
        ref={ref}
        className="py-20 lg:pt-20 lg:pb-0 font-karla flex flex-col lg:flex-row lg:h-screen bg-black text-white"
      >
        <div
          className={`px-5 lg:w-6/12 lg:px-10 lg:py-8 space-y-10 ${isContactAnimated ? "translate-x-0" : "-translate-x-full"} transition-all ease-in-out duration-[2000ms] h-full flex flex-col justify-between`}
        >
          <div className="space-y-8 lg:space-y-10">
            {/* CONTACT */}
            <div className="space-y-3 lg:text-base">
              <AnimUp duration={1.5} inView={isContactAnimated}>
                <h2 className="font-bold border-b pb-2 border-dashed uppercase">
                  {selectedLanguage === "fr" ? "CONTACT" : "CONTACT"}
                </h2>
              </AnimUp>
              <div className="space-y-1.5">
                <AnimUp duration={1.7} inView={isContactAnimated}>
                  <a
                    href={cleanPhoneHref}
                    className="underline hover:opacity-75 transition-opacity block"
                  >
                    {activePhone}
                  </a>
                </AnimUp>
                <AnimUp duration={1.9} inView={isContactAnimated}>
                  <a
                    href={`mailto:${content.mail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-75 transition-opacity block"
                  >
                    {content.mail}
                  </a>
                </AnimUp>
              </div>
            </div>

            {/* ADRESSE */}
            <div className="space-y-3 lg:text-base">
              <AnimUp duration={2.0} inView={isContactAnimated}>
                <h2 className="font-bold border-b pb-2 border-dashed uppercase">
                  {selectedLanguage === "fr" ? "ADRESSE" : "ADDRESS"}
                </h2>
              </AnimUp>
              <AnimUp duration={2.1} inView={isContactAnimated}>
                <p>{content.address}</p>
              </AnimUp>
            </div>

            {/* HORAIRES */}
            <div className="space-y-3 lg:text-base">
              <AnimUp duration={2.2} inView={isContactAnimated}>
                <h2 className="font-bold border-b pb-2 border-dashed uppercase">
                  {selectedLanguage === "fr" ? "HORAIRES" : "HOURS"}
                </h2>
              </AnimUp>
              <div className="space-y-1.5">
                <AnimUp duration={2.3} inView={isContactAnimated}>
                  <p>
                    {selectedLanguage === "fr"
                      ? "7/7 SUR RDV de 9h à 18h"
                      : "7/7 BY APPOINTMENT from 9am to 6pm"}
                  </p>
                </AnimUp>
                <AnimUp duration={2.4} inView={isContactAnimated}>
                  <p>
                    {selectedLanguage === "fr"
                      ? "URGENCES (TOURNAGE) : 24/7"
                      : "EMERGENCY (FILMING) : 24/7"}
                  </p>
                </AnimUp>
              </div>
            </div>
          </div>
          <AnimUp duration={3.0} inView={isContactAnimated}>
            <span className="text-xs hidden lg:flex">
              WEBSITE DEVELOPED & DESIGNED BY THOMAS BARRIAL || 2026
            </span>
          </AnimUp>
        </div>
        <div
          className={`h-[500px] lg:h-full lg:w-6/12 flex relative lg:fixed lg:right-0 lg:top-0 ${isContactAnimated ? "translate-x-0" : "translate-x-full"} transition-all ease-in-out duration-[2000ms]`}
        >
          <Image
            src={content.image ? (content.image.url as string) : "/contact.jpg"}
            alt="Contact"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <span className="text-xs mt-10 lg:hidden flex px-5">
          WEBSITE DEVELOPED & DESIGNED BY THOMAS BARRIAL || 2026
        </span>
      </div>
    </LenisProvider>
  );
}

export default ContactPage;
