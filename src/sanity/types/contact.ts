export type LocaleString = { fr?: string; en?: string };

export type OpeningHours = {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
};

export type ContactSettings = {
  h1: LocaleString;
  address: string;
  phone?: { ca?: string; fr?: string };
  mail: string;
  hours?: OpeningHours;
  image?: { url?: string; alt?: string };
};
