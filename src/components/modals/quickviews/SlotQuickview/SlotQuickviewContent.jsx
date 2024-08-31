import CryptoCandlestickChart from "@/components/charts/cryptoCandlestickChart/CryptoCandlestickChart";

export default function SlotQuickviewContent({ slot = {} }) {
   const symbol = slot.assets.length ? slot.assets[0] : '';
   const position = slot.trades.length ? slot.trades[0] : '';

   return <>
      <div className="chart-wrapper">
         <CryptoCandlestickChart symbol={symbol} interval={slot.interval} position={position} />
      </div>
   </>;
}
