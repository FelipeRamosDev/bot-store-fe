import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';
import BTCSlotTilesImg from './img/BTCSlotTilesImg';
import { useMemo } from 'react';
import Image from 'next/image';
import BinanceLogo from '@/assets/binance_logo.svg';

export default function HomeContent() {
   const chartCanvas = useMemo(async () => <BTCSlotTilesImg />, []);

   return (<>
      <HomeTopBanner chartCanvas={chartCanvas} />

      <div className="home-content">
         <section className="features">
            <div className="container">
               <h2 className="title">Binance API Integration</h2>

               <ContentSplit className="content">
                  <div className="column image-spot">
                     <div className="dashed-wrap">
                        <span className="watermark">API INTEGRATION</span>
                     </div>

                     <Image className="binance-logo" src={BinanceLogo} alt="Binance Logo" height={150} width={150} />
                     {chartCanvas}
                  </div>

                  <div className="column marketing-cta right">
                     <h3 className="message line1">Generate an <span className="grad-txt">API/SECRET KEY</span> and</h3>
                     <span className="message line2">Connect your <span className="grad-txt">BINANCE</span> wallet</span>

                     <p className="description">
                        Automate your Binance Futures trades chossing a bot available on the store.
                     </p>

                     <CTAButton className="d-large" size="medium" url="/dashboard">Let&apos;s Start</CTAButton>
                  </div>
               </ContentSplit>
            </div>
         </section>
      </div>
   </>);
}
