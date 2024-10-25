import AccumROITooltip from '@/components/shared/bot/tooltips/AccumROITooltip';
import CutLineChartBase from '../base/cutLineChartBase/CutLineChartBase';

export default function AccumROSChart({ results = [], period = '24h' }) {
   const dataSet = [];

   if (period === '24h') {
      results.map(result => dataSet.push({ time: result.refDate, value: result.accumROS24 }));
      return (
         <CutLineChartBase
            className="chart"
            headerTitle="Accumulated ROS (24h)"
            tooltipHeader="Accumulated ROS (24h)"
            TooltipContent={() => <AccumROITooltip period={period} onlyContent={true} />}
            dataSet={dataSet}
         />
      );
   }

   if (period === '30d') {
      results.map(result => dataSet.push({ time: result.refDate, value: result.accumROSMonth }));
      return (
         <CutLineChartBase
            className="chart"
            headerTitle="Accumulated ROS (30d)"
            tooltipHeader="Accumulated ROS (30d)"
            TooltipContent={() => <AccumROITooltip period={period} onlyContent={true} />}
            dataSet={dataSet}
         />
      );
   }
}
