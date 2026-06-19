import ConfirmationDialog from '@/components/modals/dialogs/confirmationDialog/ConfirmationDialog';
import useSubscriptions from '@/hooks/useSubscriptions';
import { useRouter } from 'next/navigation';

export default function CancelSubscriptionConfirmDialog({ subscriptionName, open = false, setOpen = () => {} }) {
   const { cancelSubscription } = useSubscriptions({ preventLoad: true });
   const router = useRouter();

   const handleConfirm = async () => {
      await cancelSubscription();
      setOpen(false);

      router.push('/dashboard');
   };

   return (
      <ConfirmationDialog
         title="Cancel Subscription"
         open={open}
         handleConfirm={handleConfirm}
         onClose={() => setOpen(false)}
         confirmLabel="CANCEL SUBSCRIPTION"
      >
         <p style={{ marginBottom: 0 }}>Are you sure you want to cancel the subscription for &quot;{subscriptionName} Plan&quot;?</p>
      </ConfirmationDialog>
   );
}
