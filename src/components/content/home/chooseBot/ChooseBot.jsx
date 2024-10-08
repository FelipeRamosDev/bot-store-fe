import Image from 'next/image';
import PilotLogo from '@/assets/logo_icon.svg';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import BotsTableImg from '../img/BotsTableImg';
import BotCardImg from '../img/BotCardImg';

export default function ChooseBot() {
   return (
      <section className="choose-bot content-section">
         <div className="dark-header section-header">
            <div className="container">
               <Image className="pilot-logo" src={PilotLogo} alt="CandlePilot Monocolor Logo" height={150} width={150} />
               <h2 className="title">Choose a PILOT BOT</h2>
            </div>
         </div>
         <div className="gradient-divider"></div>

         <div className="container">
            <ContentSplit className="content" breakpoint="l">
               <div className="column marketing-cta left">
                  <h3 className="message line1">Pick a <span className="grad-txt">PILOT BOT</span> on the <span className="grad-txt">STORE</span></h3>
                  <span className="message line2">Start to <span className="grad-txt">CHOOSE ONE</span></span>

                  <p className="description">
                     {"Check the trader bot store the bot's results and choose the one which fits with you goals. Start to choose a bot."}
                  </p>

                  <CTAButton className="d-large" size="medium" url="/dashboard">Let&apos;s Start</CTAButton>
               </div>

               <div className="column image-spot">
                  <BotsTableImg />
                  <BotCardImg />
               </div>
            </ContentSplit>
         </div>
      </section>
   )
}