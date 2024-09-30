import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';

/**
 * `HomeTopBanner` is a component that displays a promotional banner at the top of the home page.
 * It includes a message, a description, and a call-to-action button.
 *
 * @returns {JSX.Element} The rendered `HomeTopBanner` component with promotional text and a CTA button.
 */
export default function HomeTopBanner() {
   return (
      <section className="top-banner">
         <ContentSplit className="content container">
            <div className="column marketing-cta left">
               <p className="message line1">Let the <span className="grad-txt">Machine Trade</span> for you</p>
               <span className="message line2"> <span className="grad-txt">CHOOSE A BOT</span> to Start</span>

               <p className="description">Choose a trader bot to start and automate your trades, let the machine trade for you.</p>
               <CTAButton
                  className="d-large"
                  size="medium" 
                  url="/dashboard"
               >
                  Let&apos;s Start
               </CTAButton>
            </div>

            dasdasads
            {/* <HomeBannerImage className="column image-spot" /> */}
         </ContentSplit>
      </section>
   );
}
