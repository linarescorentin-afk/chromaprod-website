// /sanity/types/about.ts
export type LocaleString = { fr?: string; en?: string };
export type LocaleText = { fr?: string; en?: string };

export type ServiceItem = {
  title: LocaleString;
  image?: { url?: string };
  text: LocaleText;
};

export type ClientComment = {
  name: string;
  comment: LocaleText;
};

export type AboutSettings = {
  h1: LocaleString;
  h2: LocaleText;
  h3: LocaleText;
  services: ServiceItem[];
  logoPartners: { url?: string; alt?: string }[];
  heroPortrait?: { url?: string };
  contactSideImage?: { url?: string };
  clientComments?: ClientComment[];
};
