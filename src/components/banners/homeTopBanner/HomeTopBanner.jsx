import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import HomeBannerImage from './homeBannerImage/HomeBannerImage';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';

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
               <Image className="big-logo" src={Logo} alt="BotStore Logo" width={130} height={130} />
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

            <HomeBannerImage className="column image-spot" />
         </ContentSplit>

         <div className="bg-1"></div>
         <div className="bg-2"></div>
         <div className="bg-3"></div>
         <div className="bg-4"></div>
         <div className="bg-rect"></div>
      </section>
   );
}
