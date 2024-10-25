import { darkTheme } from '@/style/darkTheme';
import LineChartBase from '../base/lineChartBase/LineChartBase';
import WinLossCountTooltip from '@/components/tables/botsTable/tooltips/WinLossCountTooltip';
import WinLossROITooltip from '@/components/tables/botsTable/tooltips/WinLossROITooltip';

export default function WinLossChart({ results = [], type = 'rate', period = '24h' }) {
   const dataSet = [
      { id: 'wins', label: 'WINS', lineColor: darkTheme.palette.success.main, values: [] },
      { id: 'loses', label: 'LOSES', lineColor: darkTheme.palette.error.main, values: [] }
   ];

   if (type === 'rate' && period === '24h') {
      results.map(result => {
         dataSet[0].values.push({ time: new Date(result.refDate).getTime(), value: result.winsRate24 });
         dataSet[1].values.push({ time: new Date(result.refDate).getTime(), value: result.losesRate24 });
      });
   
      return (
         <LineChartBase
            className="chart"
            headerTitle="WIN/LOSS Rate (24h)"
            tooltipHeader="WIN/LOSS Rate (24h)"
            TooltipContent={() => <WinLossCountTooltip period={period} onlyContent={true} />}
            multiline={dataSet}
         />
      );
   }

   if (type === 'rate' && period === '30d') {
      results.map(result => {
         dataSet[0].values.push({ time: new Date(result.refDate).getTime(), value: result.winsRateMonth });
         dataSet[1].values.push({ time: new Date(result.refDate).getTime(), value: result.losesRateMonth });
      });
   
      return (
         <LineChartBase
            className="chart"
            headerTitle="WIN/LOSS Rate (30d)"
            tooltipHeader="WIN/LOSS Rate (30d)"
            TooltipContent={() => <WinLossCountTooltip period={period} onlyContent={true} />}
            multiline={dataSet}
         />
      );
   }

   if (type === 'roi' && period === '24h') {
      results.map(result => {
         dataSet[0].values.push({ time: new Date(result.refDate).getTime(), value: result.avgWinsROS24 });
         dataSet[1].values.push({ time: new Date(result.refDate).getTime(), value: result.avgLosesROS24 * -1 });
      });
   
      return (
         <LineChartBase
            className="chart"
            headerTitle="WIN/LOSS ROS (24h)"
            tooltipHeader="WIN/LOSS ROS (24h)"
            TooltipContent={() => <WinLossROITooltip period={period} onlyContent={true} />}
            multiline={dataSet}
         />
      );
   }

   if (type === 'roi' && period === '30d') {
      results.map(result => {
         dataSet[0].values.push({ time: new Date(result.refDate).getTime(), value: result.avgWinsROSMonth });
         dataSet[1].values.push({ time: new Date(result.refDate).getTime(), value: result.avgLosesROSMonth * -1 });
      });
   
      return (
         <LineChartBase
            className="chart"
            headerTitle="WIN/LOSS ROS (30d)"
            tooltipHeader="WIN/LOSS ROS (30d)"
            TooltipContent={() => <WinLossROITooltip period={period} onlyContent={true} />}
            multiline={dataSet}
         />
      );
   }
}
