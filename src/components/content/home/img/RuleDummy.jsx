export default function RuleDummy({ elevation = 50, fontSize = 23, indicatorName = 'Target Probability', ruleHeaderText = 'LESS THAN' }) {
   const isMovingAverage = indicatorName === 'Moving Average';

   const DefaultTable = () => {
      return (
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
      )
   }

   const AltTable1 = () => {
      return (
         <div className="contained-table ">
            <div className="table-row">
               <div className="table-column">
                  <label>Period</label>
               </div>
               <div className="table-column value">30</div>
            </div>
            <div className="table-row">
               <div className="table-column">
                  <label>Start At</label>
               </div>
               <div className="table-column value">1</div>
            </div>
            <div className="table-row">
               <div className="table-column">
                  <label>Mode</label>
               </div>
               <div className="table-column value">SIMPLE</div>
            </div>
            <div className="table-row">
               <div className="table-column">
                  <label>Cross Type</label>
               </div>
               <div className="table-column value">TRUE</div>
            </div>
         </div>
      )
   }

   return (
      <div
         className={`price-card watermark-price-card bottom bot-rule card p-xs r-s ${isMovingAverage ? 'wider' : ''}`}
         style={{
            boxShadow: `0 0 ${elevation}px #111111EE`,
            paddingTop: '3.4rem',
            fontSize: `${fontSize}px`,
            borderRadius: '10px'
         }}
         border-color="disabled"
         border-side="bottom"
      >
         <span className="watermark" style={{ fontSize: '23px' }} border-side="bottom">Evaluate</span>
         <div className="lock-layer"></div>
         <div className="rule-header" style={{ background: '#1c2122' }}>
            <span>{ruleHeaderText}</span>
         </div>
         <div className="bot-value function">
            <div className="content-header">
               <label className="value-name">{indicatorName}</label>
               <div className="toolbar"></div>
            </div>

            {isMovingAverage ? <AltTable1 /> : <DefaultTable />}
         </div>

         <div className="bot-divider">
            <span>{'>'}</span>
         </div>

         <div className={`bot-value ${isMovingAverage ? 'function' : 'primitive'}`}>
            {isMovingAverage ? <>
               <div className="content-header">
                  <label className="value-name">{indicatorName}</label>
                  <div className="toolbar"></div>
               </div>

               <AltTable1 /> 
            </> : <>
               <label className="value-name">Primitive</label>
               <span className="primitive-value number">70</span>
            </>}
         </div>
      </div>
   );
}
