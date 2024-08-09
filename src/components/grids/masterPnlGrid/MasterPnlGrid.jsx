import PNLTile from '@/components/tiles/pnlTile/PNLTile';

export default function MasterPnlGrid({ master = {}, className = '' }) {
   return (
      <div className={`pnl-grid ${className}`}>
         <PNLTile
            label="Month PNL"
            borderSide="left"
            size="l"
            value={master.results?.monthPnl}
         />

         <PNLTile
            type="percent"
            label="Month ROI"
            borderSide="left"
            size="l"
            value={master.results?.monthPnl}
         />

         <PNLTile
            label="Day PNL"
            borderSide="left"
            size="l"
            value={master.results?.dayPnl}
         />

         <PNLTile
            type="percent"
            label="Day ROI"
            borderSide="left"
            size="l"
            value={master.results?.dayPnl}
         />
      </div>
   );
}
