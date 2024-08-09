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
            style: {
               paddingLeft: '2rem',
               maxWidth: '10px',
            },
            format: (value, item) => {
               return <>
                  <EdgeLight colorValue={item.pnl} />

                  <p>{value}</p>
                  <StatusBadge type="account-type">{item.type}</StatusBadge>
               </>;
            }
         },
         {
            label: 'Open / Close',
            propKey: 'openTime',
            align: 'center',
            style: {
               maxWidth: '10px',
            },
            format: (value, item) => {
               return <>
                  <p>{new Date(value).toLocaleString()}</p>
                  <p>{new Date(item.closeTime).toLocaleString()}</p>
               </>;
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
         },
         {
            label: 'Init. Margin',
            propKey: 'initialMargin',
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
