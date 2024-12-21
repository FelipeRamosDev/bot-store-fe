import { useContext, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Card from '@/components/common/card/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MasterLimitsSet from './masterLimitSet/MasterLimitSet';
import FormInput from '@/components/forms/formBase/FormInput';
import FormBaseContext from '../../formBase/FormBase';

/**
 * `MasterLimitsForm` component renders a form section for configuring various limits 
 * for a master account. It includes settings for trade, daily, and monthly limits, 
 * with each section being collapsible via an accordion.
 *
 * @returns {JSX.Element} - The rendered form section for configuring master account limits.
 */
export default function MasterLimitsForm() {
   const { form } = useContext(FormBaseContext);
   const [ useTrailingStop, setUseTrailingStop ] = useState(false);
   const [ autoCallbackRatio, setAutoCallbackRatio ] = useState(form?.limits?.autoCallbackRatio);
   const handleTrailingSwitch = (value) => setUseTrailingStop(value);
   const handleAutoCallbackRatio = (value) => setAutoCallbackRatio(value);

   useEffect(() => {
      const autoCallbackSchema = form.getSchema('limits.autoCallbackRatio');
      const useTrailingStop = Boolean(form.editData?.limits?.useTrailingStop);
      const autoCallbackRatio = Boolean(form?.editMode ? form.editData?.limits?.autoCallbackRatio : autoCallbackSchema?.defaultValue);

      setUseTrailingStop(useTrailingStop);
      setAutoCallbackRatio(autoCallbackRatio);
   }, []);

   return <Stack flexDirection="row" flex={1}>
      <Card padding="xs" elevation={10}>
         <h4 className="card-title">Limits Configurations</h4>
         <p className="help-info text-center">
            You can set limits for the slots under this account, limits are goals that once they are reached, it pauses the account and return on the next period. You can set limits by:
         </p>

         <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <b>Trade</b>
            </AccordionSummary>

            <AccordionDetails>
               <MasterLimitsSet type="tradeLoss" />
               <MasterLimitsSet type="tradeGain" />
               
               <div className="trailing-stop-wrap">
                  <FormInput path="limits.useTrailingStop" onCustomChange={handleTrailingSwitch} />
                                          
                  {useTrailingStop && (
                     <div className="trailing-stop-fields">
                        <FormInput path="limits.autoCallbackRatio" onCustomChange={handleAutoCallbackRatio} />

                        {!autoCallbackRatio && <FormInput path="limits.callbackRatio" />}
                     </div>
                  )}
               </div>
            </AccordionDetails>
         </Accordion>

         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <b>Day</b>
            </AccordionSummary>

            <AccordionDetails>
               <MasterLimitsSet type="dailyLoss" />
               <MasterLimitsSet type="dailyGain" />
            </AccordionDetails>
         </Accordion>

         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <b>Month</b>
            </AccordionSummary>

            <AccordionDetails>
               <MasterLimitsSet type="monthlyLoss" />
               <MasterLimitsSet type="monthlyGain" />
            </AccordionDetails>
         </Accordion>
      </Card>
   </Stack>
}
