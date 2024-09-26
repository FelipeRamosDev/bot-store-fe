'use client';
import './Home.scss';
import { useRouter } from 'next/navigation';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';
import SlotTilesImg from './img/SlotTilesImg';

export default function HomeContent() {
   const router = useRouter();

   return (<>
      <HomeTopBanner />

      <div className="home-content">
         <section className="features">
            <div className="container">
               <h2 className="title">Follow the TRADES your bot is doing with EASE</h2>

               <ContentSplit className="content">
                  <div className="column image-spot">
                     <SlotTilesImg />
                  </div>

                  <div className="column marketing-cta right">
                     <span className="message line1">Create slots to <span className="grad-txt">CONTROL BOTS</span></span>
                     <span className="message line2"> <span className="grad-txt">CHOOSE A BOT</span> to START</span>

                     <p className="description">
                        Control the bots you are using into slots to have better visibility of the current trade state, the stoploss and takeprofit.
                     </p>

                     <CTAButton className="d-large" size="medium" onClick={() => router.push('/dashboard')}>Let&apos;s Start</CTAButton>
                  </div>
               </ContentSplit>
            </div>
         </section>
      </div>
   </>);
}
