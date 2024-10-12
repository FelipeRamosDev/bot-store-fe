import TooltipBase from '../base/TooltipBase';
import HelpIcon from '@mui/icons-material/Help';

export default function HelpTooltip({ headerTitle, children }) {
   return (
      <TooltipBase headerTitle={headerTitle} Content={children}>
         <HelpIcon fontSize="small" />
      </TooltipBase>
   );
}
