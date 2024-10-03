import Image from 'next/image';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';
import BinanceLogo from '@/assets/binance_logo.svg';
import KeyIcon from '@mui/icons-material/Key';
import BinanceKeysPopupImg from './img/BinanceKeysPopupImg';

export default function HomeContent() {
   return (<>
      <HomeTopBanner />

      <div className="home-content">
         <section className="content-section">
            <div className="section-header">
               <div className="container">
                  <Image className="binance-logo" src={BinanceLogo} alt="Binance Logo" height={150} width={150} />
                  <h2 className="title">BINANCE API Integration</h2>
               </div>
            </div>

            <div className="container">
               <ContentSplit className="content">
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
                     <h3 className="message line1">Integrate your <span className="grad-txt">BINANCE FUTURES</span> account</h3>
                     <span className="message line2">Sign-in to <span className="grad-txt">INTEGRATE</span></span>

                     <p className="description">
                        {"You can integrate your Binance Futures account to be able of automate your trades. It's easy to generate an API Key on Binance side to connect your CandlePilot account with Binance Account."}
                     </p>

                     <CTAButton className="d-large" size="medium" url="/dashboard">Let&apos;s Start</CTAButton>
                  </div>
               </ContentSplit>
            </div>
         </section>
      </div>
   </>);
}
