import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";
import HomeBannerImage from "@/components/banners/homeTopBanner/homeBannerImage/HomeBannerImage";

export default function WhatsIsCandlePilot() {
   return (
      <div className="what-is-candlepilot-content">
         <StandardPageHeader pageTitle="What Is CandlePilot" titleLabel="How it works" Background={HomeBannerImage} />
      </div>
   );
}
