import TooltipTableHead from '../../../tables/tableBase/TooltipTableHead';
import HelpTooltip from '@/components/tooltips/helpTooltip/HelpTooltip';

export default function AccumROITooltip({ period, onlyContent }) {
   if (period) period = period.toUpperCase();

   const formula = `SUM(Position ROIs over the last ${period})`;
   const descr1 = `The ${period} ROI is the sum of all position ROIs from the last ${period}.`;

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
         ROI ({period})

         <HelpTooltip headerTitle={`Accumulated ROI (${period})`}>
            <Content /> 
         </HelpTooltip>
      </TooltipTableHead>
   )
}
