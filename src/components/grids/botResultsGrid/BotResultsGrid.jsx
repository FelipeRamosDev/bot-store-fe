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
   dashedZero: true,
   noSymbol: true
}

export default function BotResultsGrid({ bot = {} }) {
   const [ accumState, setAccumState ] = useState(false);
   const [ wlRateState, setWLRateState ] = useState(false);
   const [ wlRoiState, setWLRoiState ] = useState(false);
   const {
      profitRatio,
      accumROS24,
      accumROSMonth,
      avgDailyROS,
      winsRate24,
      losesRate24,
      winsRateMonth,
      losesRateMonth,
      avgWinsROS24,
      avgLosesROS24,
      avgWinsROSMonth,
      avgLosesROSMonth
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
            value={accumROS24}
            onClick={handleAccum}
            {...priceCardProps}
         >
            <label>Accum. ROS (24h)</label>
            <Price amount={accumROS24} {...priceProps} />
         </PriceCard>}

         {accumState && <PriceCard
            className="big-value clickable"
            value={accumROSMonth}
            onClick={handleAccum}
            {...priceCardProps}
         >
            <label>Accum. ROS (30d)</label>
            <Price amount={accumROSMonth} {...priceProps} />
         </PriceCard>}
      </>)
   }

   function DailyROI() {
      return (
         <PriceCard
            className="big-value"
            value={avgDailyROS}
            {...priceCardProps}
         >
            <label>Avg. Daily ROI</label>
            <Percent value={avgDailyROS} {...priceProps} />
         </PriceCard>
      );
   }

   function WLROI() {
      return (<>
         {!wlRoiState && <PriceCard
            className="clickable"
            value={avgWinsROS24}
            onClick={handleWLROI}
            {...priceCardProps}
         >
            <label>W/L ROS (24h)</label>

            <div className="value-wrap">
               <Price amount={avgWinsROS24} {...priceProps} />
               {'/'}
               <Price amount={avgLosesROS24} {...priceProps} />
            </div>
         </PriceCard>}

         {wlRoiState && <PriceCard
            className="clickable"
            value={avgWinsROSMonth}
            onClick={handleWLROI}
            {...priceCardProps}
         >
            <label>W/L ROS (30d)</label>

            <div className="value-wrap">
               <Price amount={avgWinsROSMonth} {...priceProps} />
               {'/'}
               <Price amount={avgLosesROSMonth} {...priceProps} />
            </div>
         </PriceCard>}
      </>);
   }

   function WLRate() {
      return (<>
         {!wlRateState && <PriceCard
            className="clickable"
            value={avgDailyROS}
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
            value={avgDailyROS}
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
