'use client';
import { useContext, useState } from 'react';
import Price from '@/components/displays/price/Price';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import TableBase from '@/components/tables/tableBase/TableBase';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import DBQueryContext from '@/contexts/DBQuery';
import SlotQuickview from '@/components/modals/quickviews/SlotQuickview/SlotQuickview';

/**
 * A table component to display slot data with pagination and loading states.
 * 
 * This component fetches slot data from the DBQueryContext and displays it in a table format.
 * It includes columns for slot symbol, master name, PNL/ROI, and type.
 * 
 * @returns {React.Element} The rendered table component with slot data.
 */
export default function SlotsTable() {
   const { query = [], isLoading, limit, reloadLimit, goPage } = useContext(DBQueryContext);
   const slots = query;
   const [ slotModal, setSlotModal ] = useState('');
   const selectedSlot = slots.find(item => item._id === slotModal);
   let parsedLimit = limit;

   if (limit) {
      parsedLimit = limit -1;
   }

   return <>
      <SlotQuickview slot={selectedSlot} onClose={() => setSlotModal('')} />

      <TableBase
         pagination={{}}
         items={slots}
         loading={isLoading}
         onClickRow={(doc) => setSlotModal(doc?._id)}
         usePagination={true}
         itemsPerPage={parsedLimit}
         onPageNav={goPage}
         onRowsPerPageChange={reloadLimit}
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
   </>;
}

