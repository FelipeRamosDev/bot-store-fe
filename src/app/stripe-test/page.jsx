import StripePaymentForm from '@/components/forms/stripePaymentForm/StripePaymentForm';
import StripeSubscriptionForm from '@/components/forms/stripeSubscriptionForm/StripeSubscriptionForm';
import { Box, Divider, Typography } from '@mui/material';

export const metadata = { title: 'Stripe Test' };

export default function StripeTestPage() {
   return (
      <Box sx={{ maxWidth: 480, mx: 'auto', mt: 8, p: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
         <Box>
            <Typography variant="h5" gutterBottom>One-time Payment Test</Typography>
            <StripePaymentForm amount={9.99} currency="usd" />
         </Box>

         <Divider />

         <Box>
            <Typography variant="h5" gutterBottom>Monthly Subscription Test</Typography>
            <StripeSubscriptionForm
               email="felipe@feliperamos.dev"
               priceId="price_1Tb4m91claDIcye4xSp8OUDl"
            />
         </Box>
      </Box>
   );
}
