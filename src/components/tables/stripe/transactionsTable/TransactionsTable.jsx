'use client';
import APIContext from '@/contexts/4HandsAPI';
import { useContext, useEffect, useRef, useState } from 'react';
import TableBase from '../../tableBase/TableBase';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';

export default function TransactionsTable({ customerId }) {
   const [transactions, setTransactions] = useState([]);
   const [loading, setLoading] = useState(true);
   const instance = useContext(APIContext);
   const query = useRef();

   useEffect(() => {
      if (query.current) {
         return;
      }

      query.current = instance.ajax.authGet(`/stripe/transactions`, { customer: customerId }).then(res => {
         setTransactions(res?.transactions || []);
      }).catch(err => {
         console.error('Error fetching Stripe transactions:', err);
         setTransactions([]);
      }).finally(() => {
         setLoading(false);
      });
   }, [customerId, instance]);

   return (
      <TableBase
         items={transactions}
         loading={loading}
         itemsPerPage={10}
         usePagination={true}
         noDocumentsText={'No transactions found.'}
         headerConfigs={[
            {
               propKey: 'amount',
               label: 'Price',
               align: 'left',
               style: { minWidth: '150px' },
               format: (_, values) => {
                  const amount = `${values.currency.toUpperCase()} ${String(values.amount / 100)}`
                  return amount;
               },
            },
            {
               propKey: 'status',
               label: 'Status',
               align: 'left',
               style: { minWidth: '250px' },
               format: (_, values) => {
                  const status = values?.status
                  return <StatusBadge color={status === 'succeeded' ? 'success' : undefined}>{status}</StatusBadge>;
               }
            },
            {
               propKey: 'payment_method_details',
               label: 'Payment Method',
               align: 'left',
               style: { minWidth: '150px' },
               format: (value) => {
                  return <>
                     <StatusBadge>{value.type}</StatusBadge>{' '}
                     <StatusBadge>{value.card?.brand}</StatusBadge>
                  </>;
               },
            },
         ]}
      />
   );
}

