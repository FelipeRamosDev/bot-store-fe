import CutLineChartBase from '../base/cutLineChartBase/CutLineChartBase';

export default function ProfitRatioChart({ results = [] }) {
   const dataSet = [];

   results.map(result => dataSet.push({ time: result.refDate, value: result.profitRatio }));
   return <CutLineChartBase className="chart" headerTitle="Profit Ratio" cutValue={1} dataSet={dataSet} />;
}
