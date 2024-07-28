import BasePage from "@/templates/basePage/BasePage";
import HomeTopBanner from "@/components/banners/homeTopBanner/HomeTopBanner";
import HomeContent from "@/components/content/home/Home";

export default function HomePage() {
   return <BasePage>
      <HomeTopBanner />

      <HomeContent />
   </BasePage>;
}
