import { Stack } from '@mui/material';
import Card from '@/components/common/card/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MasterLimitsSet from './masterLimitSet/MasterLimitSet';

export default function SlotLimitsForm() {
   return <Stack flexDirection="row" flex={1}>
      <Card padding="xs" elevation={10}>
         <h4 className="card-title">Limits Configurations</h4>
         <p className="text-center">You can set limits for the slots under this account, limits are goals that once they are reached, it pauses the account and return on the next period. You can set limits by: <b>Trade, Day or Month</b></p>

         <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
               <b>Trade</b>
            </AccordionSummary>

            <AccordionDetails>
               <MasterLimitsSet type="tradeLoss" />
               <MasterLimitsSet type="tradeGain" />
            </AccordionDetails>
         </Accordion>
      </Card>
   </Stack>
}
