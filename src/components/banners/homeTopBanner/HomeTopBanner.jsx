import './HomeTopBanner.scss';
import CTAButton from '@/components/common/CTAButton/CTAButton';

export default function HomeTopBanner() {
   return <section className="top-banner">
      <div className="content container">
         <div className="column marketing-cta">
            <p className="message line1">Let the <span className="grad-txt">MACHINE WORK</span> for you</p>
            <p className="message line2">Choose a <span className="grad-txt">BOT to START</span></p>

            <CTAButton size="large">Go to Store</CTAButton>
         </div>

         <div className="column image-spot">

         </div>
      </div>
   </section>;
}
