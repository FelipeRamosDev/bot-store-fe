import './Home.scss';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import ContentSplit from '@/components/layout/contentSplit/ContentSplit';
import HomeTopBanner from '@/components/banners/homeTopBanner/HomeTopBanner';
import SlotTile from '@/components/tiles/slotTile/SlotTile';
import btcDummy from '@/components/content/home/btcDummy.json';

export default function HomeContent() {
   return (<>
      <HomeTopBanner />

      <div className="home-content">
         <section className="features">
            <div className="container">
               <h2 className="title">Follow the TRADES your bot is doing with EASE</h2>

               <ContentSplit className="content">
                  <div className="column image-spot">
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
                  </div>

                  <div className="column marketing-cta right">
                     <span className="message line1">Create slots to <span className="grad-txt">CONTROL BOTS</span></span>
                     <span className="message line2"> <span className="grad-txt">CHOOSE A BOT</span> to START</span>

                     <p className="description">
                        Control the bots you are using into slots to have better visibility of the current trade state, the stoploss and takeprofit.
                     </p>

                     <CTAButton className="d-large" size="medium">Let&apos;s Start</CTAButton>
                  </div>
               </ContentSplit>
            </div>
         </section>
      </div>
   </>);
}
