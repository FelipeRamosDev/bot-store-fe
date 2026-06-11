import HomeBannerImage from "@/components/banners/homeTopBanner/homeBannerImage/HomeBannerImage";
import StandardPageHeader from "@/components/headers/standardPageHeader/StandardPageHeader";

export default function Wallets() {
   return (
      <div className="wallets-content">
         <StandardPageHeader pageTitle="Wallets" titleLabel="How it works" Background={HomeBannerImage} />
      </div>
   );
}
