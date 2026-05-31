'use client';

import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';
import BinanceIntegration from './binanceIntegration/BinanceIntegration';
import ChooseBot from './chooseBot/ChooseBot';
import CreateYourBot from './createYourBot/CreateYourBot';
import PlansGrid from '../../grids/plansGrid/PlansGrid';
import usePlans from '@/hooks/usePlans';

export default function HomeContent() {
   const { plans, loading } = usePlans();

   return (<>
      <HomeTopBanner />

      <div className="home-content">
         <BinanceIntegration />
         <ChooseBot />
         <CreateYourBot />
         <PlansGrid plans={plans} loading={loading} />
      </div>
   </>);
}
