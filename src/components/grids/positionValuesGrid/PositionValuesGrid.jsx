import PriceCard from "@/components/common/priceCard/PriceCard";
import Percent from '@/components/displays/percent/Percent';
import Price from "@/components/displays/price/Price";

/**
 * PositionValuesGrid Component
 * 
 * This component renders a grid displaying various financial metrics of a position, including PNL, ROI, Realized Profit,
 * Initial Margin, Initial Notional, and Total Notional. Each metric is displayed using a `PriceCard` component with a label
 * and a formatted value.
 * 
 * @param {Object} props - The component props.
 * @param {Object} [props.position={}] - An object representing the financial position data.
 * @param {string} [props.className=''] - An optional additional CSS class to apply to the grid.
 * @param {Object} props - Additional props are spread onto the root div element.
 * 
 * @returns {JSX.Element} The rendered PositionValuesGrid component.
 */
export default function PositionValuesGrid({ position = {}, className = '', ...props }) {
   const cardProps = { borderSide: 'bottom', padding: 'xs', radius: 'xs', elevation: 15 };
   const priceProps = { dashedZero: true, size: 'l' };

   return (
      <div className={`position-values-grid ${className}`} {...props}>
         <PriceCard value={position.pnl} {...cardProps}>
            <label>PNL</label>
            <Price amount={position.pnl} {...priceProps} fractional={position.symbolFractional} />
         </PriceCard>

         <PriceCard value={position.roi} {...cardProps}>
            <label>ROI</label>
            <Percent value={position.roi} {...priceProps} fractional={2} />
         </PriceCard>

         <PriceCard value={position.realizedProfit} {...cardProps}>
            <label>Realized</label>
            <Price amount={position.realizedProfit} {...priceProps} fractional={position.symbolFractional} />
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
