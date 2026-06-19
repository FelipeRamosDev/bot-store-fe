import Image from 'next/image';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import BinanceLogo from '@/assets/binance_logo.svg';
import KeyIcon from '@mui/icons-material/Key';
import BinanceKeysPopupImg from '../img/BinanceKeysPopupImg';

export default function BinanceIntegration() {
   return (
      <section className="binance-integration content-section">
         <div className="dark-header section-header">
            <div className="container">
               <Image className="binance-logo" src={BinanceLogo} alt="Binance Logo" height={130} width={130} />
               <h2 className="title">BINANCE API Integration</h2>
            </div>
         </div>
         <div className="gradient-divider"></div>

         <div className="container">
            <ContentSplit className="content" breakpoint="l">
               <div className="column image-spot">
                  <div className="dashed-wrap">
                     <div className="watermark">
                        <KeyIcon className="key-icon" />
                        <span className="mark-text">API INTEGRATION</span>
                     </div>

                     <BinanceKeysPopupImg />
                  </div>
               </div>

               <div className="column marketing-cta right">
                  <h3 className="message line1">Integrate with <span className="grad-txt">BINANCE API</span></h3>
                  <span className="message line2">Start to <span className="grad-txt">INTEGRATE</span></span>

                  <p className="description">
                     {"You can integrate your Binance Futures account to automate your trades. It's easy to generate an API key on Binance, allowing you to seamlessly connect your CandlePilot account with your Binance account."}
                  </p>

                  <CTAButton className="d-large" size="medium" url="/dashboard">Let&apos;s Start</CTAButton>
               </div>
            </ContentSplit>
         </div>
      </section>
   );
}
