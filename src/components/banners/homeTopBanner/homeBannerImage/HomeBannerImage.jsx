import RuleDummy from '@/components/tiles/bot/rule/RuleDummy';
import MasterTileDummy from '@/components/tiles/masterTileDefault/MasterTileDummy';
import BotValueSingleDummy from '@/components/tiles/bot/botValueSingle/BotValueSingleDummy';
import BTCSlotTilesImg from '@/components/content/home/img/BTCSlotTilesImg';

export default function HomeBannerImage({ className = '' }) {
   return (
      <div className={`home-banner-image ${className}`}>
         <BTCSlotTilesImg />
         <RuleDummy />
         <BotValueSingleDummy />
         <MasterTileDummy />
      </div>
   );
}
