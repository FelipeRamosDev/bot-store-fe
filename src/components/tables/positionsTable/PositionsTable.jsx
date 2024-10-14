'use client';
import { useContext, useState } from 'react';
import TableBase from '@/components/tables/tableBase/TableBase';
import Price from '@/components/displays/price/Price';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import DBQueryContext from '@/contexts/DBQuery';
import Percent from '@/components/displays/percent/Percent';
import PrettyDate from '@/components/displays/prettyDate/PrettyDate';
import PositionQuickview from '@/components/modals/quickviews/positionQuickview/PositionQuickview';
import NotionalRoiTooltip from './tooltips/NotionalRoiTooltip';
import MarginRoiTooltip from './tooltips/MarginRoiTooltip';
import MasterRoiTooltip from './tooltips/MasterRoiTooltip';

/**
 * A table component that displays trading positions with various details.
 *
 * @param {Object} props - The properties for the PositionsTable component.
 * @param {Array} props.positionsSet - An optional array of positions to display. If not provided, data from the context will be used.
 * @param {number} [props.itemsPerPage] - The number of items to list per page.
 * @param {Array} [props.include] - Optional array of property keys to include in the table.
 * @param {Array} [props.exclude] - Optional array of property keys to exclude from the table.
 *
 * @returns {React.Element} The rendered PositionsTable component.
 */
export default function PositionsTable({ positionsSet, include, exclude }) {
   const [ positionModal, setPositionModal ] = useState('');
   const { query = [], isLoading, limit, goPage, reloadLimit } = useContext(DBQueryContext);
   const positions = positionsSet || query;
   const selectedPosition = positions.find(item => item._id === positionModal);
   let parsedLimit = limit;

   const PERCENT_OPTIONS = {
      prefix: '(',
      posfix: ')',
      fontSize: '0.8rem'
   }

   if (limit) {
      parsedLimit = limit -1;
   }

   return <>
      <PositionQuickview position={selectedPosition} onClose={() => setPositionModal('')} />

      <TableBase
         className="positions-table"
         items={positions}
         loading={isLoading}
         include={include}
         exclude={exclude}
         onClickRow={(doc) => setPositionModal(doc?._id)}
         usePagination={true}
         itemsPerPage={parsedLimit}
         onPageNav={goPage}
         onRowsPerPageChange={reloadLimit}
         headerConfigs={[
            {
               propKey: 'symbol',
               label: 'Symbol',
               style: {
                  paddingLeft: '2rem',
                  minWidth: '200px',
               },
               format: (value, item) => {
                  return <>
                     <EdgeLight colorValue={item.pnl} />

                     <small>{item.master?.name} / {item.botSlot?.name}</small>
                     <p style={{ marginTop: 3 }}>
                        {value}{' '}
                        <StatusBadge variant="light" type="account-type" minified={true}>{item.type}</StatusBadge>{' '}
                        <StatusBadge variant="light" type="position-side" minified={true}>{item.positionType}</StatusBadge>
                     </p>
                  </>;
               }
            },
            {
               propKey: 'realizedProfit',
               label: (<div className="tooltip-head">
                  Realized (ROI)
                  <NotionalRoiTooltip />
               </div>),
               align: 'center',
               style: { minWidth: '140px' },
               format: (value, item) => {
                  return (<>
                     <Price amount={value} fontSize="1rem" /> <Percent value={item.notionalROI} prefix="(" posfix=")" fontSize="0.8rem" />
                  </>);
               }
            },
            {
               propKey: 'masterPnlROI',
               label: (<div className="tooltip-head">
                  ROI / Balance
                  <MasterRoiTooltip />
               </div>),
               align: 'center',
               style: { minWidth: '140px' },
               format: (value) => {
                  return (<Percent value={value} size="m" />);
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
               label: 'Commission',
               propKey: 'tradeFee',
               align: 'center',
               style: {
                  minWidth: '110px',
               },
               format: (value, item) => {
                  return <>
                     <Price amount={value} noColor={true} fractional={3} />
                     {' '}
                     <Percent value={(value * 100) / item.grossBalance} noColor prefix="(" posfix=")" fontSize="0.8rem" />
                  </>
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
               label: 'Leverage',
               propKey: 'usedLeverage',
               align: 'center',
               style: {
                  minWidth: '70px',
               },
               format: (value) => {
                  return <b style={{ fontSize: '1rem' }}>{value}x</b>
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
                  return <b style={{ fontSize: '1rem' }}>{value}</b>
               }
            },
            {
               propKey: 'pnl',
               label: (<div className="tooltip-head">
                  PNL (ROI)
                  <MarginRoiTooltip />
               </div>),
               align: 'center',
               style: {
                  minWidth: '140px',
               },
               format: (value, item) => {
                  return <>
                     <Price amount={value} size="s" /> <Percent {...PERCENT_OPTIONS} value={item.roi} />
                  </>
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
   </>;
}
