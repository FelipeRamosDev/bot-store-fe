export default function RuleDummy({ elevation = 50, fontSize = 23 }) {
   return (
      <div
         className="price-card watermark-price-card bottom bot-rule card p-xs r-s"
         style={{
            boxShadow: `0 0 ${elevation}px #111111DD`,
            paddingTop: '3.4rem',
            fontSize: `${fontSize}px`
         }}
         border-color="disabled"
         border-side="bottom"
      >
         <span className="watermark" style={{ fontSize: '23px' }} border-side="bottom">Evaluate</span>
         <div className="lock-layer"></div>
         <div className="rule-header">
            <span>LESS THAN</span>
         </div>
         <div className="bot-value function">
            <div className="content-header ">
               <label className="value-name">Target Probability</label>
               <div className="toolbar"></div>
            </div>
            <div className="contained-table ">
               <div className="table-row">
                  <div className="table-column">
                     <label>Period</label>
                  </div>
                  <div className="table-column value">30</div>
               </div>
               <div className="table-row">
                  <div className="table-column">
                     <label>Direction</label>
                  </div>
                  <div className="table-column value">DOWN</div>
               </div>
               <div className="table-row">
                  <div className="table-column">
                     <label>Mode</label>
                  </div>
                  <div className="table-column value">STRICT</div>
               </div>
               <div className="table-row">
                  <div className="table-column">
                     <label>Custom Range</label>
                  </div>
                  <div className="table-column value">0.5</div>
               </div>
            </div>
         </div>

         <div className="bot-divider">
            <span>{'>'}</span>
         </div>

         <div className="bot-value primitive ">
            <label className="value-name">Primitive</label>
            <span className="primitive-value number">70</span>
         </div>
      </div>
   );
}
