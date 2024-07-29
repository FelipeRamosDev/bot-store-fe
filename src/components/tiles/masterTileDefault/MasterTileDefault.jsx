import './MasterTileDefault.scss';
import Card from '@/components/common/card/Card';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import Price from '@/components/displays/price/Price';

export default function MastersTileDefault({ className = '', master, ...props }) {
   let edgeColor = 'disabled';
   let badgeColor = 'disabled';
   let accountType = '---';

   if (!master) {
      return <></>;
   }

   if (master.pnl === 0) {
      edgeColor = 'disabled';
   } else if (master.pnl > 0) {
      edgeColor = 'success';
   } else if (master.pnl < 0) {
      edgeColor = 'error';
   }

   if (master.type === 'master-live') {
      accountType = 'LIVE';
      badgeColor = 'success';
   } else if(master.type === 'master-demo') {
      accountType = 'DEMO';
      badgeColor = 'warn';
   }

   return <Card
      className={`mastertile-default ${className}`}
      radius="s"
      elevation={30}
      {...props}
   >
      <EdgeLight color={edgeColor} />

      <h3 className="title">Master's Name</h3>

      <div className="badges-line">
         <StatusBadge color={badgeColor}>{accountType}</StatusBadge>
      </div>

      <div className="tile-data">
         <div className="data">
            <p><b>Label 1:</b> Value</p>
            <p><b>Label 2:</b> Value</p>
         </div>

         <Price amount={master.pnl} />
      </div>
   </Card>;
}

