import './MasterTileDefault.scss';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/common/card/Card';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import Price from '@/components/displays/price/Price';
import { formatMasterBadges } from '@/helpers/format';

const INITIAL_ELEVATION = 30;
const FINAL_ELEVATION = 40;

/**
 * A tile component that displays information about a master account.
 * 
 * This component renders a card with dynamic elevation and hover effects. It includes
 * the master account's name, badges, and performance metrics such as PNL and ROI.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} [props.className=''] - Optional additional CSS class for styling.
 * @param {Object} props.master - The master account data to be displayed.
 * @param {string} props.master.name - The name of the master account.
 * @param {Object} props.master.results - The performance results of the master account.
 * @param {number} props.master.results.dayPnl - The day PNL value.
 * @param {number} props.master.results.dayRoi - The day ROI value.
 * @param {number} props.master.results.monthPnl - The month PNL value.
 * @param {number} props.master.results.monthRoi - The month ROI value.
 * @param {number} props.master.pnl - The total PNL value.
 * @param {Object} props.master.badges - The badge configuration for the master account.
 * @param {string} props.master.badges.edgeColor - The color for the edge light.
 * @param {string} props.master.badges.badgeColor - The color for the status badge.
 * @param {string} props.master.badges.accountType - The account type for the status badge.
 * 
 * @returns {React.Element} The rendered tile component with master account information.
 */
export default function MastersTileDefault({ className = '', master, ...props }) {
   const router = useRouter();
   const [ elevation, setElevation ] = useState(INITIAL_ELEVATION);
   const lastMousePosition = useRef();
   const { edgeColor, badgeColor, accountType } = formatMasterBadges(master);

   if (!master) {
      return <></>;
   }

   const handleMouseOver = () => {
      if (!lastMousePosition.current) {
         lastMousePosition.current = true;
         setElevation(FINAL_ELEVATION);
      }
   }

   const handleMouseLeave = () => {
      if (lastMousePosition.current) {
         lastMousePosition.current = false;
         setElevation(INITIAL_ELEVATION);
      }
   }

   const handleMouseDown = () => {
      setElevation(INITIAL_ELEVATION);
   }

   return <Card
      className={`mastertile-default ${className}`}
      radius="s"
      elevation={elevation}
      onClick={() => router.push(`/dashboard/master-accounts/${master.index}`)}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      {...props}
   >
      <EdgeLight color={edgeColor} />

      <h3 className="title">{master.name}</h3>

      <div className="badges-line">
         <StatusBadge color={badgeColor} variant="light">{accountType}</StatusBadge>
      </div>

      <div className="tile-data">
         <div className="data">
            <p><b>Day PNL:</b> {master.results.dayPnl.toFixed(2)} / {master.results.dayRoi.toFixed(2)}%</p>
            <p><b>Month PNL:</b> {master.results.monthPnl.toFixed(2)} / {master.results.monthRoi.toFixed(2)}%</p>
         </div>

         <Price amount={master.pnl} />
      </div>
   </Card>;
}

