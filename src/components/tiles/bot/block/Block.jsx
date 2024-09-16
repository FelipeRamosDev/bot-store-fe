'use client';
import './Block.scss';
import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import BotThreadDivider from '../botThreadDivider/BotThreadDivider';
import Rule from '../rule/Rule';
import configs from '@/config.json';
import AddBotRuleMenu from '@/components/menus/dropdown/addBotRuleMenu/AddBotRuleMenu';
import CheckButtonGroupInput from '@/components/inputs/checkButtonGroupInput/CheckButtonGroupInput';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import APIContext from '@/contexts/4HandsAPI';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';

/**
 * Renders a block of bot logic including its header, child blocks, and rules.
 * Allows editing and deleting the block, and adding new rules or blocks.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.block - The block data to display.
 * @param {number} props.index - The index of the block in the list.
 * @param {string} props.logicalOperator - The logical operator associated with the block.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function Block({ block = {}, index, logicalOperator }) {
   const API = useContext(APIContext);
   const { doc } = useContext(DBQueryContext);
   const watermarkSize = window.innerWidth < configs.breakpoints.s ? 23 : 28;
   const paddingSize = window.innerWidth < configs.breakpoints.s ? 3 : 14;
   const blockUID = block._id;

   /**
    * Handles updating the logical operator of the block.
    *
    * @async
    * @param {Object} event - The event object containing the new logical operator value.
    * @param {Object} event.target - The target of the event.
    * @param {string} event.target.value - The new logical operator value.
    * @throws {Error} Throws an error if the update request fails.
    */
   async function editLogicalOperator({ target: { value }}) {
      try {
         const updated = await API.ajax.authPost('/bot/update-block', {
            blockUID,
            botUID: doc._id,
            toUpdate: { ifType: value }
         });

         if (updated.error) {
            throw updated;
         }
      } catch (err) {
         throw err;
      }
   }

   /**
    * Handles the deletion of the block.
    *
    * @async
    * @throws {Error} Throws an error if the deletion request fails.
    */
   async function deleteBlock() {
      try {
         const deleted = await API.ajax.authDelete('/bot/delete-block', {
            blockUID,
            botUID: doc._id,
         });

         if (deleted.error) {
            throw deleted;
         }
      } catch (err) {
         throw err;
      }
   }

   return (<>
      {index ? <BotThreadDivider mode="card" text={logicalOperator} /> : ''}
      <WatermarkPriceCard
         className="bot-block"
         watermark="Block"
         radius="s"
         padding="xs"
         elevation={10}
         watermarkSize={watermarkSize}
         paddingSize={paddingSize}
      >
         <div className="block-header">
            <span>{block.ifType?.toUpperCase()}</span>

            <CheckButtonGroupInput
               onChange={editLogicalOperator}
               schema={{
                  defaultValue: block?.ifType,
                  options: [
                     { label: 'AND', value: 'and' },
                     { label: 'OR', value: 'or' }
                  ]
               }}
            />

            <Button className="delete-button" color="error" onClick={deleteBlock}>
               <Delete />
            </Button>
         </div>

         {block.blocks.map((item, i) => (
            <Block key={item._id} block={item} index={i} logicalOperator={block.ifType} />
         ))}

         {block.rules.map((item, i) => (
            <Rule key={item._id} rule={item} index={i} logicalOperator={block.ifType} />
         ))}

         <div className="add-new">
            <AddBotRuleMenu parentBlock={block} />
         </div>
      </WatermarkPriceCard>
   </>
   );
}
