import { AboutSettings } from "@/sanity/types/about";
import React from "react";
import OneServices from "./OneServices";

function Section2({ about }: { about: AboutSettings }) {
  return (
    <div>
      {about.services.map((service, index) => (
        <OneServices key={index} service={service} />
      ))}
    </div>
  );
}

export default Section2;
