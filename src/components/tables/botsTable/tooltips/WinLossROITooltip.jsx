import TooltipTableHead from '../../tableBase/TooltipTableHead';
import HelpTooltip from '@/components/tooltips/helpTooltip/HelpTooltip';

export default function WinLossROITooltip({ period, onlyContent }) {
   if (period) period = period.toUpperCase();

   const formula1 = `Average ROI for winning positions = SUM(ROI of winning positions) / Number of winning positions`;
   const formula2 = `Average ROI for losing positions = SUM(ROI of losing positions) / Number of losing positions`;
   const descr1 = `On the left side, you can see the average ROI of winning positions and the average ROI of losing positions over the last ${period}.`;

   function Content() {
      return (<>
         <p>{descr1}</p>

         <p className="no-margin">See the calculation formula below:</p>
         <p className="no-margin">{formula1}</p>
         <p className="no-margin">{formula2}</p>
      </>);
   }
   
   if (onlyContent) {
      return <Content />;
   }

   return (
      <TooltipTableHead>
         W/L ROI ({period}/μ)

         <HelpTooltip headerTitle={`WIN/LOSS ROI ${period}`}>
            <Content />
         </HelpTooltip>
      </TooltipTableHead>
   )
}
