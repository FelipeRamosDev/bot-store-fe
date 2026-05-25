'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, CircularProgress, Alert, Box, Typography } from '@mui/material';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

/**
 * Inner form — must be rendered inside <Elements>.
 */
function CheckoutForm({ onSuccess }) {
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
            {loading ? <CircularProgress size={20} /> : 'Pay'}
         </Button>
      </Box>
   );
}

/**
 * StripePaymentForm
 *
 * Fetches a PaymentIntent from the API, then renders the Stripe Elements form.
 *
 * @param {Object}   props
 * @param {number}   props.amount     - Amount in dollars (e.g. 29.99)
 * @param {string}   [props.currency] - ISO currency code, defaults to "usd"
 * @param {Function} [props.onSuccess]
 */
export default function StripePaymentForm({ amount, currency = 'usd', onSuccess }) {
   const [clientSecret, setClientSecret] = useState(null);
   const [fetchError, setFetchError] = useState(null);

   async function initPayment() {
      setFetchError(null);
      try {
         const res = await fetch('/api/stripe/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, currency })
         });

         const data = await res.json();
         if (!res.ok) throw new Error(data.error);
         setClientSecret(data.clientSecret);
      } catch (err) {
         setFetchError(err.message);
      }
   }

   if (fetchError) {
      return <Alert severity="error">{fetchError}</Alert>;
   }

   if (!clientSecret) {
      return (
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <Typography variant="body2">Amount: ${amount} {currency.toUpperCase()}</Typography>
            <Button variant="contained" onClick={initPayment}>Proceed to Payment</Button>
         </Box>
      );
   }

   return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
         <CheckoutForm onSuccess={onSuccess} />
      </Elements>
   );
}
