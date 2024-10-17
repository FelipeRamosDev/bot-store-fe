import TooltipTableHead from '../../../tables/tableBase/TooltipTableHead';
import HelpTooltip from '@/components/tooltips/helpTooltip/HelpTooltip';

const formula = `SUM(ROI's 30 days) / 30`;
const descr1 = `The Daily ROI is the average return on investment over the last 30 days.`;

export default function DailyROITooltip({ onlyContent }) {
   function Content() {
      return (<>
         <p>{descr1}</p>

         <p className="no-margin">See the calculation formula below:</p>
         <span>{formula}</span>
      </>);
   }

   if (onlyContent) {
      return <Content />;
   }

   return (
      <TooltipTableHead>
         Daily ROI (μ)

         <HelpTooltip headerTitle="Daily ROI (μ)">
            <Content />
         </HelpTooltip>
      </TooltipTableHead>
   )
}
