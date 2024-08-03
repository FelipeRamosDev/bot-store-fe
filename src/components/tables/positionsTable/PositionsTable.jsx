'use client';
import { useContext } from 'react';
import TableBase from '@/components/tables/tableBase/TableBase';
import Price from '@/components/displays/price/Price';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import DBQueryContext from '@/contexts/DBQuery';

export default function PositionsTable() {
   const { query = [], isLoading } = useContext(DBQueryContext);
   const positions = query;

   return <TableBase
      pagination={{}}
      items={positions}
      loading={isLoading}
      headerConfigs={[
         {
            propKey: 'symbol', label: 'Symbol', format: (value, item) => {
               let colorNumber = 0;

               if (item.positionType === 'long') {
                  colorNumber = 1;
               } else if (item.positionType === 'short') {
                  colorNumber = -1;
               }

               return <>
                  <EdgeLight colorValue={colorNumber} label={item.positionType?.toUpperCase()} />

                  {value}
               </>;
            },
            style: {
               paddingLeft: '2rem'
            }
         },
         {
            label: 'PNL / ROI', align: 'right', format: (__, item) => {
               return <Price amount={item.pnl} />
            }
         },
         {
            propKey: 'type', label: 'Type', align: 'right', format: (value) => {
               return <StatusBadge type="account-type">{value}</StatusBadge>
            }
         }
      ]}
   />
}
