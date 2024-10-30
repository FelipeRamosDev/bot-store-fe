import CutLineChartBase from '@/components/charts/base/cutLineChartBase/CutLineChartBase';
import { parseClassName } from '@/helpers/parser';

export default function MasterDailyAvgChart({ className, analysisData = [] }) {
   return (
      <CutLineChartBase
         className={parseClassName(className, [ 'profit-ratio-chart', 'chart' ])}
         headerTitle="Daily Average"
         switcherSet={[
            {
               label: '$',
               value: '$',
               data: analysisData.map(data => ({ time: data.refDate, value: data.avgDailyUSD }))
            },
            {
               label: '%',
               value: '%',
               data: analysisData.map(data => ({ time: data.refDate, value: data.avgDailyROI }))
            },
            {
               label: 'x',
               value: 'x',
               data: analysisData.map(data => ({ time: data.refDate, value: data.avgDailyROS }))
            },
         ]}
      />
   );
}
