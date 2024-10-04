'use client';
import { useEffect, useRef } from 'react';
import Card from '@/components/common/card/Card';
import BenderImg from '@/assets/avatar_demo/bender.webp';
import Image from 'next/image';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';
import Price from '@/components/displays/price/Price';
import Percent from '@/components/displays/percent/Percent';

const dummyBot = {
   name: 'Bender',
   description: 'This is a description test, in order to use during the development.',
   score: 4578
};

export default function BotCardImg({ bot = dummyBot }) {
   const card = useRef();

   function handleScroll() {
      if (card.current) {
         const triggerStart = window.innerHeight * 0.7;
         const cardPos = card.current.getBoundingClientRect();
         const isExpanded = card.current.classList.contains('expanded');

         if (triggerStart > cardPos.top && !isExpanded) {
            card.current.classList.add('expanded');
         }
         
         else if (triggerStart < cardPos.top && isExpanded) {
            card.current.classList.remove('expanded');
         }
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
         <div className="card-header">
            <strong className="header-title">{bot.name}</strong>
         </div>

         <div className="card-body">
            <div className="avatar-wrap">
               <div className="avatar-mask">
                  <Image src={BenderImg} alt="Bot Avatar" style={{ width: 'auto' }} width={0} height={130} />
               </div>
            </div>

            <p className="description">{bot.description}</p>

            <div className="score">
               <label>Score</label>
               <span>{bot.score}</span>
            </div>

            <ContainedTable tableData={[
               {
                  label: 'Day Win/Loss',
                  value: (<>
                     <Price amount={50} noSymbol={true} forceColor="success" /> / <Price amount={50} noSymbol={true} forceColor="error" />
                  </>)
               },
               {
                  label: 'Month Win/Loss',
                  value: (<>
                     <Price amount={50} noSymbol={true} forceColor="success" /> / <Price amount={50} noSymbol={true} forceColor="error" />
                  </>)
               },
               {
                  label: 'Today ROI',
                  value: <Percent value={50} noSymbol={true} forceColor="success" />
               },
               {
                  label: 'Yesterday ROI',
                  value: <Percent value={50} noSymbol={true} forceColor="success" />
               },
               {
                  label: 'Month ROI',
                  value: <Percent value={50} noSymbol={true} forceColor="success" />
               },
               {
                  label: 'Last Month ROI',
                  value: <Percent value={50} noSymbol={true} forceColor="success" />
               }
            ]} />
         </div>
      </Card>
   );
}
