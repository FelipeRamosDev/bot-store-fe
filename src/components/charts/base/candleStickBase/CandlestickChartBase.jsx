'use client';

import './CandlestickChartBase.scss';
import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { darkTheme } from '@/style/darkTheme';
import FitSpinner from '@/components/load/fitSpinner/FitSpinner';

/**
 * A React component for rendering a candlestick chart using the lightweight-charts library.
 * It handles the initialization and updates of the chart based on the provided candlestick data.
 * 
 * @param {Object[]} candles - An array of candlestick data to be displayed on the chart.
 * @param {string} [className=''] - Additional CSS classes to apply to the chart container.
 * @param {Object} chartOptions - Options for configuring the chart layout and appearance.
 * @param {Object} styleOptions - Options for customizing the candlestick series style.
 * @param {Object} wrapperProps - Additional props to be applied to the chart wrapper div.
 * 
 * @returns {JSX.Element} The rendered candlestick chart and a loading spinner.
 */
export default function CandlestickChartBase({ candles, className = '', chartOptions, styleOptions, wrapperProps }) {
   const chartSpot = useRef();
   const chart = useRef();
   const candlestickSeries = useRef();

   if (Array.isArray(candles)) {
      candles = candles.sort((a, b) => a.time - b.time);
   }

   chartOptions = {
      autoSize: true,
      layout: {
         textColor: darkTheme.palette.text.darken,
         background: {
            type: 'solid',
            color: 'transparent'
         } 
      },
      grid: {
         vertLines: {
            style: 3,
            color: darkTheme.palette.grey.softMark
         },
         horzLines: {
            color: darkTheme.palette.grey.softMark
         }
      },
      ...chartOptions
   };

   styleOptions = {
      upColor: darkTheme.palette.success.main,
      downColor: darkTheme.palette.error.main,
      borderVisible: false,
      wickUpColor: darkTheme.palette.success.main,
      wickDownColor: darkTheme.palette.error.main,
      ...styleOptions
   };

   useEffect(() => {
      // Initializing the candlestick chart
      if (candles && !chart.current && chartSpot.current) {
         chart.current = createChart(chartSpot.current, chartOptions);
         
         candlestickSeries.current = chart.current.addCandlestickSeries(styleOptions);
         candlestickSeries.current.setData(candles);
      }

      else if (candles && candlestickSeries.current) {
         candlestickSeries.current.setData(candles);
      }
   }, [candles]);

   return (<>
      <div className={`candlestick-chart ${candles ? 'hide' : ''} ${className}`}>
         <FitSpinner spinner={'Loading Candlesticks'} noBackground={true} />
      </div>

      <div ref={chartSpot} className={`candlestick-chart ${!candles ? 'hide' : ''} ${className}`} {...wrapperProps}></div>
   </>);
}
