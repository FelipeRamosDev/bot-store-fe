import CutLineChartBase from '@/components/charts/base/cutLineChartBase/CutLineChartBase';
import { parseClassName } from '@/helpers/parser';

export default function MasterAccumulatedChart({ className, analysisData = [] }) {
   const chartDataUSD = analysisData.map(data => ({ time: data.refDate, value: data.accumUSD30d }));

   return (
      <CutLineChartBase
         className={parseClassName(className, [ 'accumulated-chart', 'chart' ])}
         headerTitle="Accumulated Profit"
         dataSet={chartDataUSD}
         switcherSet={[
            {
               label: '$',
               value: '$',
               data: analysisData.map(data => ({ time: data.refDate, value: data.accumUSD30d }))
            },
            {
               label: '%',
               value: '%',
               data: analysisData.map(data => ({ time: data.refDate, value: data.accumROI30d }))
            },
            {
               label: 'x',
               value: 'x',
               data: analysisData.map(data => ({ time: data.refDate, value: data.accumROS30d }))
            },
         ]}
      />
   );
}
