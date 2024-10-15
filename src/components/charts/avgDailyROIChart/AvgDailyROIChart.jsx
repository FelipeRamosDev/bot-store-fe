import CutLineChartBase from '../base/cutLineChartBase/CutLineChartBase';

export default function AvgDailyROIChart({ results = [] }) {
   const dataSet = [];

   results.map(result => dataSet.push({ time: result.refDate, value: result.avgDailyROI }));
   return <CutLineChartBase className="chart" headerTitle="Average Daily ROI" dataSet={dataSet} />;
}
