export default function BotValueSingleDummy() {
   return (
      <div
         className="price-card watermark-price-card bottom bot-value-single card p-xs r-s"
         style={{ boxShadow: '0 0 50px #111111EE', borderRadius: '10px' }}
         border-color="disabled"
         border-side="bottom"
      >
         <span className="watermark" border-side="bottom">Bot Value</span>

         <div className="bot-value function single ">
            <div className="content-header ">
               <label className="value-name">Period Top and Bottom</label>
               <div className="toolbar"></div>
            </div>
            <div className="contained-table ">
               <div className="table-row">
                  <div className="table-column">
                     <label>Candles Period</label>
                  </div>
                  <div className="table-column value">5</div>
               </div>
               <div className="table-row">
                  <div className="table-column">
                     <label>Option</label>
                  </div>
                  <div className="table-column value">high</div>
               </div><div className="table-row">
                  <div className="table-column">
                     <label>Start at Candle</label>
                  </div>
                  <div className="table-column value">1</div>
               </div>
            </div>
         </div>
      </div>
   );
}
