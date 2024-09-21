import CandlestickChartBase from '@/components/charts/base/candleStickBase/CandlestickChartBase';
import { useState, useRef, useEffect } from 'react';
import BinanceSync from 'binance-sync';

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
