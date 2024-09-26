import WatermarkPriceCard from "@/components/common/watermarkPriceCard/WatermarkPriceCard";
import BotValue from "../botValue/BotValue";
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import NoDocumentsTile from "../../noDocumentsTile/NoDocumentsTile";

/**
 * Renders a single bot value with a watermark and handles the display of "no documents" tiles if the bot value is missing.
 * 
 * @param {Object} props - The component's props.
 * @param {Object} props.botValue - The bot value to display.
 * @param {string} props.eventName - The event name associated with the bot value.
 * @param {string} [props.title='Bot Value'] - The title to display in the watermark of the card.
 * @param {boolean} [props.minify=false] - Whether to display the bot value in a minimized format.
 * @param {Function} [props.openCreateModal=() => {}] - Function to open the create modal.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function BotValueSingle({ botValue, eventName, title = 'Bot Value', minify = false, openCreateModal = () => {}, elevation, ...props }) {
   const botContext = useContext(DBQueryContext);
   const { doc } = botContext || {};
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
         elevation={elevation}
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
