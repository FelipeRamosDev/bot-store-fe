import CutLineChartBase from '@/components/charts/base/cutLineChartBase/CutLineChartBase';
import { parseClassName } from '@/helpers/parser';

export default function MasterWinLossRoi({ className, analysisData = [] }) {
   return (
      <CutLineChartBase
         className={parseClassName(className, [ 'win-loss-roi-chart', 'chart' ])}
         headerTitle="Daily Average"
         switcherSet={[
            {
               label: '24H',
               value: '24H',
               data: analysisData.map(data => ({ time: data.refDate, value: data.avgDailyUSD }))
            },
            {
               label: '30D',
               value: '30D',
               data: analysisData.map(data => ({ time: data.refDate, value: data.avgDailyROI }))
            }
         ]}
      />
   );
}
