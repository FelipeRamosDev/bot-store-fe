import Card from "@/components/common/card/Card";
import PriceCard from "@/components/common/priceCard/PriceCard";
import StatusBadge from "@/components/common/statusBedge/StatusBadge";
import Percent from "@/components/displays/percent/Percent";
import Price from "@/components/displays/price/Price";
import ContainedTable from "@/components/tables/containedTable/ContainedTable";

const priceCard = {
   borderSide: 'bottom',
   radius: 'xs',
   elevation: 10
};

/**
 * PositionLimits Component
 * 
 * This component renders detailed information about the trading limits of a specific position within a card. It displays 
 * key details such as the stop loss, take profit, leverage, quantity, and commission. Additionally, it includes a table 
 * with the position's open and close prices, initial stop gap, and the ratio of the stop gap to the open price.
 * 
 * @param {Object} props - The component props.
 * @param {Object} [props.position={}] - An object representing the position data, which includes stopPrice, gainPrice, 
 *                                       usedLeverage, quantity, tradeFee, openPrice, closePrice, initialStopSpread, and 
 *                                       symbolFractional.
 * @param {Object} [props] - Additional props passed to the Card component.
 * 
 * @returns {JSX.Element} The rendered PositionLimits component.
 */
export default function PositionLimits({ position = {}, ...props }) {
   const priceProps = { fractional: position.symbolFractional };
   const stopGapPercent = (position.initialStopSpread * 100) / position.openPrice;
   const tablePriceProps = { noColor: true, dashedZero: true, fractional: position.symbolFractional };

   return (
      <Card
         className="positions-limits"
         padding="xs"
         radius="s"
         elevation={10}
         {...props}
      >
         <div className="cards-wrap">
            <PriceCard borderColor="error" {...priceCard}>
               <label>Stoploss</label>
               <Price amount={position.stopPrice} noColor={true} {...priceProps} />
            </PriceCard>

            <PriceCard borderColor="success" {...priceCard}>
               <label>Takeprofit</label>
               <Price amount={position.gainPrice} noColor={true} {...priceProps} />
            </PriceCard>
         </div>

         <div className="cards-wrap">
            <PriceCard {...priceCard}>
               <label>Leverage</label>
               <span>{position.usedLeverage}x</span>
            </PriceCard>

            <PriceCard {...priceCard}>
               <label>Quantity</label>
               <span>{position.quantity}</span>
            </PriceCard>

            <PriceCard {...priceCard}>
               <label>Commission</label>
               <Price amount={position.tradeFee} noColor={true} {...priceProps} />
            </PriceCard>
         </div>

         <ContainedTable
            tableData={[
               { label: 'Type', value: <StatusBadge type="account-type" variant="light">{position.type}</StatusBadge> },
               { label: 'Status', value: <StatusBadge type="position-status" variant="light">{position.status}</StatusBadge> },
               { label: 'Side', value: <StatusBadge type="position-side" variant="light">{position.positionType}</StatusBadge> },
               { label: 'Open Price', value: <Price amount={position.openPrice} {...tablePriceProps} /> },
               { label: 'Close Price', value: <Price amount={position.closePrice} {...tablePriceProps} />, hide: !position.closePrice },
               { label: 'Init. Stop Gap', value: <Price amount={position.initialStopSpread} {...tablePriceProps} /> },
               { label: 'Stop Gap / Open Price', value: <Percent value={stopGapPercent} {...tablePriceProps} /> },
            ]}
         />
      </Card>
   );
}

