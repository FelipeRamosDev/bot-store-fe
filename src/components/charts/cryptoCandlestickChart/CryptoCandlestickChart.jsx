import CandlestickChartBase from '@/components/charts/base/candleStickBase/CandlestickChartBase';
import { useState, useRef, useEffect } from 'react';
import BinanceSync from 'binance-sync';

/**
 * A React component that renders a cryptocurrency candlestick chart using live data from the Binance API.
 *
 * @param {string} symbol - The trading pair symbol (e.g., 'BTCUSDT') to display on the chart.
 * @param {string} interval - The time interval for the candlesticks (e.g., '1m', '5m', '1h').
 * @param {number} [limit=1500] - The number of candlesticks to retrieve for the chart. Defaults to 1500.
 * @param {number} [startAt] - A timestamp indicating the starting point for historical data retrieval.
 * @param {Array} dummyCandles - Initial candle data passed as a placeholder before the stream starts.
 * @param {object} position - Optional position settings for the chart display.
 * @returns {JSX.Element} The rendered candlestick chart component.
 */
export default function CryptoCandlestickChart({ symbol, interval, limit = 1500, startAt, dummyCandles, position }) {
   const [ candles, setCandles ] = useState(dummyCandles);
   const binance = useRef();
   const stream = useRef();

   if (!symbol || !interval) {
      throw new Error('The params "symbol" and "interval" are required!');
   }

   if (!binance.current) {
      binance.current = new BinanceSync();
   }

   useEffect(() => {
      if (stream.current || dummyCandles) return;

      stream.current = binance.current.streams.candlestickChart(symbol, interval, {
         limit,
         startAt,
         callbacks: {
            open() {
               console.log(`[Binance-Sync] Chart stream OPENED to "${symbol}" with "${interval}" interval!`);
            },
            close() {
               console.log(`[Binance-Sync] Chart stream CLOSED to "${symbol}" with "${interval}" interval!`);
            },
            data(data) {
               setCandles(data.candles);
            },
            error(err) {
               throw err;
            }
         }
      })
   }, [ interval, limit, symbol, startAt, dummyCandles ]);

   return (
      <CandlestickChartBase candles={candles} symbol={symbol} interval={interval} position={position} />
   );
}
