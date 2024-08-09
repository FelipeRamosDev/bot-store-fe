'use client';
import { useContext } from 'react';
import TableBase from '@/components/tables/tableBase/TableBase';
import Price from '@/components/displays/price/Price';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import DBQueryContext from '@/contexts/DBQuery';

export default function PositionsTable({ positionsSet }) {
   const { query = [], isLoading } = useContext(DBQueryContext);
   const positions = positionsSet || query;

   return <TableBase
      pagination={{}}
      items={positions}
      loading={isLoading}
      headerConfigs={[
         {
            propKey: 'symbol',
            label: 'Symbol',
            format: (value, item) => {
               let colorNumber = 0;

               if (item.positionType === 'long') {
                  colorNumber = 1;
               } else if (item.positionType === 'short') {
                  colorNumber = -1;
               }

               return <>
                  <EdgeLight colorValue={colorNumber} label={item.positionType?.toUpperCase()} />

                  <p>{value}</p>
               </>;
            },
            style: {
               paddingLeft: '2rem',
               maxWidth: '10px',
            }
         },
         {
            propKey: 'type',
            label: 'Type',
            align: 'center',
            style: {
               maxWidth: '10px',
            },
            format: (value) => {
               return <StatusBadge type="account-type">{value}</StatusBadge>
            }
         },
         {
            propKey: 'pnl',
            label: 'PNL / ROI',
            align: 'center',
            style: {
               maxWidth: '10px',
            },
            format: (value, item) => {
               return <>
                  <Price amount={value} /> / <Price amount={item.roi} />;
               </>
            }
         },
         {
            label: 'Commission',
            propKey: 'commission',
            align: 'center',
            style: {
               maxWidth: '10px',
            },
            format: (value) => {
               return <Price amount={value} />
            }
         },
         {
            label: 'Notional',
            propKey: 'totalBalance',
            align: 'center',
            style: {
               maxWidth: '10px',
            },
            format: (value) => {
               return <Price amount={value} />
            }
         }
      ]}
   />
}
