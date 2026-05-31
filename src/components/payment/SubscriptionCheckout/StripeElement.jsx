import { LoadingButton } from "@mui/lab";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function StripeElement({ onSuccess, setError }) {
   const [loading, setLoading] = useState(false);
   const stripe = useStripe();
   const elements = useElements();

   const handleSubmit = async (e) => {
      e.preventDefault();
      // The actual payment confirmation is handled by the Stripe Elements form

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
      const { error: confirmError } = await stripe.confirmPayment({ elements, redirect: 'if_required' });

      if (confirmError) {
         setError(confirmError.message);
      } else {
         onSuccess?.();
      }

      setLoading(false);
   };

   return (
      <form onSubmit={handleSubmit} className="stripe-element-form">
         <PaymentElement />

         <LoadingButton
            type="submit"
            variant="contained"
            color="success"
            loading={loading}
            disabled={!stripe}
            fullWidth
         >
            Confirm Payment
         </LoadingButton>
      </form>
   );
}

