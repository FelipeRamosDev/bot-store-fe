import CutLineChartBase from '../base/cutLineChartBase/CutLineChartBase';

export default function AccumROIChart({ results = [], period = '24h' }) {
   const dataSet = [];

   if (period === '24h') {
      results.map(result => dataSet.push({ time: result.refDate, value: result.accumRoi24 }));
      return <CutLineChartBase className="chart" headerTitle="Accumulated ROI (24h)" cutValue={1} dataSet={dataSet} />;
   }

   if (period === '30d') {
      results.map(result => dataSet.push({ time: result.refDate, value: result.accumRoiMonth }));
      return <CutLineChartBase className="chart" headerTitle="Accumulated ROI (30d)" cutValue={1} dataSet={dataSet} />;
   }
}
