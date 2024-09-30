import CandlestickChartBase from "@/components/charts/base/candleStickBase/CandlestickChartBase";
import btcDummy from './btcDummy.json';

export default function BTCSlotTilesImg() {
   return (
      <div className="slot-tile  slot-b card p-s r-m" style={{ boxShadow: '0 0 60px #111111DD' }}>
         <div className="lock-layer"></div>
         <div className="tile-header">
            <div className="text-wrap">
               <span className="title link">Bitcoin</span>
               <span className=" status-badge" color="success" variant="">RUNNING</span>
               <a className="bot-name" href="#">Mr.Kaioh II</a>
            </div>
         </div>
         
         <div className="slot-data">
            <div className="column">
               <div className="item">
                  <label>COD:</label>
                  <span>BA43245</span>
               </div>
               <div className="item">
                  <label>Interval:</label>
                  <span>15m</span>
               </div>
               <div className="item">
                  <label>Symbol:</label>
                  <span>BTCUSDT</span>
               </div>
               <div className="item">
                  <label>Realized:</label>
                  <span color="disabled" className="price-display ">$7,450.00</span>
               </div>
            </div>
            <div className="column">
               <span color="success" display-size="xl" className="price-display ">$8,566.00</span>
            </div>
         </div>

         <div className="candlestick-chart">
            <CandlestickChartBase candles={btcDummy} />
         </div>
      </div>
   );
}
