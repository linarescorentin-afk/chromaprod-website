import { SocialMedia } from "@/sanity/lib/getSocialMedia";
import { AboutSettings } from "@/sanity/types/about";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import Image from "next/image";
import Link from "next/link";

function Section5({
  about,
  socialMedia,
}: {
  about: AboutSettings;
  socialMedia: SocialMedia[] | null;
}) {
  const { selectedLanguage } = useIsSelectedLanguage();
  return (
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
  );
}

export default Section5;
