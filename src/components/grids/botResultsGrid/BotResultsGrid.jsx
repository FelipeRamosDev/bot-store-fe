import PriceCard from '@/components/common/priceCard/PriceCard';
import Percent from '@/components/displays/percent/Percent';
import Price from '@/components/displays/price/Price';
import { useState } from 'react';

const priceCardProps = {
   borderSide: 'bottom',
   radius: 'xs',
   padding: 's',
   elevation: 10
}
const priceProps = {
   size: 'm'
}

export default function BotResultsGrid({ bot = {} }) {
   const [accumState, setAccumState] = useState(false);
   const [wlRate, setWLRate] = useState(false);
   const { profitRatio, accumRoi24, accumRoiMonth, avgDailyROI, winsRate24, losesRate24, winsRateMonth, losesRateMonth } = bot.currentResults || {};

   const handleAccum = () => setAccumState(prev => !prev);
   const handleWL = () => setWLRate(prev => !prev);

   function ProfitRatio() {
      return (
         <PriceCard
            value={profitRatio}
            {...priceCardProps}
         >
            <label>Profit Ratio</label>
            <Price amount={profitRatio} noSymbol={true} {...priceProps} />
         </PriceCard>
      )
   }

   function Accumulated() {
      return (<>
         {!accumState && <PriceCard
            className="clickable"
            value={accumRoi24}
            onClick={handleAccum}
            {...priceCardProps}
         >
            <label>Accum. ROI (24h)</label>
            <Percent value={accumRoi24} {...priceProps} />
         </PriceCard>}

         {accumState && <PriceCard
            className="clickable"
            value={accumRoiMonth}
            onClick={handleAccum}
            {...priceCardProps}
         >
            <label>Accum. ROI (30d)</label>
            <Percent value={accumRoiMonth} {...priceProps} />
         </PriceCard>}
      </>)
   }

   function DailyROI() {
      return (
         <PriceCard
            value={avgDailyROI}
            {...priceCardProps}
         >
            <label>Avg. Daily ROI</label>
            <Percent value={avgDailyROI} {...priceProps} />
         </PriceCard>
      );
   }

   function WLRate() {
      return (<>
         {!wlRate && <PriceCard
            className="clickable"
            value={avgDailyROI}
            onClick={handleWL}
            {...priceCardProps}
         >
            <label>W/L Rate (24h)</label>

            <div className="value-wrap">
               <Percent value={winsRate24} {...priceProps} />
               {'/'}
               <Percent value={-losesRate24} {...priceProps} />
            </div>
         </PriceCard>}

         {wlRate && <PriceCard
            className="clickable"
            value={avgDailyROI}
            onClick={handleWL}
            {...priceCardProps}
         >
            <label>W/L Rate (30d)</label>

            <div className="value-wrap">
               <Percent value={winsRateMonth} {...priceProps} />
               {'/'}
               <Percent value={-losesRateMonth} {...priceProps} />
            </div>
         </PriceCard>}
      </>);
   }

   return (
      <div className="bot-results-grid">
         <ProfitRatio />
         <Accumulated />
         <DailyROI />
         <WLRate />
      </div>
   )
}
