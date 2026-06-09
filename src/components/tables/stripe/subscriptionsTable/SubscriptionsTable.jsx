'use client';

import TableBase from '../../tableBase/TableBase';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import SubscriptionQuickview from '@/components/modals/quickviews/subscriptionQuickview/SubscriptionQuickview';
import { useRouter, useSearchParams } from 'next/navigation';
import useSubscriptions from '@/hooks/useSubscriptions';

export default function SubscriptionsTable({ isAdmin = false, customerId }) {
   const { subscriptions, loading } = useSubscriptions(isAdmin, customerId);

   const searchParams = useSearchParams();
   const subscriptionId = searchParams.get("subscription");
   const subscription = subscriptions.find(sub => sub.id === subscriptionId);
   const router = useRouter();

   const handleRowClick = (subscription) => {
      const url = new URL(window.location);

      url.searchParams.set('subscription', subscription.id);
      router.push(url.toString(), { shallow: true });
   };

   const handleCloseQuickview = () => {
      const url = new URL(window.location);

      url.searchParams.delete('subscription');
      router.push(url.toString(), { shallow: true });
   };

   return (<>
      <TableBase
         items={subscriptions}
         loading={loading}
         itemsPerPage={10}
         usePagination={true}
         noDocumentsText={'No subscriptions found.'}
         onClickRow={handleRowClick}
         headerConfigs={[
            {
               propKey: 'plan',
               label: 'Plan',
               align: 'left',
               format: (value) => value?.name || 'N/A',
            },
            {
               propKey: 'plan',
               label: 'Price',
               align: 'left',
               style: { minWidth: '150px' },
               format: (value) => value?.amount && value?.interval ? `${value.amount} / ${value.interval}` : '---',
            },
            {
               propKey: 'status',
               label: 'Status',
               align: 'center',
               style: { minWidth: '120px' },
               format: (value) => {
                  return <StatusBadge color={value === 'active' ? 'success' : undefined}>{value}</StatusBadge>;
               }
            },
            {
               propKey: 'currentPeriodStart',
               label: 'Period Start',
               align: 'center',
               style: { minWidth: '150px' },
               format: (value) => value ? new Date(value).toLocaleDateString() : '---',
            },
            {
               propKey: 'currentPeriodEnd',
               label: 'Period End',
               align: 'center',
               style: { minWidth: '150px' },
               format: (value) => value ? new Date(value).toLocaleDateString() : '---',
            },
         ]}
      />

      {subscription && (
         <SubscriptionQuickview
            subscription={subscription}
            onClose={handleCloseQuickview}
         />
      )}
   </>);
}
