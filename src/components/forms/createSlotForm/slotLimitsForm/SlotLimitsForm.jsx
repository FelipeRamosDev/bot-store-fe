import Card from '@/components/common/card/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SlotLimitSet from './slotLimitSet/SlotLimitSet';

/**
 * `SlotLimitsForm` component provides a form section for configuring slot limits.
 * It displays a card with an accordion for trade limits, which includes
 * settings for trade loss and trade gain.
 *
 * @returns {JSX.Element} - The rendered form section for slot limits.
 */
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
