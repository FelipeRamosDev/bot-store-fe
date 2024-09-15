import './Rule.scss';
import { useContext, useState, Fragment } from 'react';
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
import { comparisonChange, parseRuleTitle, deleteRule } from './Rule.helper';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { Close } from '@mui/icons-material';

export default function Rule({ index, rule = {}, logicalOperator, ...props }) {
   const { doc } = useContext(DBQueryContext);
   const API = useContext(APIContext);
   const [ createValueModal, setCreateValueModal ] = useState('');
   const [ toCompare, setToCompare ] = useState(false);

   const toComparisonChange = (ev) => comparisonChange(ev, API, doc, rule, setToCompare);
   const handleDelete = () => deleteRule(API, rule, doc._id);

   if (!Array.isArray(rule.children)) {
      return <></>;
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
         <div className="rule-header">
            {rule.children.length > 0 && <span>{rule.children.length === 2 ? parseRuleTitle(rule.comparison) : 'IS TRUE'}</span>}

            <RoundIconButton className="close-button" Icon={Close} size="small" onClick={handleDelete} />
         </div>

         {rule.children.map((value, index) => {
            return (<Fragment key={value._id}>
               {index === 1 && (
                  <div className="buttons">
                     {!toCompare && <BotThreadDivider text={rule.comparison} onClick={() => setToCompare(true)} />}

                     {(toCompare || !rule.comparison) && <CheckButtonGroupInput
                        onChange={toComparisonChange}
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

               <BotValue botValue={value} parentRule={rule} />
            </Fragment>)
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

