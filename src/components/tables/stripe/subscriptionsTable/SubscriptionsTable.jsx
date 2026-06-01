'use client';
import APIContext from '@/contexts/4HandsAPI';
import { useContext, useEffect, useRef, useState } from 'react';
import TableBase from '../../tableBase/TableBase';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';

export default function SubscriptionsTable() {
   const [subscriptions, setSubscriptions] = useState([]);
   const [loading, setLoading] = useState(true);
   const instance = useContext(APIContext);
   const query = useRef();

   useEffect(() => {
      if (query.current) {
         return;
      }

      query.current = instance.ajax.authGet('/stripe/subscriptions').then(res => {
         setSubscriptions(res?.subscriptions || []);
      }).catch(err => {
         console.error('Error fetching Stripe subscriptions:', err);
         setSubscriptions([]);
      }).finally(() => {
         setLoading(false);
      });
   }, []);

   return (
      <TableBase
         items={subscriptions}
         loading={loading}
         itemsPerPage={10}
         usePagination={true}
         noDocumentsText={'No subscriptions found.'}
         headerConfigs={[
            {
               propKey: 'planDetails',
               label: 'Plan',
               align: 'left',
               format: (value) => {
                  return value?.name || 'N/A';
               }
            },
            {
               propKey: 'price',
               label: 'Price',
               align: 'left',
               style: { minWidth: '150px' },
               format: (_, values) => {
                  const amounts = values?.items?.data?.map(item => `${item.plan.currency.toUpperCase()} ${String(item.plan.amount / 100)}/${item.plan.interval}`) || [];
                  return amounts.join('\n');
               },
            },
            {
               propKey: 'status',
               label: 'Status',
               align: 'center',
               style: { minWidth: '120px' },
               format: (_, values) => {
                  const status = values?.status
                  return <StatusBadge color={status === 'active' ? 'success' : undefined}>{status}</StatusBadge>;
               }
            },
            {
               propKey: 'current_period_start',
               label: 'Period Start',
               align: 'center',
               style: { minWidth: '150px' },
               format: (_, values) => {
                  const dates = values?.items?.data?.map(item => new Date(item.current_period_start * 1000).toLocaleDateString());
                  return dates.join('\n');
               },
            },
            {
               propKey: 'current_period_end',
               label: 'Period End',
               align: 'center',
               style: { minWidth: '150px' },
               format: (_, values) => {
                  const dates = values?.items?.data?.map(item => new Date(item.current_period_end * 1000).toLocaleDateString());
                  return dates.join('\n');
               },
            },
         ]}
      />
   );
}

