'use client';

import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import ContentSidebar from '@/components/layout/contentSidebar/ContentSidebar';
import BotValueSingle from '@/components/tiles/bot/botValueSingle/BotValueSingle';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import FunctionsIcon from '@mui/icons-material/Functions';

export default function BotSettings() {
   return (
      <ContentSidebar className="bot-settings" isFullContainer={true}>
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
         </div>
      </ContentSidebar>
   );
}
