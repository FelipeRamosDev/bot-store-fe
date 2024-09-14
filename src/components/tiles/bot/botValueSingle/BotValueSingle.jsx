import WatermarkPriceCard from "@/components/common/watermarkPriceCard/WatermarkPriceCard";
import BotValue from "../botValue/BotValue";
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import NoDocumentsTile from "../../noDocumentsTile/NoDocumentsTile";

export default function BotValueSingle({ botValue, eventName, slug, title = 'Bot Value', minify = false, openCreateModal = () => {}, ...props }) {
   const { doc } = useContext(DBQueryContext);
   const foundValue = botValue || doc?.eval[eventName]?.linkedValue;
   let borderColor;

   if (!foundValue && slug.indexOf('stoploss') >= 0) {
      if (slug === 'stoploss_long') {
         return <NoDocumentsTile className="stoploss" message="STOPLOSS [LONG]" onClick={() => openCreateModal(eventName)} />
      }

      if (slug === 'stoploss_short') {
         return <NoDocumentsTile className="stoploss" message="STOPLOSS [SHORT]" onClick={() => openCreateModal(eventName)} />
      }
   }

   if (!foundValue && slug.indexOf('takeprofit') >= 0) {
      if (slug === 'takeprofit_long') {
         return <NoDocumentsTile className="takeprofit" message="TAKEPROFIT [LONG]" onClick={() => openCreateModal(eventName)} />
      }

      if (slug === 'takeprofit_short') {
         return <NoDocumentsTile className="takeprofit" message="TAKEPROFIT [SHORT]" onClick={() => openCreateModal(eventName)} />
      }
   }

   if (!foundValue) {
      return <></>;
   }

   switch (slug) {
      case 'stoploss_long':
      case 'stoploss_short':
         borderColor = 'error';
         break;
      case 'takeprofit_long':
      case 'takeprofit_short':
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
            minify={minify}
            isSingle={true}
            {...props}
         />
      </WatermarkPriceCard>
   );
}
