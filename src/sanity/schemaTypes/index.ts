import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { photoType } from "./photo";
import { videoType } from "./video";
import { socialMedia } from "./socialMedia";
import localeString from "./objects/localString";
import localeText from "./objects/localText";
import serviceItem from "./servicesItems";
import clientComment from "./clientComments";
import aboutSettings from "./aboutSettings";
import contactSettings from "./contactSettings";
import phoneNumber from "./objects/phoneNumber";
import openingHours from "./objects/openingHours";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    photoType,
    videoType,
    socialMedia,
    aboutSettings,
    localeString,
    localeText,
    serviceItem,
    clientComment,
    contactSettings,
    phoneNumber,
    openingHours,
  ],
};
