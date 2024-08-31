import Card from "@/components/common/card/Card";
import PriceCard from "@/components/common/priceCard/PriceCard";
import Percent from "@/components/displays/percent/Percent";
import Price from "@/components/displays/price/Price";
import ContainedTable from "@/components/tables/containedTable/ContainedTable";

const priceCard = {
   borderSide: 'bottom',
   radius: 'xs',
   elevation: 10
};

export default function PositionLimits({ position = {}, ...props }) {
   const priceProps = { fractional: position.symbolFractional };
   const stopGapPercent = (position.initialStopSpread * 100) / position.openPrice;
   const tablePriceProps = { noColor: true, dashedZero: true };

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
               <Price amount={position.tradeFee} noColor={true} />
            </PriceCard>
         </div>

         <ContainedTable
            tableData={[
               { label: 'Open Price', value: <Price amount={position.openPrice} {...tablePriceProps} /> },
               { label: 'Close Price', value: <Price amount={position.closePrice} {...tablePriceProps} />, hide: !position.closePrice },
               { label: 'Init. Stop Gap', value: <Price amount={position.initialStopSpread} {...tablePriceProps} /> },
               { label: 'Stop Gap / Open Price', value: <Percent value={stopGapPercent} {...tablePriceProps} /> },
            ]}
         />
      </Card>
   );
}

