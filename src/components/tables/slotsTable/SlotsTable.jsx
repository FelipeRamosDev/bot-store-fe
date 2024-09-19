'use client';
import { useContext, useState } from 'react';
import Price from '@/components/displays/price/Price';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import TableBase from '@/components/tables/tableBase/TableBase';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import DBQueryContext from '@/contexts/DBQuery';
import SlotQuickview from '@/components/modals/quickviews/SlotQuickview/SlotQuickview';
import Percent from '@/components/displays/percent/Percent';

/**
 * A table component to display slot data with pagination and loading states.
 * 
 * This component fetches slot data from the DBQueryContext and displays it in a table format.
 * It includes columns for slot symbol, master name, PNL/ROI, and type.
 * 
 * @param {Object} props - The component properties.
 * @param {string[]} props.include - The prop keys to include.
 * @param {string[]} props.exclude - The prop keys to exclude.
 * @returns {React.Element} The rendered table component with slot data.
 */
export default function SlotsTable({ include, exclude }) {
   const { query = [], isLoading, limit, reloadLimit, goPage } = useContext(DBQueryContext);
   const slots = query;
   const [ slotModal, setSlotModal ] = useState('');
   const selectedSlot = slots.find(item => item._id === slotModal);
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
      <SlotQuickview slot={selectedSlot} onClose={() => setSlotModal('')} />

      <TableBase
         pagination={{}}
         items={slots}
         loading={isLoading}
         include={include}
         exclude={exclude}
         onClickRow={(doc) => setSlotModal(doc?._id)}
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

                     <p>{item.name}</p>
                     <small>{item.master?.name}</small>{' '}
                     <StatusBadge type="account-type" variant="light" minified={true}>{item.type}</StatusBadge>
                  </>);
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
               label: 'Status',
               align: 'center',
               format: (__, item) => {
                  return <StatusBadge type="slot-status" variant="light">{item.status}</StatusBadge>;
               }
            }
         ]}
      />
   </>;
}

