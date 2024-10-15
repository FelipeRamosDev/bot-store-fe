'use client';
import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { darkTheme } from '@/style/darkTheme';
import { parseClassName } from '@/helpers/parser';
import defaultChartOptions from '../defaultChartOptions';
import LineChartConfig from '@/models/LineChartConfig';

/**
 * A React component that renders a line chart using the Lightweight Charts library. 
 * It supports both single line and multiple line series and allows custom chart 
 * options and colors.
 * 
 * @param {Object} props - The line chart props.
 * @param {string} props.className - Additional class names for the chart container.
 * @param {object} props.chartOptions - Custom chart options to merge with default options.
 * @param {array} props.singleLine - Data array for a single line chart series.
 * @param {string} props.singleLineColor - Color for the single line chart (optional).
 * @param {[]LineChartConfig} props.multiline - Array of line data for multi-line chart series (optional).
 * 
 * @returns {JSX.Element} - A div element that holds the chart.
 */
export default function LineChartBase({ className, chartOptions, singleLine = [], singleLineColor, multiline }) {
   const chartSpot = useRef();
   const chart = useRef();
   const lineChart = useRef();
   const multiLineChart = useRef();
   
   singleLineColor = singleLineColor || darkTheme.palette['primary-light'].main;
   className = parseClassName(className, [ 'line-chart-base' ]);
   chartOptions = { ...defaultChartOptions, ...chartOptions };

   useEffect(() => {
      if (!chart.current && chartSpot.current) {
         chart.current = createChart(chartSpot.current, chartOptions);

         if (!multiline) {
            lineChart.current = chart.current.addLineSeries({ color: singleLineColor });
            lineChart.current.setData(singleLine);
         }
         
         else if (Array.isArray(multiline)) {
            multiLineChart.current = new Map();

            multiline.map(lineData => {
               const line = new LineChartConfig(lineData);
               const initChart = chart.current.addLineSeries({ color: line.lineColor || singleLineColor });

               initChart.setData(line.values);
               line.setChart(initChart);

               multiLineChart.current.set(line.id, line);
            });
         }

         chart.current.timeScale().fitContent();
      }
   }, [ chartOptions, singleLine, singleLineColor ]);

   return (
      <div ref={chartSpot} className={className}></div>
   );
}
