'use client';
import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { darkTheme } from '@/style/darkTheme';
import { parseClassName } from '@/helpers/parser';
import defaultChartOptions from '../defaultChartOptions';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import Card from '@/components/common/card/Card';
import SsidChartIcon from '@mui/icons-material/SsidChart';

export default function CutLineChartBase({ className, headerTitle, HeaderToolbar, chartOptions, cutValue = 0, dataSet = [] }) {
   const chartSpot = useRef();
   const chart = useRef();
   const cutLineChart = useRef();

   const topLineColor = darkTheme.palette.success.main;
   const topFillColor1 = topLineColor + '47';
   const topFillColor2 = topLineColor + '0d';
   const bottomLineColor =  darkTheme.palette.error.main;
   const bottomFillColor1 = bottomLineColor + '0d';
   const bottomFillColor2 = bottomLineColor + '47';

   className = parseClassName(className, [ 'cutline-chart-base' ]);
   chartOptions = { ...defaultChartOptions, ...chartOptions };

   dataSet = dataSet.map(data => {
      data.time = new Date(data.time).getTime();
      return data;
   });

   useEffect(() => {
      if (!chart.current && chartSpot.current) {
         chart.current = createChart(chartSpot.current, chartOptions);

         cutLineChart.current = chart.current.addBaselineSeries({
            baseValue: { type: 'price', price: cutValue },
            topLineColor,
            topFillColor1,
            topFillColor2,
            bottomLineColor,
            bottomFillColor1,
            bottomFillColor2
         });

         cutLineChart.current.setData(dataSet);
         chart.current.timeScale().fitContent();
      } else {
         cutLineChart.current.setData(dataSet);
         chart.current.timeScale().fitContent();
      }
   }, [ chartOptions, cutValue, topLineColor, topFillColor1, topFillColor2, bottomLineColor, bottomFillColor1, bottomFillColor2, dataSet ]);

   return (
      <Card className={className} padding="s" elevation={35}>
         {headerTitle && <ContentHeader Toolbar={HeaderToolbar}>
            <SsidChartIcon />
            <h3 className="header-title">{headerTitle}</h3>
         </ContentHeader>}

         <div ref={chartSpot} className="chart-spot"></div>
      </Card>
   );
}

