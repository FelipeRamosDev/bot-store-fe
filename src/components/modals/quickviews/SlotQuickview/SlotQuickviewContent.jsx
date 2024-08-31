import CryptoCandlestickChart from '@/components/charts/cryptoCandlestickChart/CryptoCandlestickChart';
import PositionTile from '@/components/tiles/positionTile/PositionTile';

export default function SlotQuickviewContent({ slot = {} }) {
   const symbol = slot.assets.length ? slot.assets[0] : '';
   const position = slot.trades.length ? slot.trades[0] : '';
   const isRunning = slot.status === 'running';

   return (
      <div className="chart-wrapper">
         <PositionTile position={position} slotIsRunning={isRunning} />
         <CryptoCandlestickChart symbol={symbol} interval={slot.interval} position={position} />
      </div>
   );
}
