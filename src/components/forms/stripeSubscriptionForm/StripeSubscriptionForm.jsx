'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
   Button,
   CircularProgress,
   Alert,
   Box,
   Typography,
   Divider
} from '@mui/material';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

/**
 * Inner form — must be rendered inside <Elements>.
 */
function SubscriptionCheckoutForm({ onSuccess }) {
   const stripe = useStripe();
   const elements = useElements();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   async function handleSubmit(e) {
      e.preventDefault();
      if (!stripe || !elements) return;

      setLoading(true);
      setError(null);

      const { error: submitError } = await elements.submit();
      if (submitError) {
         setError(submitError.message);
         setLoading(false);
         return;
      }

      // Confirm the first invoice payment — subsequent months are charged automatically
      const { error: confirmError } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${window.location.origin}/dashboard`
         }
      });

      if (confirmError) {
         setError(confirmError.message);
         setLoading(false);
      } else {
         onSuccess?.();
      }
   }

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
         <PaymentElement />
         {error && <Alert severity="error">{error}</Alert>}
         <Button type="submit" variant="contained" disabled={!stripe || loading}>
            {loading ? <CircularProgress size={20} /> : 'Subscribe'}
         </Button>
      </Box>
   );
}

/**
 * StripeSubscriptionForm
 *
 * Creates a Stripe Customer + monthly Subscription using the CandlePilot user's
 * email. The subscriber does NOT need a Stripe account — only their card.
 * Subsequent monthly charges are handled automatically by Stripe.
 *
 * @param {Object}   props
 * @param {string}   props.email        - Logged-in CandlePilot user's email
 * @param {string}   [props.productId]  - Stripe Product ID from the dashboard (e.g. prod_ABC...)
 * @param {string}   [props.priceId]    - Stripe Price ID from the dashboard (e.g. price_ABC...)
 * @param {number}   [props.amount]     - Monthly amount in dollars — used only if no productId/priceId
 * @param {string}   [props.currency]   - ISO currency code, defaults to "usd"
 * @param {string}   [props.productName]- Label shown in the Stripe dashboard (on-the-fly only)
 * @param {Function} [props.onSuccess]
 */
export default function StripeSubscriptionForm({
   email,
   productId,
   priceId,
   amount,
   currency = 'usd',
   productName,
   onSuccess
}) {
   const [clientSecret, setClientSecret] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [initiated, setInitiated] = useState(false);

   async function initSubscription() {
      setInitiated(true);
      setError(null);
      setLoading(true);

      try {
         const res = await fetch('/api/stripe/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, productId, priceId, amount, currency, productName })
         });

         const data = await res.json();
         if (!res.ok) throw new Error(data.error);

         setClientSecret(data.clientSecret);
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   }

   if (!initiated) {
      return (
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            {amount && <Typography variant="body2">${amount} / month — {currency.toUpperCase()}</Typography>}
            <Button variant="contained" onClick={initSubscription}>Subscribe</Button>
         </Box>
      );
   }

   if (error) {
      return (
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="error">{error}</Alert>
            <Button variant="outlined" onClick={initSubscription}>Retry</Button>
         </Box>
      );
   }

   if (loading || !clientSecret) {
      return (
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary">Preparing payment...</Typography>
         </Box>
      );
   }

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
         <Typography variant="body2" color="text.secondary">
            ${amount} / month — {currency.toUpperCase()}
         </Typography>
         <Divider />
         <Elements stripe={stripePromise} options={{ clientSecret }}>
            <SubscriptionCheckoutForm onSuccess={onSuccess} />
         </Elements>
      </Box>
   );
}
