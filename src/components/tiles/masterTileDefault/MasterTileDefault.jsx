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
         <StatusBadge color={badgeColor}>{accountType}</StatusBadge>
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

