'use client';

import TableBase from '../../tableBase/TableBase';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import { useRouter, useSearchParams } from 'next/navigation';
import TransactionQuickview from '@/components/modals/quickviews/transactionQuickview/TransactionQuickview';
import useTransaction from '@/hooks/useTransaction';

export default function TransactionsTable({ isAdmin = false, customerId }) {
   const { transactions, loading } = useTransaction({ isAdmin, customerId });

   const router = useRouter();
   const searchParams = useSearchParams();
   const transactionId = searchParams.get('transaction');
   const selectedTransaction = transactions.find(tx => tx.id === transactionId);

   const handleRowClick = (transaction) => {
      const url = new URL(window.location);

      url.searchParams.set('transaction', transaction.id);
      router.push(url.toString(), { shallow: true });
   };

   const handleOnClose = () => {
      const url = new URL(window.location);

      url.searchParams.delete('transaction');
      router.push(url.toString(), { shallow: true });
   }

   return (<>
      <TableBase
         items={transactions}
         loading={loading}
         itemsPerPage={5}
         usePagination={true}
         onClickRow={handleRowClick}
         noDocumentsText={'No transactions found.'}
         headerConfigs={[
            {
               propKey: 'amount',
               label: 'Price',
               align: 'left',
               style: { minWidth: '150px' },
               format: (value) => value,
            },
            {
               propKey: 'status',
               label: 'Status',
               align: 'left',
               style: { minWidth: '250px' },
               format: (_, values) => {
                  const statusLabel = values?.statusLabel;
                  const status = values?.status;
                  return <StatusBadge color={status === 'succeeded' ? 'success' : undefined}>{statusLabel}</StatusBadge>;
               }
            },
            {
               propKey: 'card',
               label: 'Payment Method',
               align: 'left',
               style: { minWidth: '150px' },
               format: (value) => {
                  if (!value) return null;
                  return <>
                     <StatusBadge>{value.network}</StatusBadge>{' '}
                     <StatusBadge>{value.brand}</StatusBadge>
                  </>;
               },
            },
         ]}
      />

      <TransactionQuickview transaction={selectedTransaction} onClose={handleOnClose} />
   </>);
}

