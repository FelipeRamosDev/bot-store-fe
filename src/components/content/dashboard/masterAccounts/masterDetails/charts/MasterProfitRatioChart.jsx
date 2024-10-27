import CutLineChartBase from '@/components/charts/base/cutLineChartBase/CutLineChartBase';
import { parseClassName } from '@/helpers/parser';

export default function MasterProfitRatioChart({ className, analysisData = [] }) {
   const chartData = analysisData.map(data => ({ time: data.refDate, value: data.profitRatio }));

   return (
      <CutLineChartBase
         className={parseClassName(className, [ 'profit-ratio-chart', 'chart' ])}
         headerTitle="Profit Ratio"
         dataSet={chartData}
      />
   );
}
