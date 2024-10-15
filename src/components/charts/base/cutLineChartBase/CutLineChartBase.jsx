'use client';
import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { darkTheme } from '@/style/darkTheme';
import { parseClassName } from '@/helpers/parser';
import defaultChartOptions from '../defaultChartOptions';

export default function CutLineChartBase({ className, chartOptions, cutValue = 0, dataSet = [] }) {
   const chartSpot = useRef();
   const chart = useRef();
   const cutLineChart = useRef();

   const topLineColor = darkTheme.palette.success.main;
   const topFillColor1 = topLineColor + '47';
   const topFillColor2 = topLineColor + '0d';
   const bottomLineColor =  darkTheme.palette.error.main;
   const bottomFillColor1 = bottomLineColor + '47';
   const bottomFillColor2 = bottomLineColor + '0d';

   className = parseClassName(className, [ 'cutline-chart-base' ]);
   chartOptions = { ...defaultChartOptions, ...chartOptions };

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
      }
   }, [ chartOptions, cutValue, topLineColor, topFillColor1, topFillColor2, bottomLineColor, bottomFillColor1, bottomFillColor2, dataSet ]);

   return (
      <div ref={chartSpot} className={className}></div>
   );
}

