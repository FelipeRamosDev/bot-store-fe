import DailyROITooltip from '@/components/shared/bot/tooltips/DailyROITooltip';
import CutLineChartBase from '../base/cutLineChartBase/CutLineChartBase';

export default function AvgDailyROSChart({ results = [] }) {
   const dataSet = [];

   results.map(result => dataSet.push({ time: result.refDate, value: result.avgDailyROS }));
   return (
      <CutLineChartBase
         className="chart"
         headerTitle="Average Daily ROS"
         tooltipHeader="Average Daily ROS"
         TooltipContent={() => <DailyROITooltip onlyContent={true} />}
         dataSet={dataSet}
      />
   );
}
