'use client';
import './BotThread.scss';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import Rule from '@/components/tiles/bot/rule/Rule';
import configs from '@/config.json';

export default function BotThread({ threadID, title, color, ...props }) {
   const { doc = {} } = useContext(DBQueryContext);
   const evalThread = doc.eval;
   const threadBlock = evalThread && evalThread[threadID];
   const thread = threadBlock && threadBlock.thread;

   if (!thread) {
      return <></>;
   }

   const threadChildren = [ ...thread.blocks, ...thread.rules ];
   return (
      <WatermarkPriceCard
         className="bot-thread"
         watermark="Thread"
         radius="s"
         borderColor={color}
         elevation={10}
         watermarkSize={window.innerWidth < configs.breakpoints.s ? 23 : 28}
         paddingSize={window.innerWidth < configs.breakpoints.s ? 3 : 14}
         {...props}
      >
         <ContentHeader>
            <HorizontalSplitIcon /> <h5 className="card-title">{title}</h5>
         </ContentHeader>

         <div className="card-body">
            {threadChildren.map(child => {
               if (child.type === 'block') {
                  return (
                     <WatermarkPriceCard
                        key={child._id}
                        watermark="Block"
                        radius="s"
                        elevation={10}
                     >Block</WatermarkPriceCard>
                  );
               }

               if (child.type === 'evaluation') {
                  return <Rule key={child._id} rule={child} />;
               }
            })}
         </div>
      </WatermarkPriceCard>
   );
}
