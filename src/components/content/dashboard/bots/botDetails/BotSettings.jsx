'use client';

import { useContext } from 'react';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import BotValueSingle from '@/components/tiles/bot/botValueSingle/BotValueSingle';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import FunctionsIcon from '@mui/icons-material/Functions';
import BotValuesGrid from '@/components/grids/botValuesGrid/BotValuesGrid';
import DBQueryContext from '@/contexts/DBQuery';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';

export default function BotSettings() {
   const { doc } = useContext(DBQueryContext);

   if (!doc) {
      return <></>;
   }

   return (
      <ContentSplit className="bot-settings" useContainer={true}>
         <div className="loss-gain-settings">
            <ContentHeader>
               <MoneyOffIcon fontSize="small" /> <h2 className="header-title">Stoploss / Takeprofit</h2>
            </ContentHeader>

            <BotValueSingle slug="stoploss_long" title="Stoploss" />
            <BotValueSingle slug="stoploss_short" title="Stoploss" />
            <BotValueSingle slug="takeprofit_long" title="Takeprofit" />
            <BotValueSingle slug="takeprofit_short" title="Takeprofit" />
         </div>

         <div className="values-settings">
            <ContentHeader>
               <FunctionsIcon fontSize="small" /> <h2 className="header-title">Values</h2>
            </ContentHeader>

            <BotValuesGrid values={doc.values} />
         </div>
      </ContentSplit>
   );
}
