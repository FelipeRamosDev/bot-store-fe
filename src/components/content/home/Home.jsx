import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';
import BinanceIntegration from './binanceIntegration/BinanceIntegration';
import ChooseBot from './chooseBot/ChooseBot';
import CreateYourBot from './createYourBot/CreateYourBot';
import PlansGrid from '../../grids/plansGrid/PlansGrid';

export default function HomeContent() {
   return (<>
      <HomeTopBanner />

      <div className="home-content">
         <BinanceIntegration />
         <ChooseBot />
         <CreateYourBot />
         <PlansGrid />
      </div>
   </>);
}
