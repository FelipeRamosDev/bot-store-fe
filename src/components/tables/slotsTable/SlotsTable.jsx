'use client';
import { useContext } from 'react';
import Price from '@/components/displays/price/Price';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import TableBase from '@/components/tables/tableBase/TableBase';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import DBQueryContext from '@/contexts/DBQuery';

export default function SlotsTable() {
   const { query = [], isLoading } = useContext(DBQueryContext);
   const slots = query;

   return <TableBase
      pagination={{}}
      items={slots}
      loading={isLoading}
      headerConfigs={[
         {
            label: 'Symbol / Master', format: (__, item) => {
               return (<>
                  <EdgeLight colorValue={item.pnl} />

                  <p>{item.name}</p>
                  <small>{item.master?.name}</small>
               </>);
            }
         },
         {
            label: 'PNL / ROI', align: 'right', format: (__, item) => {
               return <Price amount={item.pnl} />
            }
         },
         {
            propKey: 'type', label: 'Type', align: 'right', format: (value) => {
               return <StatusBadge type="account-type" variant="light">{value}</StatusBadge>
            }
         }
      ]}
   />
}

