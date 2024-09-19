'use client';

import './CandlestickChartBase.scss';
import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { darkTheme } from '@/style/darkTheme';
import FitSpinner from '@/components/load/fitSpinner/FitSpinner';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { OpenInFull, CloseFullscreen } from '@mui/icons-material';

/**
 * A React component for rendering a candlestick chart using the lightweight-charts library.
 * It handles the initialization and updates of the chart based on the provided candlestick data.
 * 
 * @param {Object} props - Component props.
 * @param {Object[]} props.candles - An array of candlestick data to be displayed on the chart.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the chart container.
 * @param {Object} props.chartOptions - Options for configuring the chart layout and appearance.
 * @param {Object} props.styleOptions - Options for customizing the candlestick series style.
 * @param {Object} props.wrapperProps - Additional props to be applied to the chart wrapper div.
 * 
 * @returns {JSX.Element} The rendered candlestick chart and a loading spinner.
 */
export default function CandlestickChartBase({ candles, interval, position, className = '', chartOptions, styleOptions, wrapperProps }) {
   const [ expandState, setExpandState ] = useState(false);
   const chartSpot = useRef();
   const chart = useRef();
   const candlestickSeries = useRef();
   const stoplossLine = useRef();
   const takeprofitLine = useRef();

   if (Array.isArray(candles)) {
      candles = candles.sort((a, b) => a.time - b.time);
   }

   chartOptions = {
      autoSize: true,
      timeScale: {
         fixLeftEdge: true,
         tickMarkFormatter: (time) => {
            switch (interval) {
               case '1m':
               case '3m':
               case '5m':
               case '15m':
               case '30m':
               case '1h':
               case '2h':
               case '4h':
               case '6h':
               case '8h':
               case '12h': {
                  const timeString = new Date(time).toLocaleTimeString();
                  const [hour, minute] = timeString.split(':');
                  return `${hour}:${minute}`;
               }
               case '1d':
               case '1w':
               default: {
                  const timeString = new Date(time).toDateString();
                  const [week, month, day] = timeString.split(' ');
                  return `${day} ${month}`;
               }
            }
         }
      },
      localization: {
         timeFormatter: (time) => {
            return new Date(time).toLocaleString()
         }
      },
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

   function expandCollapse() {
      setExpandState(prev => !prev);
   }

   useEffect(() => {
      // Initializing the candlestick chart
      if (candles && !chart.current && chartSpot.current) {
         chart.current = createChart(chartSpot.current, chartOptions);

         candlestickSeries.current = chart.current.addCandlestickSeries(styleOptions);
         candlestickSeries.current.setData(candles);

         const currentCandle = candles.length ? candles[0] : null;
         const stringPrice = currentCandle ? currentCandle.open.toString() : null;
         const [int, dec] = stringPrice ? stringPrice.split('.') : [];
         let minMove;

         if (!dec) {
            minMove = 0;
         } else {
            minMove = 1 / Math.pow(10, dec.length);
         }

         if (typeof dec === 'string') {
            candlestickSeries.current.applyOptions({
               priceScaleId: 'right',
               priceFormat: { type: 'price', precision: dec.length, minMove }
            });
         }
      }

      else if (candles && candlestickSeries.current) {
         candlestickSeries.current.setData(candles);

         if (!stoplossLine.current && !takeprofitLine.current && position) {
            stoplossLine.current = candlestickSeries.current.createPriceLine({
               price: position.stopPrice,
               color: darkTheme.palette.error.main,
               lineWidth: 1,
               lineStyle: 3,
               axisLabelVisible: true,
               title: 'P/L',
            });

            if (position.gainPrice) {
               takeprofitLine.current = candlestickSeries.current.createPriceLine({
                  price: position.gainPrice,
                  color: darkTheme.palette.success.main,
                  lineWidth: 1,
                  lineStyle: 3,
                  axisLabelVisible: true,
                  title: 'T/P',
               });
            }
         }

         if (!position && (stoplossLine.current || takeprofitLine.current)) {
            if (stoplossLine.current) {
               candlestickSeries.current.removePriceLine(stoplossLine.current);
               stoplossLine.current = null;
            }

            if (takeprofitLine.current) {
               candlestickSeries.current.removePriceLine(takeprofitLine.current);
               takeprofitLine.current = null;
            }
         }
      }
   }, [candles, position, chartOptions, styleOptions]);

   return (<>
      <div className={`candlestick-chart ${candles ? 'hide' : ''} ${className}`}>
         <FitSpinner spinner={'Loading Candlesticks'} noBackground={true} />
      </div>

      <div ref={chartSpot} className={`candlestick-chart ${!candles ? 'hide' : ''} ${expandState ? 'expanded' : ''} ${className}`} {...wrapperProps}>
         <RoundIconButton
            className="expand-button"
            Icon={!expandState ? OpenInFull : CloseFullscreen}
            size="small"
            variant="contained"
            color="rubber"
            onClick={expandCollapse}
         />
      </div>
   </>);
}
