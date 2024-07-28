import './Home.scss';
import Image from 'next/image';
import SlotTileImage from '@/assets/slot_tile.svg';
import CTAButton from '@/components/common/CTAButton/CTAButton';

export default function Home() {
   return <section className="home-content">
      <div className="features">
         <div className="container">
            <h2 className="title">Follow the TRADES your bot is doing with EASE</h2>

            <div className="content">
               <div className="column image-spot">
                  <Image src={SlotTileImage} alt="Slot Tile" />
               </div>

               <div className="column marketing-cta right">
                  <span className="message line1">Let the <span className="grad-txt">MACHINE WORK</span> for you</span>
                  <span className="message line2">Choose a <span className="grad-txt">BOT to START</span></span>

                  <p className="description">Go to the store session to check the bot available to use, use the rank to take the winner and always follow the bot developer recommendations.</p>
                  <CTAButton size="large">Go to Store</CTAButton>
               </div>
            </div>
         </div>

         <div className="container">
            <h2 className="title">Check the BOTs score on the STORE before choosing one</h2>

            <div className="content">
               <div className="column marketing-cta">
                  <span className="message line1">Check the <span className="grad-txt">RANK</span></span>
                  <span className="message line2">and take <span className="grad-txt">Winner Bot</span></span>

                  <p className="description">Go to the store session to check the bot available to use, use the rank to take the winner and always follow the bot developer recommendations.</p>
                  <CTAButton size="large">Go to Store</CTAButton>
               </div>

               <div className="column image-spot right">
                  <Image src={SlotTileImage} alt="Slot Tile" />
               </div>
            </div>
         </div>
      </div>
   </section>;
}
