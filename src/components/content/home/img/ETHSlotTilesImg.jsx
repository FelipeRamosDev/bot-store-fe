import SlotTile from '@/components/tiles/slotTile/SlotTile';
import btcDummy from '@/components/content/home/img/btcDummy.json';

export default function ETHSlotTilesImg() {
   return (
      <SlotTile
         dummyCandles={btcDummy}
         className="slot-a"
         demoMode={true}
         chartsDisplay={true}
         elevation={80}
         padding="s"
         slot={{
            cod: 'BA43245',
            name: 'Ethereum',
            bot: { name: 'Mr.Kaioh I', index: 1 },
            assets: ['ETHUSDT'],
            interval: '3m',
            status: 'running',
            pnl: 1123.45,
            totalRealizedPnl: 946,
            trades: [{ stopPrice: 62500, gainPrice: 64500 }]
         }}
      />
   );
}
