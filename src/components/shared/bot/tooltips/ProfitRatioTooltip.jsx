import HelpTooltip from '@/components/tooltips/helpTooltip/HelpTooltip';
import TooltipTableHead from '../../../tables/tableBase/TooltipTableHead';

const formula = `(Average WINS ROI's of last 30 days / Number of LOSES positions od last 30 days) / ((Average LOSES ROI's of last 30 days * -1) / Number of WINS positions od last 30 days)`;
const descr1 = `The Profit Ratio is a metric that balances the proportion between the number of wins/losses and the ROI percentage of each.`;
const descr2 = `A ratio greater than 1 indicates a profitable situation, meaning you have a higher chance of earning a profit. Conversely, if the ratio is less than 1, there is a higher likelihood of incurring a loss.`;

export default function ProfitRatioTooltip({ onlyContent }) {
   function Content() {
      return (<>
         <p>{descr1}</p>
         <p>{descr2}</p>

         <p className="no-margin">Check below the calculation formula:</p>
         <span>{formula}</span>
      </>);
   }

   if (onlyContent) {
      return <Content />
   }

   return (
      <TooltipTableHead>
         Profit Ratio

         <HelpTooltip headerTitle="Profit Ratio">
            <Content />
         </HelpTooltip>
      </TooltipTableHead>
   )
}
