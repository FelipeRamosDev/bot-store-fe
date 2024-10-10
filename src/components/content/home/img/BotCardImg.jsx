'use client';
import { useEffect, useRef } from 'react';
import Card from '@/components/common/card/Card';
import BenderImg from '@/assets/avatar_demo/bender.webp';
import Image from 'next/image';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';
import Price from '@/components/displays/price/Price';
import Percent from '@/components/displays/percent/Percent';
import { isElementOnScreen } from '@/helpers/scroll';

const dummyBot = {
   name: 'Bender',
   description: 'A bot focused on day trading trends, optimized for 15-minute charts or smaller time frames.',
   score: 1290
};

export default function BotCardImg({ bot = dummyBot }) {
   const card = useRef();

   function handleScroll() {
      if (!card.current) return;
      const isExpanded = card.current.classList.contains('expanded');
      const isOnScreen = isElementOnScreen(card, 0.25);

      if (!isExpanded && isOnScreen) {
         card.current.classList.add('expanded');
      } else if (isExpanded && !isOnScreen) {
         card.current.classList.remove('expanded');
      }
   }

   useEffect(() => {
      window.removeEventListener('scroll', handleScroll);
      window.addEventListener('scroll', handleScroll);
   }, []);

   return (
      <Card
         prevRef={card}
         className={`bot-card`}
         radius="s"
         elevation={30}
      >
         <div className="card-body">
            <div className="avatar-wrap">
               <div className="avatar-mask">
                  <Image src={BenderImg} alt="Bot Avatar" style={{ width: 'auto' }} width={0} height={130} />
               </div>
            </div>

            <h5 className="bot-name">{bot.name}</h5>
            <p className="description">{bot.description}</p>

            <div className="score">
               <label>Score</label>
               <span>{bot.score}</span>
            </div>

            <ContainedTable tableData={[
               {
                  label: 'Day Wins/Loses',
                  value: (<>
                     <Price amount={89} noSymbol={true} forceColor="success" /> / <Price amount={40} noSymbol={true} forceColor="error" />
                  </>)
               },
               {
                  label: 'Month Wins/Loses',
                  value: (<>
                     <Price amount={345} noSymbol={true} forceColor="success" /> / <Price amount={150} noSymbol={true} forceColor="error" />
                  </>)
               },
               {
                  label: 'Today ROI',
                  value: <Percent value={4} noSymbol={true} forceColor="success" />
               },
               {
                  label: 'Yesterday ROI',
                  value: <Percent value={-2.35} noSymbol={true} forceColor="success" />
               },
               {
                  label: 'Month ROI',
                  value: <Percent value={12.2} noSymbol={true} forceColor="success" />
               },
               {
                  label: 'Last Month ROI',
                  value: <Percent value={23.9} noSymbol={true} forceColor="success" />
               }
            ]} />
         </div>
      </Card>
   );
}
