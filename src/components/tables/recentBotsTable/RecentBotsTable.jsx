'use client';

import { useContext } from 'react';
import Price from '@/components/displays/price/Price';
import TableBase from '@/components/tables/tableBase/TableBase';
import DBQueryContext from '@/contexts/DBQuery';

/**
 * A table component displaying a list of recent bots along with their scores.
 * The component fetches bot data from a context and displays it in a table format.
 *
 * @returns {React.Element} The rendered table of recent bots.
 */
export default function RecentBotsTable() {
   const { query = [], isLoading } = useContext(DBQueryContext);
   const bots = query;

   return <div className="activities-table">
      <h3 className="section-title">Recent Bots</h3>

      <TableBase
         items={bots}
         pagination={{}}
         loading={isLoading}
         headerConfigs={[
            {
               label: 'Bot',
               propKey: 'name',
               style: { width: '10rem' },
               format: (value) => {
                  return value;
               }
            },
            {
               label: 'Summary',
               propKey: 'description'
            },
            {
               label: 'SCORE',
               propKey: 'score',
               align: 'right',
               format: (value) => {
                  return <Price amount={value} noSymbol={true} fractional={0} />
               }
            }
         ]}
      />
   </div>
}
