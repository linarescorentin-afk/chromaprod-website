import AboutPage from "@/components/about/AboutPage";
import PageTransition from "@/components/ui/animated/PageTransition";
import React from "react";

function page() {
  return (
    <PageTransition>
      <AboutPage />
    </PageTransition>
  );
}

export default page;
