import './MastersGrid.scss';
import MasterTileDefault from '@/components/tiles/masterTileDefault/MasterTileDefault';

export default function MastersGrid({ masterList = [] }) {
   return <div className="masters-grid">
      {masterList.map(master => <MasterTileDefault key={Math.random()} master={master} className="tile" />)}
   </div>
}
