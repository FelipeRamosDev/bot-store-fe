'use client';
import { useContext } from 'react';
import Price from '@/components/displays/price/Price';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import TableBase from '@/components/tables/tableBase/TableBase';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import DBQueryContext from '@/contexts/DBQuery';
import Percent from '@/components/displays/percent/Percent';
import { useRouter } from 'next/navigation';

export default function MastersTable({ include, exclude }) {
   const { query = [], isLoading, limit, reloadLimit, goPage } = useContext(DBQueryContext);
   const router = useRouter();
   let parsedLimit = limit;

   const titleStyle = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' };
   const PERCENT_OPTIONS = {
      prefix: '(',
      posfix: ')',
      fontSize: '0.8rem'
   }

   if (limit) {
      parsedLimit = limit -1;
   }

   return (
      <TableBase
         pagination={{}}
         items={query}
         loading={isLoading}
         include={include}
         exclude={exclude}
         onClickRow={(doc) => {
            if (doc?.index) {
               router.push(`/dashboard/master-accounts/${doc.index}`);
            }
         }}
         usePagination={true}
         itemsPerPage={parsedLimit}
         onPageNav={goPage}
         onRowsPerPageChange={reloadLimit}
         headerConfigs={[
            {
               propKey: 'symbol',
               label: 'Symbol / Master',
               style: {
                  paddingLeft: '2rem',
                  minWidth: '130px',
               },
               format: (__, item) => {
                  return (<>
                     <EdgeLight colorValue={item.pnl} />

                     <p style={titleStyle}>
                        {item.name}
                        
                     </p>
                  </>);
               }
            },
            {
               propKey: 'type',
               label: 'Account Type',
               align: 'center',
               format: (value) => {
                  return <StatusBadge type="account-type" variant="light">{value}</StatusBadge>
               }
            },
            {
               propKey: 'pnl',
               label: 'Accumulated',
               align: 'center',
               format: (__, item) => {
                  return <Price amount={item.pnl} size="m" />
               }
            },
            {
               label: 'Day Realized',
               align: 'center',
               format: (__, item) => {
                  return (<>
                     <Price amount={item.results.dayPnl} /> <Percent {...PERCENT_OPTIONS} value={item.results.dayRoi} size="s" />
                  </>);
               }
            },
            {
               label: 'Month Realized',
               align: 'center',
               format: (__, item) => {
                  return (<>
                     <Price amount={item.results.monthPnl} /> <Percent {...PERCENT_OPTIONS} value={item.results.monthRoi} size="s" />
                  </>);
               }
            },
            {
               label: 'Available Balance',
               align: 'center',
               format: (__, item) => {
                  return <Price amount={item.futuresWallet?.availableBalance} noColor />
               }
            },
            {
               label: 'Total Realized',
               align: 'center',
               format: (__, item) => {
                  return <Price amount={item.futuresWallet?.totalRealizedPnl} />
               }
            }
         ]}
      />
   );
}

