'use client';
import './BotThread.scss';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import APIContext from '@/contexts/4HandsAPI';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import Rule from '@/components/tiles/bot/rule/Rule';
import Block from '../block/Block';
import configs from '@/config.json';
import NoDocumentsTile from '../../noDocumentsTile/NoDocumentsTile';
import LogicalOperatorForm from '@/components/forms/logicalOperatorForm/LogicalOperatorForm';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddBotRuleMenu from '@/components/menus/dropdown/addBotRuleMenu/AddBotRuleMenu';

export default function BotThread({ threadID, title, color, ...props }) {
   const API = useContext(APIContext);
   const { doc = {} } = useContext(DBQueryContext);
   const evalThread = doc.eval;
   const threadBlock = evalThread && evalThread[threadID];
   const thread = threadBlock && threadBlock.thread;
   const watermarkSize = window.innerWidth < configs.breakpoints.s ? 23 : 28;
   const paddingSize = window.innerWidth < configs.breakpoints.s ? 3 : 14;

   async function createThread() {
      try {
         const created = await API.ajax.authPut('/bot/add-thread', {
            eventName: threadID,
            botUID: doc._id
         });

         if (created.error) {
            throw created;
         }
      } catch (err) {
         throw err;
      }
   }

   async function handleDelete() {
      try {
         const deleted = await API.ajax.authDelete('/bot/delete-block', {
            blockUID: thread._id,
            botUID: doc._id
         });

         if (deleted.error) {
            throw deleted;
         }
      } catch (err) {
         throw err;
      }
   }

   if (!thread && (threadID === 'openLong' || threadID === 'openShort')) {
      return <NoDocumentsTile message={title} onClick={createThread} />;
   }

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
         watermarkSize={watermarkSize}
         paddingSize={paddingSize}
         {...props}
      >
         <ContentHeader Toolbar={() => <>
            <LogicalOperatorForm botUID={doc._id} block={thread} />

            <Button className="delete-button" color="info" onClick={handleDelete}>
               <Delete />
            </Button>
         </>}>
            <HorizontalSplitIcon fontSize="small" /> <h5 className="card-title">{title}</h5>
         </ContentHeader>

         <div className="card-body">
            {threadChildren.map((child, index) => {
               if (child.type === 'block') {
                  return <Block key={child._id} block={child} index={index} logicalOperator={thread.ifType} />;
               }

               if (child.type === 'evaluation') {
                  return <Rule key={child._id} rule={child} index={index} logicalOperator={thread.ifType} />;
               }
            })}
            
            <div className="add-new">
               <AddBotRuleMenu parentBlock={thread} />
            </div>
         </div>
      </WatermarkPriceCard>
   );
}
