'use client';
import { useEffect, useRef } from 'react';
import BotThreadImg from '../img/BotThreadImg';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';
import GridViewIcon from '@mui/icons-material/GridView';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FunctionsIcon from '@mui/icons-material/Functions';
import TexturePaperEllipses from '@/components/common/texturePaperEllipses/TexturePaperEllipses';
import { isElementOnScreen } from '@/helpers/scroll';

export default function CreateYourBot() {
   const threadElm = useRef();

   function handleScroll() {
      if (!threadElm.current) return;
      const isAnimated = threadElm.current.classList.contains('animation');
      const isOnScreen = isElementOnScreen(threadElm, 0.6);

      if (!isAnimated && isOnScreen) {
         threadElm.current.classList.add('animation');
      } else if (isAnimated && !isOnScreen) {
         threadElm.current.classList.remove('animation');
      }
   }

   useEffect(() => {
      window.removeEventListener('scroll', handleScroll);
      window.addEventListener('scroll', handleScroll);
   }, []);

   return (
      <section className="create-your-bot-section content-section">
         <div className="section-header container">
            <h2 className="section-title">Create your own <span className="grad-txt">TRADING BOT</span> strategy...</h2>
            <div className="gradient-divider"></div>
         </div>

         <ContentSplit className="container">
            <div className="text-spot">
               <div className="text-spot-header">
                  <h3>Your Own Trading Bot Strategy</h3>
                  <p className="summary">Design your own strategy and create your trading bot by defining actions like:{' '}
                     <b>Open Long, Open Short, Close Long, Close Short, Stoploss</b> and <b>Takeprofit.</b>
                  </p>
               </div>

               <div className="quoted-title">
                  <h3><BlurLinearIcon fontSize="large" /> THREADS</h3>
                  <p>Use bot threads to set your strategy rules for opening/closing long or short positions, and, of course, setting Stop Loss and Take Profit.</p>
               </div>

               <div className="quoted-title">
                  <h3><GridViewIcon fontSize="large" /> THREAD BLOCKS</h3>
                  <p>Combine different AND/OR groups using <b>Thread Blocks</b>, allowing you to nest various logic conditions within each other.</p>
               </div>

               <div className="quoted-title">
                  <h3><CompareArrowsIcon fontSize="large" /> EVALUATION RULES</h3>
                  <p>{"Use evaluation rules to determine whether a bot's value is greater than, less than, equal to, etc."}</p>
               </div>

               <div className="quoted-title">
                  <h3><FunctionsIcon fontSize="large" /> BOT VALUES</h3>
                  <p>{"Use technical indicators and static values to set the bot's parameters, and utilize these to evaluate your strategy."}</p>
               </div>
            </div>

            <TexturePaperEllipses className="image-spot">
               <div className="text-wrap">
                  <span className="image-title">{"Flexibility on your trade's strategy"}</span>
                  <p>{"Use evaluation rules that handle logical operators (AND/OR) to compare and assess technical indicators. Group different logic rules into thread blocks, where you can set dynamic values based on indicators or use static values for comparison"}</p>
               </div>

               <div ref={threadElm} className="image-wrap">
                  <BotThreadImg />
               </div>
            </TexturePaperEllipses>
         </ContentSplit>
      </section>
   );
}
