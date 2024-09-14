'use client';

import { useContext, useState } from 'react';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import BotValueSingle from '@/components/tiles/bot/botValueSingle/BotValueSingle';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import FunctionsIcon from '@mui/icons-material/Functions';
import BotValuesGrid from '@/components/grids/botValuesGrid/BotValuesGrid';
import DBQueryContext from '@/contexts/DBQuery';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import BotValueModal from '@/components/modals/botValueModal/BotValueModal';
import AddBotValuesMenu from '@/components/menus/dropdown/addBotValuesMenu/AddBotValuesMenu';
import AddBotValuesStopsMenu from '@/components/menus/dropdown/addBotValuesStopsMenu/AddBotValuesStopsMenu';

export default function BotSettings() {
   const { doc } = useContext(DBQueryContext);
   const [ createValueModal, setCreateValueModal ] = useState('');

   if (!doc) {
      return <></>;
   }

   function openCreateModal(eventName) {
      switch (eventName) {
         case 'stopLossLong':
         case 'stopLossShort':
         case 'takeProfitLong':
         case 'takeProfitShort':
            const thread = doc.eval[eventName];
            if (!thread) return;

            setCreateValueModal({ parentThread: thread._id, valueType: 'function' });
            break;
      }
   }

   return (
      <ContentSplit className="bot-settings" useContainer={true}>
         <div className="loss-gain-settings">
            <ContentHeader Toolbar={() => <AddBotValuesStopsMenu bot={doc} setModalState={setCreateValueModal} />}>
               <MoneyOffIcon fontSize="small" /> <h2 className="header-title">Stoploss / Takeprofit</h2>
            </ContentHeader>

            <BotValueSingle eventName="stopLossLong" slug="stoploss_long" title="Stoploss" openCreateModal={openCreateModal} />
            <BotValueSingle eventName="stopLossShort" slug="stoploss_short" title="Stoploss" openCreateModal={openCreateModal} />
            <BotValueSingle eventName="takeProfitLong" slug="takeprofit_long" title="Takeprofit" openCreateModal={openCreateModal} />
            <BotValueSingle eventName="takeProfitShort" slug="takeprofit_short" title="Takeprofit" openCreateModal={openCreateModal} />

            <BotValueModal bot={doc} open={createValueModal} setModal={setCreateValueModal} />
         </div>

         <div className="values-settings">
            <ContentHeader Toolbar={() => <AddBotValuesMenu bot={doc} setModalState={setCreateValueModal} />}>
               <FunctionsIcon fontSize="small" /> <h2 className="header-title">Values</h2>
            </ContentHeader>

            <BotValuesGrid values={doc.values} />
         </div>
      </ContentSplit>
   );
}
