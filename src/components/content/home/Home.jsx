import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';
import BinanceIntegration from './binanceIntegration/BinanceIntegration';
import ChooseBot from './chooseBot/ChooseBot';
import CreateYourBot from './createYourBot/CreateYourBot';

export default function HomeContent() {
   return (<>
      <HomeTopBanner />

      <div className="home-content">
         <BinanceIntegration />
         <ChooseBot />
         <CreateYourBot />
      </div>
   </>);
}
