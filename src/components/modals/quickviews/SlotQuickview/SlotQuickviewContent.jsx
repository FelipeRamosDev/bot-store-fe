import CryptoCandlestickChart from '@/components/charts/cryptoCandlestickChart/CryptoCandlestickChart';
import MastersTileDefault from '@/components/tiles/masterTileDefault/MasterTileDefault';
import PositionTile from '@/components/tiles/positionTile/PositionTile';

/**
 * SlotQuickviewContent Component
 * 
 * This component renders the main content for a slot's quick view, including a candlestick chart for the slot's primary asset 
 * and a tile displaying details of the first position in the slot's trades. It displays information about the current trading 
 * position and the associated asset.
 * 
 * @param {Object} props - The component props.
 * @param {Object} [props.slot={}] - An object representing the slot data, which includes assets, trades, status, and interval.
 * @param {Object} [props.master] - An object representing the master data..
 * 
 * @returns {JSX.Element} The rendered SlotQuickviewContent component.
 */
export default function SlotQuickviewContent({ master, slot = {} }) {
   const symbol = slot.assets.length ? slot.assets[0] : '';
   const position = slot.trades.length ? slot.trades[0] : '';
   const isRunning = slot.status === 'running';

   return (
      <div className="chart-wrapper">
         <MastersTileDefault master={master} minified={true} />
         <CryptoCandlestickChart symbol={symbol} interval={slot.interval} position={position} />
         {position && <PositionTile position={position} slotIsRunning={isRunning} />}
      </div>
   );
}
