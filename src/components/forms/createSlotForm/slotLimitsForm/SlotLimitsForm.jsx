import Card from '@/components/common/card/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SlotLimitSet from './slotLimitSet/SlotLimitSet';

export default function SlotLimitsForm() {
   return (
      <Card className="account-limits input-wrap" padding="xs" elevation={10}>
         <h4 className="card-title">Limits</h4>
         <p className="help-info text-center">The fields below that you leave empty will use the master account set instead.</p>

         <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <b>Trade</b>
            </AccordionSummary>

            <AccordionDetails>
               <SlotLimitSet type="tradeLoss" />
               <SlotLimitSet type="tradeGain" />
            </AccordionDetails>
         </Accordion>
      </Card>
   );
}
