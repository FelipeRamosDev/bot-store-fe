import SlotTile from '@/components/tiles/slotTile/SlotTile';
import btcDummy from '@/components/content/home/img/btcDummy.json';

export default function BTCSlotTilesImg() {
   return (
      <SlotTile
         dummyCandles={btcDummy}
         className="slot-b"
         demoMode={true}
         chartsDisplay={true}
         elevation={60}
         padding="s"
         slot={{
            cod: 'BA43245',
            name: 'Bitcoin',
            bot: { name: 'Mr.Kaioh II', index: 2 },
            assets: ['BTCUSDT'],
            interval: '15m',
            status: 'running',
            pnl: 8566,
            totalRealizedPnl: 7450,
            trades: [{ stopPrice: 62500, gainPrice: 64500 }]
         }}
      />
   );
}
