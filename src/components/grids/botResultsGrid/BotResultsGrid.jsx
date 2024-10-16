import PriceCard from '@/components/common/priceCard/PriceCard';
import Percent from '@/components/displays/percent/Percent';
import Price from '@/components/displays/price/Price';
import { useState } from 'react';

const priceCardProps = {
   borderSide: 'bottom',
   radius: 'xs',
   padding: 'xs',
   elevation: 10
}
const priceProps = {
   size: 'm',
   dashedZero: true
}

export default function BotResultsGrid({ bot = {} }) {
   const [ accumState, setAccumState ] = useState(false);
   const [ wlRateState, setWLRateState ] = useState(false);
   const [ wlRoiState, setWLRoiState ] = useState(false);
   const {
      profitRatio,
      accumRoi24,
      accumRoiMonth,
      avgDailyROI,
      winsRate24,
      losesRate24,
      winsRateMonth,
      losesRateMonth,
      avgWinsRoi24,
      avgLosesRoi24,
      avgWinsRoiMonth,
      avgLosesRoiMonth
   } = bot.currentResults || {};

   const handleAccum = () => setAccumState(prev => !prev);
   const handleWL = () => setWLRateState(prev => !prev);
   const handleWLROI = () => setWLRoiState(prev => !prev);

   function ProfitRatio() {
      return (
         <PriceCard
            className="big-value"
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
            className="big-value clickable"
            value={accumRoi24}
            onClick={handleAccum}
            {...priceCardProps}
         >
            <label>Accum. ROI (24h)</label>
            <Percent value={accumRoi24} {...priceProps} />
         </PriceCard>}

         {accumState && <PriceCard
            className="big-value clickable"
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
            className="big-value"
            value={avgDailyROI}
            {...priceCardProps}
         >
            <label>Avg. Daily ROI</label>
            <Percent value={avgDailyROI} {...priceProps} />
         </PriceCard>
      );
   }

   function WLROI() {
      return (<>
         {!wlRoiState && <PriceCard
            className="clickable"
            value={avgWinsRoi24}
            onClick={handleWLROI}
            {...priceCardProps}
         >
            <label>W/L ROI (24h)</label>

            <div className="value-wrap">
               <Percent value={avgWinsRoi24} {...priceProps} />
               {'/'}
               <Percent value={avgLosesRoi24} {...priceProps} />
            </div>
         </PriceCard>}

         {wlRoiState && <PriceCard
            className="clickable"
            value={avgWinsRoiMonth}
            onClick={handleWLROI}
            {...priceCardProps}
         >
            <label>W/L ROI (30d)</label>

            <div className="value-wrap">
               <Percent value={avgWinsRoiMonth} {...priceProps} />
               {'/'}
               <Percent value={avgLosesRoiMonth} {...priceProps} />
            </div>
         </PriceCard>}
      </>);
   }

   function WLRate() {
      return (<>
         {!wlRateState && <PriceCard
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

         {wlRateState && <PriceCard
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
         <DailyROI />
         <Accumulated />
         <WLROI />
         <WLRate />
      </div>
   )
}
