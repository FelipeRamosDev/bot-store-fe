import './PositionValuesGrid.scss';
import PriceCard from "@/components/common/priceCard/PriceCard";
import Percent from '@/components/displays/percent/Percent';
import Price from "@/components/displays/price/Price";

export default function PositionValuesGrid({ position = {}, className = '', ...props }) {
   const cardProps = { borderSide: 'bottom', padding: 'xs', radius: 'xs', elevation: 15 };
   const priceProps = { dashedZero: true, size: 'l' };

   return (
      <div className={`position-values-grid ${className}`} {...props}>
         <PriceCard value={position.pnl} {...cardProps}>
            <label>PNL</label>
            <Price amount={position.pnl} {...priceProps} />
         </PriceCard>

         <PriceCard value={position.roi} {...cardProps}>
            <label>ROI</label>
            <Percent value={position.roi} {...priceProps} />
         </PriceCard>

         <PriceCard value={position.realizedProfit} {...cardProps}>
            <label>Realized</label>
            <Price amount={position.realizedProfit} {...priceProps} />
         </PriceCard>

         <PriceCard noColor={true} value={position.initialMargin} {...cardProps}>
            <label>Init. Margin</label>
            <Price noColor={true} amount={position.initialMargin} {...priceProps} />
         </PriceCard>

         <PriceCard noColor={true} value={position.initialGrossBalance} {...cardProps}>
            <label>Init. Notional</label>
            <Price noColor={true} amount={position.initialGrossBalance} {...priceProps} />
         </PriceCard>

         <PriceCard noColor={true} value={position.grossBalance} {...cardProps}>
            <label>Total Notional</label>
            <Price noColor={true} amount={position.grossBalance} {...priceProps} />
         </PriceCard>
      </div>
   );
}
