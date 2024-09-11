import './Rule.scss';
import { useContext, useState } from 'react';
import BotValue from '../botValue/BotValue';
import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import configs from '@/config.json';
import BotThreadDivider from '../botThreadDivider/BotThreadDivider';
import DBQueryContext from '@/contexts/DBQuery';
import BotValueModal from '@/components/modals/botValueModal/BotValueModal';
import AddBotValuesMenu from '@/components/menus/dropdown/addBotValuesMenu/AddBotValuesMenu';
import RubberButton from '@/components/buttons/rubberButton/RubberButton';
import CheckButtonGroupInput from '@/components/inputs/checkButtonGroupInput/CheckButtonGroupInput';
import APIContext from '@/contexts/4HandsAPI';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export default function Rule({ index, rule = {}, logicalOperator, ...props }) {
   const { doc } = useContext(DBQueryContext);
   const API = useContext(APIContext);
   const [ createValueModal, setCreateValueModal ] = useState('');
   const [ toCompare, setToCompare ] = useState(false);

   if (!Array.isArray(rule.children)) {
      return <></>;
   }

   async function comparisonChange({ target: { value } }) {
      try {
         const updated = await API.ajax.authPost('/bot/update-rule', {
            botUID: doc._id,
            ruleUID: rule._id,
            docData: { comparison: value }
         });

         if (updated.error) {
            throw updated;
         }

         if (updated.success) {
            setToCompare(false);
         }
      } catch (err) {
         throw err;
      }
   }

   return (<>
      {index ? <BotThreadDivider mode="card" text={logicalOperator} /> : ''}
      <WatermarkPriceCard
         className="bot-rule"
         watermark="Evaluate"
         radius="s"
         padding="xs"
         borderSide="bottom"
         watermarkSize={window.innerWidth < configs.breakpoints.s ? 18 : 23}
         elevation={10}
         {...props}
      >
         {rule.children.map((value, index) => {
            return (<>
               {index === 1 && (
                  <div className="buttons" key={value._id + 'divider'}>
                     {!toCompare && <BotThreadDivider text={rule.comparison} onClick={() => setToCompare(true)} />}

                     {(toCompare || !rule.comparison) && <CheckButtonGroupInput
                        onChange={comparisonChange}
                        schema={{
                           key: 'comparison',
                           defaultValue: rule.comparison,
                           verticalAlign: true,
                           options: [
                              { label: '<', value: '<' },
                              { label: '>', value: '>' },
                              { label: '>=', value: '>=' },
                              { label: '<=', value: '<=' },
                              { label: '=', value: '=' },
                              { label: '!=', value: '!=' },
                           ]
                        }}
                     />}
                  </div>
               )}

               <BotValue key={value._id} botValue={value} />
            </>)
         })}

         {!rule.children.length ? (
            <div className="add-new">
               <AddBotValuesMenu bot={doc} setModalState={setCreateValueModal} />
            </div>
         ) : ''}

         {!toCompare && rule.children.length === 1 && (
            <div className="buttons">
               <RubberButton color="success" onClick={() => setToCompare(true)}>
                  <CompareArrowsIcon />
               </RubberButton>
            </div>
         )}

         {toCompare && rule.children.length === 1 && (
            <div className="add-new">
               <AddBotValuesMenu bot={doc} setModalState={setCreateValueModal} />
            </div>
         )}

         <BotValueModal bot={doc} parentRule={rule} open={createValueModal} setModal={setCreateValueModal} />
      </WatermarkPriceCard>
   </>);
}

