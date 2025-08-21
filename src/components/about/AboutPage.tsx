"use client";
import { getSocialMedia, SocialMedia } from "@/sanity/lib/getSocialMedia";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import { h2 } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

function AboutPage() {
  const { selectedLanguage } = useIsSelectedLanguage();
  const [socialMedia, setSocialMedia] = useState<SocialMedia[] | null>(null);
  useEffect(() => {
    const fetchSocialMedia = async () => {
      const data = await getSocialMedia();
      setSocialMedia(data);
    };

    fetchSocialMedia();
  }, []);
  const content = useMemo(() => {
    return {
      h1: {
        fr: "Les passionnés me passionnent",
        en: "Passionate people inspire me",
      },
      h2: {
        fr: "“Chroma Production est une entreprise de production audiovisuelle passionnée par la création de contenus visuels exceptionnels. Notre équipe talentueuse travaille avec engagement pour donner vie à des projets uniques et innovants. Nous sommes fiers de raconter des histoires captivantes à travers la puissance de l'audiovisuel.“",
        en: "“Chroma Production is a passionate audiovisual production company dedicated to creating exceptional visual content. Our talented team works diligently to bring unique and innovative projects to life. We take pride in telling captivating stories through the power of audiovisual media.“",
      },
      h3: {
        fr: "“Pendant plus de 10 ans, j’ai affiné mon savoir-faire à travers des projets variés, des collaborations enrichissantes et des défis relevés avec passion.“",
        en: "“For over 10 years, I have refined my expertise through diverse projects, enriching collaborations, and challenges met with passion.“",
      },

      services: [
        {
          titleFr: "CORPORATE",
          titleEn: "CORPORATE",
          image: "/services/corporate.webp",
          textFr:
            "Nous mettons en valeur votre entreprise avec des vidéos et photos corporate de haute qualité. Interviews, films d’entreprise, portraits professionnels ou contenu institutionnel, nous créons des visuels impactants qui reflètent votre image de marque. Grâce aux dernières technologies, nous vous offrons un rendu cinématographique pour vos communications internes et externes.",
          textEn:
            "We showcase your company with high-quality corporate videos and photos. Interviews, corporate films, professional portraits, or institutional content, we create impactful visuals that reflect your brand image. With the latest technologies, we offer you a cinematic rendering for your internal and external communications.",
        },
        {
          titleFr: "ÉVÉNEMENTIEL",
          titleEn: "EVENT",
          image: "/services/event.webp",
          textFr:
            "Boostez votre présence en ligne avec du contenu visuel percutant et optimisé pour Instagram, TikTok, YouTube et LinkedIn.  Nous créons des vidéos et photos adaptées aux tendances digitales, captivant votre audience avec un storytelling efficace. Formats courts, reels, publicités ou brand content, notre expertise garantit un rendu professionnel et engageant.",
          textEn:
            "Boost your online presence with impactful visual content optimized for Instagram, TikTok, YouTube, and LinkedIn. We create videos and photos tailored to digital trends, captivating your audience with effective storytelling. Short formats, reels, ads, or brand content, our expertise ensures a professional and engaging result.",
        },
        {
          titleFr: "RÉSEAUX SOCIAUX",
          titleEn: "SOCIAL MEDIA",
          image: "/services/social.webp",
          textFr:
            "Immortalisez vos événements avec des vidéos et photos dynamiques capturant chaque moment clé. Que ce soit pour des conférences, concerts, mariages ou lancements de produits, nous assurons une couverture professionnelle, au sol et par drone, avec un rendu cinématographique. Offrez à votre public une immersion unique et prolongez l’impact de vos événements.",
          textEn:
            "Capture your events with dynamic videos and photos that capture every key moment. Whether for conferences, concerts, weddings, or product launches, we ensure professional coverage, both on the ground and by drone, with a cinematic rendering. Give your audience a unique immersion and extend the impact of your events.",
        },
      ],
      logoPartners: [
        "/logos/GLlogo.webp",
        "/logos/googlelogo.webp",
        "/logos/Huawei-Logo.webp",
        "/logos/Logo-Elwing.webp",
        "/logos/Logo-Panajou.webp",
        "/logos/piscine-france.webp",
        "/logos/Logo-Bordeaux-Metropole.webp",
        "/logos/LOGO-CITADIUM.webp",
      ],
      clientComments: [
        {
          name: "Yann G.",
          commentFr:
            "Merci Corentin pour les vidéos d'une qualité absolument incroyable. L'œil, le timing, la dynamique, la qualité d'image, tout y est !",
          commentEn:
            "Thank you Corentin for the absolutely incredible quality videos. The eye, the timing, the dynamics, the image quality, it's all there!",
        },
        {
          name: "Louis O.",
          commentFr:
            "Production exceptionnelle avec Chroma. Le sentiment d'avoir été écouté dès le début du projet pour un résultat incroyable qui reflète clairement ma vision et mes attentes du projet que je voulais amener.",
          commentEn:
            "Exceptional production with Chroma. I felt heard from the very beginning of the project, resulting in an incredible outcome that clearly reflects my vision and expectations for the project I wanted to bring to life.",
        },
        {
          name: "Kevin B.",
          commentFr:
            "Une expérience de collaboration incroyable avec Chroma. Leur équipe a su comprendre mes besoins et les traduire en un produit final qui a dépassé mes attentes.",
          commentEn:
            "An amazing collaboration experience with Chroma. Their team understood my needs and translated them into a final product that exceeded my expectations.",
        },
      ],
    };
  }, []);

  return (
    <div className="lg:py-0 py-20 font-karla uppercase flex flex-col items-center space-y-20">
      {/* SECTION 1 */}
      <div className="-translate-y-10 lg:translate-y-0 relative lg:pt-28 lg:min-h-screen">
        <div className="flex flex-col lg:flex-row lg:items-start  h-[82vh]">
          <div className="flex flex-col justify-between h-full  lg:min-h-[80vh] lg:w-12/12 lg:pl-5">
            <div className="w-full flex justify-between pr-10">
              <h1 className="font-karantina text-[100px] lg:text-[150px] leading-[80px] lg:leading-[120px]   px-5 translate-y-20 lg:translate-y-0 lg:max-w-[700px] lg:w-6/12">
                {selectedLanguage === "fr"
                  ? content.h1.fr.toUpperCase()
                  : content.h1.en.toUpperCase()}
              </h1>
              <div className="text-right text-sm">
                <p>CORENTIN LIENARS</p>
              </div>
            </div>
            <div className="mt-10 w-full hidden lg:flex  justify-between items-end px-10">
              <h3 className="w-2/12  italic text-sm">
                {selectedLanguage === "fr" ? content.h3.fr : content.h3.en}
              </h3>
              <h2 className="lg:w-3/12 border-b pb-10">
                {selectedLanguage === "fr" ? content.h2.fr : content.h2.en}
              </h2>
            </div>
          </div>
          <div className="flex relative flex-col items-end space-y-2  lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 -z-10  lg:h-11/12 lg:w-4/12 h-[80vh]">
            <Image
              src="/corentinlinares.webp"
              alt="corentinlinares"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <h3 className="w-10/12 mt-5  italic text-sm  px-5 lg:hidden text-left">
          {selectedLanguage === "fr" ? content.h3.fr : content.h3.en}
        </h3>
        <div className="mt-20 w-full   px-5 lg:hidde flex justify-end lg:hidden">
          <h2 className="border-b pb-10 w-8/12">
            {selectedLanguage === "fr" ? content.h2.fr : content.h2.en}
          </h2>
        </div>
      </div>

      <div>
        {content.services.map((service) => (
          <div
            className="border-y border-dashed py-10 space-y-5 flex flex-col px-5 lg:flex-row justify-between"
            key={service.titleFr}
          >
            <h3 className="font-bold text-xl">{service.titleFr}</h3>
            <Image
              src={service.image}
              alt={service.titleFr}
              width={500}
              height={500}
            />
            <p className="lg:w-4/12">{service.textFr}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-10 items-center justify-center px-5 lg:px-10">
        {content.logoPartners.map((logo) => (
          <Image
            key={logo}
            src={logo}
            alt="Partenaire"
            width={120}
            height={100}
          />
        ))}
      </div>

      <div className="space-y-10 lg:flex lg:flex-wrap lg:items-start lg:w-6/12">
        {content.clientComments.map((comment, index) => (
          <div
            key={index}
            className="border-b lg:border-b-0 lg:border-l border-dashed  py-5 px-5 flex flex-col space-y-5 lg:h-[200px] "
          >
            <p className="font-bold text-lg">{comment.name}</p>
            <p>
              {selectedLanguage === "fr"
                ? comment.commentFr
                : comment.commentEn}
            </p>
          </div>
        ))}
      </div>

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
            src={"/mtlcontact.webp"}
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
