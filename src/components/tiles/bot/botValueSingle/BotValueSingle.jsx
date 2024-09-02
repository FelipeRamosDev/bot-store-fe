import WatermarkPriceCard from "@/components/common/watermarkPriceCard/WatermarkPriceCard";
import BotValue from "../botValue/BotValue";
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';

export default function BotValueSingle({ botValue, slug, title = 'Bot Value', minify = false, ...props }) {
   const { doc } = useContext(DBQueryContext);
   const foundValue = botValue || doc?.values?.find(item => item.slug === slug);
   let borderColor;

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
