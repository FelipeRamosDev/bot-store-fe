import Card from "@/components/common/card/Card";
import StatusBadge from "@/components/common/statusBedge/StatusBadge";
import Percent from "@/components/displays/percent/Percent";
import PrettyDate from "@/components/displays/prettyDate/PrettyDate";
import Price from "@/components/displays/price/Price";
import { useState } from "react";

export default function PositionFullTile({ position = {}, ...props }) {
   const [ expand, setExpand ] = useState(false);

   return (
      <Card
         className="position-full-tile"
         elevation={0}
         radius="xs"
         onClick={() => setExpand(true)}
         onMouseLeave={() => setExpand(false)}
         {...props}
      >
         <div className="top-content content">
            <div className="column">
               <label>Symbol</label>
               <p>
                  {position.symbol}{' '}
                  <StatusBadge type="position-side" title="Position Side" variant="light" minified>{position.positionType}</StatusBadge>
                  <StatusBadge type="leverage" title="Leverage" variant="light" minified>{position.usedLeverage}</StatusBadge>
               </p>
            </div>

            <div className="column right">
               <label>PNL/ROI</label>
               <p>
                  <Price amount={position.pnl} /> <Percent value={position.roi} fontSize={10} prefix="(" posfix=")" />
               </p>
            </div>
         </div>

         {expand && (<>
            <div className="hidden-content content">
               <div className="column">
                  <label>Open Time</label>
                  <PrettyDate time={position.openTime} hideYear hideSeconds />
               </div>

               <div className="column auto-left centralize">
                  <label>Quantity</label>
                  <Price amount={position.quantity} noSymbol noColor />
               </div>

               <div className="column centralize">
                  <label>Init. Margin</label>
                  <Price amount={position.initialMargin} noColor />
               </div>

               <div className="column centralize">
                  <label>Init. Notional</label>
                  <Price amount={position.initialGrossBalance} noColor />
               </div>

               <div className="column centralize">
                  <label>Open Price</label>
                  <Price amount={position.openPrice} noColor />
               </div>
            </div>

            <div className="block hidden-content content">
               <div className="column stoploss">
                  <label>Stoploss</label>
                  <Price amount={position.stopPrice} noColor />
               </div>

               <div className="column takeprofit">
                  <label>Takeprofit</label>
                  <Price amount={position.gainPrice} noColor />
               </div>

               <div className="column">
                  <label>Trailing Stop</label>
                  <Price amount={0} dashedZero noSymbol noColor />
               </div>
            </div>
         </>)}
      </Card>
   );
}
