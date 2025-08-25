import { getSocialMedia, SocialMedia } from "@/sanity/lib/getSocialMedia";
import { useIsHomeAnimated } from "@/store/isHomeAnimated";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SocialMediaComponent() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[] | null>(null);
  const { isHomeAnimated } = useIsHomeAnimated();

  useEffect(() => {
    const fetchSocialMedia = async () => {
      const data = await getSocialMedia();
      setSocialMedia(data);
    };

    fetchSocialMedia();
  }, []);
  return (
    <>
      {socialMedia && (
        <div
          className={`flex  flex-col items-end space-y-2 fixed font-bold top-1/2  -translate-y-1/2 right-5 lg:right-10 font-karla text-[12px] mix-blend-difference z-30 underline ${isHomeAnimated ? "translate-x-0" : "translate-x-[500%]"} transition-all transform ease-in-out duration-[3000ms]`}
        >
          {socialMedia.map((item) => (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={item.image}
                alt={item.platform}
                width={30}
                height={30}
              />
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default SocialMediaComponent;
