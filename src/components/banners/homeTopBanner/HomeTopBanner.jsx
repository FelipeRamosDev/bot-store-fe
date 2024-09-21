'use client';
import './HomeTopBanner.scss';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import { useRouter } from 'next/navigation';

/**
 * `HomeTopBanner` is a component that displays a promotional banner at the top of the home page.
 * It includes a message, a description, and a call-to-action button.
 *
 * @returns {JSX.Element} The rendered `HomeTopBanner` component with promotional text and a CTA button.
 */
export default function HomeTopBanner() {
   const router = useRouter();

   return (
      <section className="top-banner">
         <ContentSplit className="content container">
            <div className="column marketing-cta left">
               <p className="message line1">Let the <span className="grad-txt">MACHINE TRADE</span></p>
               <p className="message line2">Choose a <span className="grad-txt">BOT to START</span></p>

               <p className="description">Choose a trader bot to start and automate your trades, let the machine trade for you.</p>
               <CTAButton className="d-large" size="medium" onClick={() => router.push('/dashboard')}>Let&apos;s Start</CTAButton>
            </div>

            <div className="column image-spot">

            </div>
         </ContentSplit>
      </section>
   );
}
