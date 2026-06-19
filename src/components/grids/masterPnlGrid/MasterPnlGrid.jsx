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
      size: 'l',
      borderSide: 'left'
   };

   return (
      <div className={`master-pnl-grid pnl-grid ${className}`}>
         <PNLTile
            {...commonProps}
            label="Month PNL"
            value={master.results?.monthPnl}
         />

         <PNLTile
            type="percent"
            {...commonProps}
            label="Month ROI"
            value={master.results?.monthRoi}
         />

         <PNLTile
            {...commonProps}
            label="Day PNL"
            value={master.results?.dayPnl}
         />

         <PNLTile
            type="percent"
            {...commonProps}
            label="Day ROI"
            value={master.results?.dayRoi}
         />
      </div>
   );
}
