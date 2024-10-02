export default function MasterTileDummy() {
   return (
      <div className="mastertile-default card r-s" style={{ boxShadow: '0 0 30px #111111DD' }}>
         <div className="lock-layer"></div>
         <span className="edge-light " color="success" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '0.5rem' }}></span>

         <h3 className="title">Main Wallet<span className=" status-badge" color="success" variant="light">LIVE</span></h3>
         <div className="tile-data">
            <div className="data">
               <p><b>Day PNL:</b>486.00 / 12.10%</p>
               <p><b>Month PNL:</b> 4500.00 / 32.00%</p>
            </div>
            <span color="success" style={{ fontSize: '18px' }} className="price-display ">$5,466.78</span>
         </div>
      </div>
   );
}
