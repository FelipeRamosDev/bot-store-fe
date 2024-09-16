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

/**
 * `BotSettings` is a component that manages and displays bot settings related to stoploss, takeprofit, and values.
 * It interacts with the `DBQueryContext` to fetch bot data and provides modals for creating new bot values.
 * The component also handles opening modals based on the selected event.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function BotSettings() {
   const { doc } = useContext(DBQueryContext);
   const [ createValueModal, setCreateValueModal ] = useState('');

   if (!doc) {
      return <></>;
   }

   /**
    * Opens a modal to create a new bot value based on the selected event.
    *
    * @param {string} eventName - The event name which determines the type of bot value to create.
    */
   function openCreateModal(eventName) {
      switch (eventName) {
         case 'stopLossLong':
         case 'stopLossShort':
         case 'takeProfitLong':
         case 'takeProfitShort':
            const thread = doc.eval[eventName];
            if (!thread) return;

            setCreateValueModal({ parentThreads: thread._id, valueType: 'function' });
            break;
      }
   }

   return (
      <ContentSplit className="bot-settings" useContainer={true}>
         <div className="loss-gain-settings">
            <ContentHeader>
               <MoneyOffIcon fontSize="small" /> <h2 className="header-title">Stoploss / Takeprofit</h2>
            </ContentHeader>

            <BotValueSingle eventName="stopLossLong" title="Stoploss" openCreateModal={openCreateModal} />
            <BotValueSingle eventName="stopLossShort" title="Stoploss" openCreateModal={openCreateModal} />
            <BotValueSingle eventName="takeProfitLong" title="Takeprofit" openCreateModal={openCreateModal} />
            <BotValueSingle eventName="takeProfitShort" title="Takeprofit" openCreateModal={openCreateModal} />

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
