'use client';
import Card from '@/components/common/card/Card';
import BotThreadImg from '../img/BotThreadImg';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';
import GridViewIcon from '@mui/icons-material/GridView';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FunctionsIcon from '@mui/icons-material/Functions';
import { useEffect, useRef } from 'react';

export default function CreateYourBot() {
   const threadElm = useRef();

   function handleScroll() {
      if (!threadElm.current) return;

      const triggerStart = window.innerHeight * 0.7;
      const spotPos = threadElm.current.getBoundingClientRect();
      const isAnimated = threadElm.current.classList.contains('animation');

      if (triggerStart > spotPos.top && !isAnimated) {
         threadElm.current.classList.add('animation');
      }
      
      else if (triggerStart < spotPos.top && isAnimated) {
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
            <h2 className="section-title">Or customize and create your own trader bot strategy...</h2>
            <div className="gradient-divider"></div>
         </div>

         <ContentSplit className="container">
            <div className="text-spot">
               <div className="text-spot-header">
                  <h3>Build your own trader BOT</h3>
                  <p>Feel free to build your own strategy, create your trader bot defining:{' '}
                     <b>Open Long, Open Short, Close Long, Close Short, Stoploss</b> and <b>Takeprofit.</b>
                  </p>
               </div>

               <div className="quoted-title">
                  <h3><BlurLinearIcon fontSize="large" /> THREADS</h3>
                  <p>Use bot threads to set your strategy rules to <b>open/close</b> long or short positions and of course, set the stoploss and takeprofit.</p>
               </div>

               <div className="quoted-title">
                  <h3><GridViewIcon fontSize="large" /> THREAD BLOCKS</h3>
                  <p>Combine different AND/OR groups using <b>Thread Blocks</b>. This way you can nest different logincs one inside of the other.</p>
               </div>

               <div className="quoted-title">
                  <h3><CompareArrowsIcon fontSize="large" /> EVALUATION RULES</h3>
                  <p>Use the evaluation rules to determine whether a bot value is: grater than, less then, equal to, etc.</p>
               </div>

               <div className="quoted-title">
                  <h3><FunctionsIcon fontSize="large" /> BOT VALUES</h3>
                  <p>Use technical indicators and static values to set the bot values and use them to evaluate a strategy.</p>
               </div>
            </div>

            <Card className="image-spot" elevation={0}>
               <div className="text-wrap">
                  <span className="image-title">{"Flexibility on your trade's strategy"}</span>
                  <p>{"Use evaluation rules that handle logical operators (AND/OR) to compare and assess technical indicators. Group different logic rules into thread blocks, where you can set dynamic values based on indicators or use static values for comparison"}</p>
               </div>

               <div ref={threadElm} className="image-wrap">
                  <BotThreadImg />
               </div>

               <div className="bg-1"></div>
               <div className="bg-2"></div>
               <div className="bg-3"></div>
               <div className="bg-4"></div>
            </Card>
         </ContentSplit>

         <div className="gradient-divider"></div>
      </section>
   );
}
