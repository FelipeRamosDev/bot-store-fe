import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';
import BinanceIntegration from './binanceIntegration/BinanceIntegration';
import ChooseBot from './chooseBot/ChooseBot';

export default function HomeContent() {
   return (<>
      <HomeTopBanner />

      <div className="home-content">
         <BinanceIntegration />
         <ChooseBot />
      </div>
   </>);
}
