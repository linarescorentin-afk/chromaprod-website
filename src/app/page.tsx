import HomeComponent from "@/components/HomeComponent";
import PageTransition from "@/components/ui/animated/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <HomeComponent />
    </PageTransition>
  );
}
