import DailyROITooltip from '@/components/shared/bot/tooltips/DailyROITooltip';
import CutLineChartBase from '../base/cutLineChartBase/CutLineChartBase';

export default function AvgDailyROIChart({ results = [] }) {
   const dataSet = [];

   results.map(result => dataSet.push({ time: result.refDate, value: result.avgDailyROI }));
   return (
      <CutLineChartBase
         className="chart"
         headerTitle="Average Daily ROI"
         tooltipHeader="Average Daily ROI"
         TooltipContent={() => <DailyROITooltip onlyContent={true} />}
         dataSet={dataSet}
      />
   );
}
