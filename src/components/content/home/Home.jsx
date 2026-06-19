'use client';

import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';
import BinanceIntegration from './binanceIntegration/BinanceIntegration';
import ChooseBot from './chooseBot/ChooseBot';
import CreateYourBot from './createYourBot/CreateYourBot';
import PlansGrid from '../../grids/plansGrid/PlansGrid';
import { useEffect, useRef, useState } from 'react';

export default function HomeContent() {
   const [shouldLoadPlans, setShouldLoadPlans] = useState(false);
   const sentinel = useRef();

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setShouldLoadPlans(true);
               observer.disconnect();
            }
         },
         { rootMargin: '500px 0px' }
      );

      if (sentinel.current) {
         observer.observe(sentinel.current);
      }

      return () => observer.disconnect();
   }, []);

   return (<>
      <HomeTopBanner />

      <div className="home-content">
         <BinanceIntegration />
         <ChooseBot />
         <CreateYourBot />
         <div ref={sentinel}>
            {shouldLoadPlans && <PlansGrid />}
         </div>
      </div>
   </>);
}
