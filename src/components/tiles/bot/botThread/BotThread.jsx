'use client';
import './BotThread.scss';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';

export default function BotThread({ threadID, title, color }) {
   const { doc = {} } = useContext(DBQueryContext);
   const evalThread = doc.eval;
   const threadBlock = evalThread && evalThread[threadID];
   const thread = threadBlock && threadBlock.thread;

   if (!thread) {
      return <></>;
   }

   const threadChildren = [ ...thread.blocks, ...thread.rules ];
   console.log(threadChildren)
   return (
      <WatermarkPriceCard
         className="bot-thread"
         watermark="Thread"
         radius="s"
         borderColor={color}
         elevation={10}
      >
         <ContentHeader>
            <HorizontalSplitIcon /> <h5 className="card-title">{title}</h5>
         </ContentHeader>

         <div className="card-body">
            {threadChildren.map(child => {
               if (child.type === 'block') {
                  return (
                     <WatermarkPriceCard
                        watermark="Block"
                        radius="s"
                        elevation={10}
                     >Block</WatermarkPriceCard>
                  );
               }

               if (child.type === 'evaluation') {
                  return (
                     <WatermarkPriceCard
                        watermark="Evaluate"
                        radius="s"
                        padding="xs"
                        borderSide="bottom"
                        elevation={10}
                     >Rule</WatermarkPriceCard>
                  );
               }
            })}
         </div>
      </WatermarkPriceCard>
   );
}
