import MasterTileImg from '@/components/content/home/img/MasterTileImg';
import RuleTileImg from '@/components/content/home/img/RuleTileImg';
import BTCSlotTilesImg from '@/components/content/home/img/BTCSlotTilesImg';
import BotValueSingleImg from '@/components/content/home/img/BotValueSingleImg';

export default function HomeBannerImage({ className = '' }) {
   return (
      <div className={`home-banner-image ${className}`}>
         <BTCSlotTilesImg />
         <RuleTileImg />
         <BotValueSingleImg />
         <MasterTileImg />
      </div>
   );
}
