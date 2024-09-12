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

export default function Block({ block = {}, index, logicalOperator }) {
   const API = useContext(APIContext);
   const { doc } = useContext(DBQueryContext);
   const watermarkSize = window.innerWidth < configs.breakpoints.s ? 23 : 28;
   const paddingSize = window.innerWidth < configs.breakpoints.s ? 3 : 14;
   const blockUID = block._id;

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
