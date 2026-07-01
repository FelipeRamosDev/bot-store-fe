import TabDisplay from "@/components/displays/tabDisplay/TabDisplay";
import BotValueModal from "@/components/modals/botValueModal/BotValueModal";
import BotValuesTable from "@/components/tables/botValuesTable/BotValuesTable";
import BotThread from "@/components/tiles/bot/botThread/BotThread";
import BotValueSingle from "@/components/tiles/bot/botValueSingle/BotValueSingle";
import DBQueryContext from "@/contexts/DBQuery";
import usePilot from "@/hooks/usePilot";
import { useContext, useState } from "react";

export default function BotTabs({ }) {
   const { doc } = useContext(DBQueryContext);
   const [createValueModal, setCreateValueModal] = useState('');
   const { createThread } = usePilot();

   function openCreateModal(eventName) {
      switch (eventName) {
         case 'stopLossLong':
         case 'stopLossShort':
         case 'takeProfitLong':
         case 'takeProfitShort':
            const thread = doc.eval[eventName];
            setCreateValueModal({ parentThreads: thread?._id, eventName, valueType: 'function' });
            break;
      }
   }

   const items = [
      {
         id: 'stoploss-takeprofit',
         buttonLabel: 'SL/TP',
         title: 'Stoploss / Takeprofit',
         Content: ({ className }) => (
            <div className={className}>
               <BotValueSingle eventName="stopLossLong" title="Stoploss" openCreateModal={openCreateModal} />
               <BotValueSingle eventName="stopLossShort" title="Stoploss" openCreateModal={openCreateModal} />
               <BotValueSingle eventName="takeProfitLong" title="Takeprofit" openCreateModal={openCreateModal} />
               <BotValueSingle eventName="takeProfitShort" title="Takeprofit" openCreateModal={openCreateModal} />

               <BotValueModal bot={doc} open={createValueModal} setModal={setCreateValueModal} />
            </div>
         )
      },
      {
         id: 'open-long',
         buttonLabel: 'Open Long',
         title: 'Open Long',
         Content: ({ className }) => <BotThread className={className} threadID="openLong" title="Open Long" color="success" createThread={createThread} />
      },
      {
         id: 'close-long',
         buttonLabel: 'Close Long',
         title: 'Close Long',
         Content: ({ className }) => <BotThread className={className} threadID="closeLong" title="Close Long" color="error" createThread={createThread} />
      },
      {
         id: 'open-short',
         buttonLabel: 'Open Short',
         title: 'Open Short',
         Content: ({ className }) => <BotThread className={className} threadID="openShort" title="Open Short" color="success" createThread={createThread} />
      },
      {
         id: 'close-short',
         buttonLabel: 'Close Short',
         title: 'Close Short',
         Content: ({ className }) => <BotThread className={className} threadID="closeShort" title="Close Short" color="error" createThread={createThread} />
      },
      {
         id: 'bot-values',
         buttonLabel: 'Bot Values',
         title: 'Bot Values',
         Content: ({ className }) => <BotValuesTable className={className} values={doc.values} />
      },
   ];

   return (
      <TabDisplay items={items} />
   );
}
