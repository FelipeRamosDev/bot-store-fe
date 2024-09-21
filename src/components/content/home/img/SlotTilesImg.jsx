import SlotTile from '@/components/tiles/slotTile/SlotTile';
import btcDummy from '@/components/content/home/img/btcDummy.json';

export default function SlotTilesImg() {
   return (<>
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

      <SlotTile
         dummyCandles={btcDummy}
         className="slot-b"
         demoMode={true}
         chartsDisplay={true}
         elevation={80}
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
   </>);
}
