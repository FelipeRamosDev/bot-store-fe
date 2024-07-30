'use client';
import Price from '@/components/displays/price/Price';
import TableBase from '@/components/tables/tableBase/TableBase';

export default function RecentBotsTable({ bots = [] }) {
   return <div className="activities-table">
      <h3 className="section-title">Recent Bots</h3>

      <TableBase
         items={bots}
         pagination={{}}
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
