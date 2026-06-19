'use client';
import { useContext } from 'react';
import StatusBadge from "@/components/common/statusBedge/StatusBadge";
import TableBase from '@/components/tables/tableBase/TableBase';
import DBQueryContext from '@/contexts/DBQuery';

/**
 * A table component displaying a list of activities with their types, subjects, and summaries.
 * This component fetches activity data from a context and displays it in a table format.
 *
 * @returns {React.Element} The rendered table of activities.
 */
export default function ActivitiesTable() {
   const { query = [], isLoading } = useContext(DBQueryContext);
   const activities = query;

   return <div className="activities-table">
      <h3 className="section-title">Activities</h3>

      <TableBase
         items={activities}
         hideHeader={true}
         loading={isLoading}
         headerConfigs={[
            {
               propKey: 'type',
               style: { width: '4rem' },
               format: (__, item) => {
                  return <StatusBadge>{item.type?.toUpperCase()}</StatusBadge>;
               }
            },
            {
               format: (__, item) => {
                  return <>
                     <p>{item.subject}</p>
                     <p>{item.summary}</p>
                  </>;
               }
            }
         ]}
      />
   </div>;
}
