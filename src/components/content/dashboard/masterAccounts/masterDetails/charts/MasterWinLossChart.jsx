import { darkTheme } from '@/style/darkTheme';
import LineChartBase from '@/components/charts/base/lineChartBase/LineChartBase';
import WinLossCountTooltip from '@/components/tables/botsTable/tooltips/WinLossCountTooltip';

export default function MasterWinLossChart({ analysisData = [], winPropName, lossPropName, type, period = '24h' }) {
   if (!winPropName || !lossPropName) return <></>;

   const dataSet = [
      { id: 'wins', label: 'WINS', lineColor: darkTheme.palette.success.main, values: [] },
      { id: 'loses', label: 'LOSES', lineColor: darkTheme.palette.error.main, values: [] }
   ];

   analysisData.map(result => {
      dataSet[0].values.push({ time: result.refDate, value: result[winPropName] });
      dataSet[1].values.push({ time: result.refDate, value: result[lossPropName] });
   });

   return (
      <LineChartBase
         className="chart"
         headerTitle={`WIN/LOSS ${type} (${period})`}
         tooltipHeader={`WIN/LOSS ${type} (${period})`}
         TooltipContent={() => <WinLossCountTooltip period={period} onlyContent={true} />}
         multiline={dataSet}
      />
   );
}
