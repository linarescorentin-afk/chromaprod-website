"use client";
import { getContactSettings } from "@/sanity/lib/getContactSettings";
import { ContactSettings } from "@/sanity/types/contact";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import LenisProvider from "../LenisProvider";
import { useInView } from "react-intersection-observer";
import AnimUp from "../ui/animated/AnimUp";

function ContactPage() {
  const { selectedLanguage } = useIsSelectedLanguage();
  const [content, setContent] = useState<ContactSettings | null>(null);
  const [ref, inView] = useInView({ threshold: 0.2 });
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
    <LenisProvider>
      <div ref={ref} className="py-20 font-karla flex flex-col lg:flex-row">
        <div
          className={`px-5 lg:w-6/12 lg:px-10 lg:py-10 space-y-10 ${inView ? "translate-x-0" : "-translate-x-full"} transition-all ease-in-out duration-[2000ms]`}
        >
          <div className="space-y-5  lg:text-base">
            <AnimUp duration={1.5} inView={inView}>
              <h2 className="font-bold border-b pb-2 border-dashed">
                {selectedLanguage === "fr" ? "CONTACT" : "CONTACT"}
              </h2>
            </AnimUp>
            <div className="space-y-2">
              <AnimUp duration={1.6} inView={inView}>
                <p>{content.phone?.fr}</p>
              </AnimUp>
              <AnimUp duration={1.7} inView={inView}>
                <p>{content.phone?.ca}</p>
              </AnimUp>
              <AnimUp duration={1.9} inView={inView}>
                <a
                  href={`mailto:${content.mail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {content.mail}
                </a>
              </AnimUp>
            </div>
          </div>

          <div className="space-y-5  lg:text-base">
            <AnimUp duration={2.0} inView={inView}>
              <h2 className="font-bold border-b pb-2 border-dashed">
                {selectedLanguage === "fr" ? "ADRESSE" : "ADDRESS"}
              </h2>
            </AnimUp>
            <AnimUp duration={2.1} inView={inView}>
              <p>{content.address}</p>
            </AnimUp>
          </div>

          <div className="space-y-5  lg:text-base ">
            <AnimUp duration={2.2} inView={inView}>
              <h2 className="font-bold border-b pb-2 border-dashed">
                {selectedLanguage === "fr" ? "HORAIRES" : "HOURS"}
              </h2>
            </AnimUp>
            <div className="space-y-2">
              <AnimUp duration={2.3} inView={inView}>
                <p>{content.hours?.monday}</p>
              </AnimUp>
              <AnimUp duration={2.4} inView={inView}>
                <p>{content.hours?.tuesday}</p>
              </AnimUp>
              <AnimUp duration={2.5} inView={inView}>
                <p>{content.hours?.wednesday}</p>
              </AnimUp>
              <AnimUp duration={2.6} inView={inView}>
                <p>{content.hours?.thursday}</p>
              </AnimUp>
              <AnimUp duration={2.7} inView={inView}>
                <p>{content.hours?.friday}</p>
              </AnimUp>
              <AnimUp duration={2.8} inView={inView}>
                <p>{content.hours?.saturday}</p>
              </AnimUp>
              <AnimUp duration={2.9} inView={inView}>
                <p>{content.hours?.sunday}</p>
              </AnimUp>
            </div>
          </div>
          <AnimUp duration={3.0} inView={inView}>
            <span className="text-xs pb-10 hidden lg:flex">
              WEBSITE DEVELOP & DESIGN BY THOMAS BARRIAL
            </span>
          </AnimUp>
        </div>
        <div
          className={`h-[500px] lg:h-full lg:w-6/12 flex relative lg:fixed lg:right-0 lg:top-0 ${inView ? "translate-x-0" : "translate-x-full"} transition-all ease-in-out duration-[2500ms]`}
        >
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
    </LenisProvider>
  );
}

export default ContactPage;
