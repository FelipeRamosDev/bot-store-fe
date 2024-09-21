import './Home.scss';
import Image from 'next/image';
import SlotTileImage from '@/assets/slot_tile.svg';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';

export default function HomeContent() {
   return (<>
      <HomeTopBanner />

      <div className="home-content">
         <section className="features">
            <div className="container">
               <h2 className="title">Follow the TRADES your bot is doing with EASE</h2>

               <ContentSplit className="content">
                  <div className="column image-spot">
                     <Image className="image" src={SlotTileImage} alt="Slot Tile" />
                  </div>

                  <div className="column marketing-cta right">
                     <span className="message line1">Let the <span className="grad-txt">MACHINE TRADE</span></span>
                     <span className="message line2">Choose a <span className="grad-txt">BOT to START</span></span>

                     <p className="description">Go to the store session to check the bot available to use, use the rank to take the winner and always follow the bot developer recommendations.</p>
                     <CTAButton className="d-large" size="medium">Go to Store</CTAButton>
                  </div>
               </ContentSplit>
            </div>
         </section>
      </div>
   </>);
}
