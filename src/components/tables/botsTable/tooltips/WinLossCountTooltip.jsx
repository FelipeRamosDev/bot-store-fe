import TooltipTableHead from '../../tableBase/TooltipTableHead';
import HelpTooltip from '@/components/tooltips/helpTooltip/HelpTooltip';

export default function WinLossCountTooltip({ period, onlyContent }) {
   if (period) period = period.toUpperCase();

   const descr1 = `On the left side, you can see the percentage of winning positions over the last ${period}.`;
   const descr2 = `On the right side, you can see the percentage of losing positions over the last ${period}.`;

   function Content() {
      return (<>
         <p className="no-margin">{descr1}</p>
         <p className="no-margin">{descr2}</p>
      </>);
   }

   if (onlyContent) {
      return <Content />;
   }

   return (
      <TooltipTableHead>
         W/L ({period})

         <HelpTooltip headerTitle={`WIN/LOSS ${period}`}>
            <Content />
         </HelpTooltip>
      </TooltipTableHead>
   )
}
