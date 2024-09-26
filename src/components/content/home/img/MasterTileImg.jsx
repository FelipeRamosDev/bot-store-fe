import MasterTile from '@/components/tiles/masterTileDefault/MasterTileDefault';
import masterDummy from './masterDummy.json';

export default function MasterTileImg() {
   return <MasterTile elevation={70} demoMode={true} master={masterDummy} />;
}

