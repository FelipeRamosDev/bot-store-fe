import TooltipTableHead from '../../tableBase/TooltipTableHead';
import HelpTooltip from '@/components/tooltips/helpTooltip/HelpTooltip';

export default function PositionROIAvgTooltip({ period }) {
   if (period) period = period.toUpperCase();

   const formula = `SUM(Position ROIs over the last ${period}) / Number of positions over the last ${period}`;
   const descr1 = `The ${period} ROI is the average of all position ROIs over the last ${period}.`;

   return (
      <TooltipTableHead>
         Pos. ROI ({period}/μ)

         <HelpTooltip headerTitle={`Average of Position's ROI over last ${period}`}>
            <p>{descr1}</p>

            <p className="no-margin">See the calculation formula below:</p>
            <span>{formula}</span>
         </HelpTooltip>
      </TooltipTableHead>
   )
}
