import PNLTile from '@/components/tiles/pnlTile/PNLTile';

/**
 * MasterPnlGrid component displays a grid of PNL and ROI tiles for a given master entity.
 *
 * This component is designed to show financial performance metrics such as monthly and daily PNL (Profit and Loss) 
 * and ROI (Return on Investment) in a grid layout. Each tile displays a specific metric and optionally formats the 
 * value as a percentage.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} [props.master={}] - The master entity containing financial results.
 * @param {string} [props.className=''] - Optional additional class name to apply to the grid container.
 *
 * @example
 * const master = {
 *   results: {
 *     monthPnl: 1234.56,
 *     monthRoi: 7.89,
 *     dayPnl: 234.56,
 *     dayRoi: 1.23
 *   }
 * };
 *
 * return <MasterPnlGrid master={master} />;
 *
 * @returns {JSX.Element} A grid layout displaying various PNL and ROI metrics.
 */
export default function MasterPnlGrid({ master = {}, className = '' }) {
   const commonProps = {
      size: 'l'
   };

   return (
      <div className={`master-pnl-grid pnl-grid ${className}`}>
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
            value={master.results?.monthRoi}
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
            value={master.results?.dayRoi}
         />
      </div>
   );
}
