'use client';
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

/**
 * Renders a bot thread card, which includes a header with a logical operator form and delete button,
 * and displays the blocks and rules within the thread.
 *
 * @param {Object} props - The component props.
 * @param {string} props.threadID - The ID of the thread to display.
 * @param {Function} props.createThread - Function to create a new thread if one does not exist.
 * @param {string} props.title - The title of the thread card.
 * @param {string} props.color - The color for the thread border.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function BotThread({ threadID, createThread, title, color, ...props }) {
   const API = useContext(APIContext);
   const { doc = {} } = useContext(DBQueryContext);
   const evalThread = doc.eval;
   const threadBlock = evalThread && evalThread[threadID];
   const thread = threadBlock && threadBlock.thread;
   const watermarkSize = window.innerWidth < configs.breakpoints.s ? 23 : 28;
   const paddingSize = window.innerWidth < configs.breakpoints.s ? 3 : 14;
   const iconSize = window.innerWidth < configs.breakpoints.m ? 'small' : 'medium';

   /**
    * Handles the deletion of a thread block by sending a request to the API.
    * 
    * @async
    * @function
    * @throws {Error} Throws an error if the deletion request fails.
    */
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

   // Display a tile to create a new thread if the thread does not exist and the threadID is 'openLong' or 'openShort'.
   if (!thread && (threadID === 'openLong' || threadID === 'openShort')) {
      return <NoDocumentsTile message={title} onClick={() => createThread(threadID)} />;
   }

   // If no thread is found, render nothing.
   if (!thread) {
      return <></>;
   }

   // Combine blocks and rules into a single array for rendering.
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
         <ContentHeader className="thread-header" Toolbar={() => <>
            <LogicalOperatorForm botUID={doc._id} block={thread} />

            <Button className="delete-button" color="info" onClick={handleDelete}>
               <Delete fontSize={iconSize} />
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
