'use client';
import './PositionsTable.scss';
import { useContext } from 'react';
import TableBase from '@/components/tables/tableBase/TableBase';
import Price from '@/components/displays/price/Price';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import DBQueryContext from '@/contexts/DBQuery';
import Percent from '@/components/displays/percent/Percent';
import PrettyDate from '@/components/displays/prettyDate/PrettyDate';

/**
 * A table component that displays trading positions with various details.
 *
 * @param {Object} props - The properties for the PositionsTable component.
 * @param {Array} props.positionsSet - An optional array of positions to display. If not provided, data from the context will be used.
 * @param {Array} [props.include] - Optional array of property keys to include in the table.
 * @param {Array} [props.exclude] - Optional array of property keys to exclude from the table.
 *
 * @returns {React.Element} The rendered PositionsTable component.
 */
export default function PositionsTable({ positionsSet, include, exclude }) {
   const { query = [], isLoading } = useContext(DBQueryContext);
   const positions = positionsSet || query;

   return <TableBase
      className="positions-table"
      pagination={{}}
      items={positions}
      loading={isLoading}
      include={include}
      exclude={exclude}
      headerConfigs={[
         {
            propKey: 'symbol',
            label: 'Symbol',
            style: {
               paddingLeft: '2rem',
               minWidth: '130px',
            },
            format: (value, item) => {
               return <>
                  <EdgeLight colorValue={item.pnl} />

                  <small>{item.botSlot?.name}</small>
                  <p>{value} <StatusBadge variant="light" type="position-side">{item.positionType}</StatusBadge></p>
               </>;
            }
         },
         {
            label: 'Open / Close',
            propKey: 'openTime',
            align: 'center',
            style: {
               minWidth: '150px',
            },
            format: (value, item) => {
               return <>
                  <p><PrettyDate hideYear={true} divisor=" " time={value} /></p>
                  <p><PrettyDate hideYear={true} divisor=" " time={item.closeTime} /></p>
               </>;
            }
         },
         {
            label: 'Type',
            propKey: 'type',
            align: 'center',
            style: {
               minWidth: '40px',
            },
            format: (value) => {
               return <StatusBadge variant="light" type="account-type">{value}</StatusBadge>;
            }
         },
         {
            label: 'Leverage',
            propKey: 'usedLeverage',
            align: 'center',
            style: {
               minWidth: '70px',
            },
            format: (value) => {
               return <b>{value}x</b>
            }
         },
         {
            label: 'Quantity',
            propKey: 'quantity',
            align: 'center',
            style: {
               minWidth: '70px',
            },
            format: (value) => {
               return <b>{value}</b>
            }
         },
         {
            propKey: 'pnl',
            label: 'PNL / ROI',
            align: 'center',
            style: {
               minWidth: '140px',
            },
            format: (value, item) => {
               return <>
                  <Price amount={value} size="s" /> <Percent value={item.roi} />
               </>
            }
         },
         {
            propKey: 'realizedProfit',
            label: 'Realized PNL',
            align: 'center',
            style: {
               minWidth: '140px',
            },
            format: (value, item) => {
               return <Price amount={value} size="m" />
            }
         },
         {
            label: 'Commission',
            propKey: 'tradeFee',
            align: 'center',
            style: {
               minWidth: '110px',
            },
            format: (value) => {
               return <Price amount={value} noColor={true} />
            }
         },
         {
            label: 'Notional',
            propKey: 'grossBalance',
            align: 'center',
            style: {
               minWidth: '110px',
            },
            format: (value) => {
               return <Price amount={value} noColor={true} />
            }
         },
         {
            label: 'Init. Margin',
            propKey: 'initialMargin',
            align: 'center',
            style: {
               minWidth: '110px',
            },
            format: (value) => {
               return <Price amount={value} noColor={true} />
            }
         },
         {
            label: 'Stop / Gain',
            propKey: 'stopPrice',
            align: 'center',
            style: {
               minWidth: '110px',
            },
            format: (value, item) => {
               return <>
                  <Price amount={value} noColor={true} /> / <Price amount={item.gainPrice} dashedZero={true} noColor={true} />
               </>
            }
         }
      ]}
   />
}
