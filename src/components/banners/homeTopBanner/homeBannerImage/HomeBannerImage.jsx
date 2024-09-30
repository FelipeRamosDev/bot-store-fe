import RuleDummy from '@/components/tiles/bot/rule/RuleDummy';
import MasterTileDummy from '@/components/tiles/masterTileDefault/MasterTileDummy';
import BotValueSingleDummy from '@/components/tiles/bot/botValueSingle/BotValueSingleDummy';

export default function HomeBannerImage({ className = '', chartCanvas }) {
   return (
      <div className={`home-banner-image ${className}`}>
         {chartCanvas}
         <RuleDummy />
         <BotValueSingleDummy />
         <MasterTileDummy />
      </div>
   );
}
