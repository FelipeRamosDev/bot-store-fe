import './SlotResultsGrid.scss';
import PriceCard from '@/components/common/priceCard/PriceCard';
import Percent from '@/components/displays/percent/Percent';
import Price from '@/components/displays/price/Price';
import { useState } from 'react';

export default function SlotResultsGrid({ slot = {} }) {
   const [ pnlState, setPnlState ] = useState(true);
   const [ roiState, setRoiState ] = useState(true);
   const pnlValue = pnlState ? slot.results.dayPnl : slot.results.monthPnl;
   const roiValue = roiState ? slot.results.dayRoi : slot.results.monthRoi;

   const priceCardProps = { padding: 'xs', radius: 'xs' };
   const priceProps = { size: 'm' };
   const hozPriceCardProps = { borderSide: 'bottom' };

   return (
      <div className="slot-results-grid">
         <PriceCard className="clickable" {...priceCardProps} value={pnlValue} onClick={() => setPnlState(prev => !prev)}>
            <label>{pnlState ? 'Day' : 'Month'} PNL</label>
            <Price {...priceProps} amount={pnlValue} />
         </PriceCard>

         <PriceCard className="clickable" {...priceCardProps} value={roiValue} onClick={() => setRoiState(prev => !prev)}>
            <label>{roiState ? 'Day' : 'Month'} ROI</label>
            <Percent {...priceProps} value={roiValue} />
         </PriceCard>

         <PriceCard {...priceCardProps} value={slot.totalRealizedPnl}>
            <label>Realized PNL</label>
            <Price {...priceProps} amount={slot.totalRealizedPnl} />
         </PriceCard>

         <PriceCard {...priceCardProps} {...hozPriceCardProps} value={slot.pnl}>
            <label>Acumulated PNL</label>
            <Price {...priceProps} amount={slot.pnl} />
         </PriceCard>
         
         <PriceCard {...priceCardProps} {...hozPriceCardProps} value={slot.totalUnrealizedPnl}>
            <label>Unrealized PNL</label>
            <Price {...priceProps} amount={slot.totalUnrealizedPnl} />
         </PriceCard>
      </div>
   )
}
