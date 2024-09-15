import WatermarkPriceCard from "@/components/common/watermarkPriceCard/WatermarkPriceCard";
import BotValue from "../botValue/BotValue";
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import NoDocumentsTile from "../../noDocumentsTile/NoDocumentsTile";

export default function BotValueSingle({ botValue, eventName, title = 'Bot Value', minify = false, openCreateModal = () => {}, ...props }) {
   const { doc } = useContext(DBQueryContext);
   const docThread = doc?.eval[eventName];
   const foundValue = botValue || docThread?.linkedValue;
   let borderColor;

   if (!foundValue && eventName.indexOf('stopLoss') >= 0) {
      if (eventName === 'stopLossLong') {
         return <NoDocumentsTile className="stoploss" message="STOPLOSS [LONG]" onClick={() => openCreateModal(eventName)} />
      }

      if (eventName === 'stopLossShort') {
         return <NoDocumentsTile className="stoploss" message="STOPLOSS [SHORT]" onClick={() => openCreateModal(eventName)} />
      }
   }

   if (!foundValue && eventName.indexOf('takeProfit') >= 0) {
      if (eventName === 'takeProfitLong') {
         return <NoDocumentsTile className="takeprofit" message="TAKEPROFIT [LONG]" onClick={() => openCreateModal(eventName)} />
      }

      if (eventName === 'takeProfitShort') {
         return <NoDocumentsTile className="takeprofit" message="TAKEPROFIT [SHORT]" onClick={() => openCreateModal(eventName)} />
      }
   }

   if (!foundValue) {
      return <></>;
   }

   switch (eventName) {
      case 'stopLossLong':
      case 'stopLossShort':
         borderColor = 'error';
         break;
      case 'takeProfitLong':
      case 'takeProfitShort':
         borderColor = 'success';
         break;
   }

   return (
      <WatermarkPriceCard
         className="bot-value-single"
         watermark={title}
         paddingSize={5}
         padding="xs"
         radius="s"
         borderSide="bottom"
         borderColor={borderColor}
      >
         <BotValue
            className="single"
            botValue={foundValue}
            parentThread={docThread}
            minify={minify}
            isSingle={true}
            {...props}
         />
      </WatermarkPriceCard>
   );
}
