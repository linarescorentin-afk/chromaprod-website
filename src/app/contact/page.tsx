import ContactPage from "@/components/contact/ContactPage";
import PageTransition from "@/components/ui/animated/PageTransition";

function page() {
  return (
    <PageTransition>
      <ContactPage />
    </PageTransition>
  );
}

export default page;
