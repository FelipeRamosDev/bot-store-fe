import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
   try {
      const {
         email,
         productId,
         priceId,
         amount
      } = await request.json();

      // 1. Validate all inputs before making any Stripe API calls
      if (!email || typeof email !== 'string') {
         return Response.json({ error: 'A valid email is required.' }, { status: 400 });
      }

      if (!productId && !priceId && (!amount || typeof amount !== 'number' || amount <= 0)) {
         return Response.json({ error: 'Provide a productId, priceId, or a valid amount.' }, { status: 400 });
      }

      // 2. Resolve the Price ID before creating any Stripe objects
      let resolvedPriceId = priceId;

      if (!resolvedPriceId && productId) {
         const prices = await stripe.prices.list({ product: productId, active: true, type: 'recurring', limit: 1 });

         if (!prices.data.length) {
            return Response.json({ error: `No active recurring price found for product ${productId}.` }, { status: 400 });
         }

         resolvedPriceId = prices.data[0].id;
      }

      // 3. Reuse existing Stripe Customer or create a new one
      const existingCustomers = await stripe.customers.list({ email, limit: 1 });
      const customer = existingCustomers.data.length
         ? existingCustomers.data[0]
         : await stripe.customers.create({ email });

      // 4. Check if the customer already has an active subscription for the same price/product
      const activeSubscriptions = await stripe.subscriptions.list({
         customer: customer.id,
         price: resolvedPriceId,
         status: 'active',
         limit: 1
      });

      if (activeSubscriptions.data.length) {
         return Response.json({ error: 'Customer already has an active subscription for this plan.' }, { status: 409 });
      }

      // 5. Reuse an existing incomplete subscription or create a new one
      const incompleteSubscriptions = await stripe.subscriptions.list({
         customer: customer.id,
         price: resolvedPriceId,
         status: 'incomplete',
         limit: 1
      });

      const subscription = incompleteSubscriptions.data.length
         ? incompleteSubscriptions.data[0]
         : await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: resolvedPriceId }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' }
         });

      // 6. Retrieve the latest invoice explicitly — nested expand is unreliable in newer SDK versions
      const invoiceId = typeof subscription.latest_invoice === 'string'
         ? subscription.latest_invoice
         : subscription.latest_invoice?.id;

      if (!invoiceId) {
         return Response.json({ error: 'Subscription has no invoice.' }, { status: 500 });
      }

      // 7. Retrieve invoice — expand down to the PaymentIntent for Dahlia API (2026+)
      let invoice = await stripe.invoices.retrieve(invoiceId, {
         expand: ['payments.data.payment.payment_intent']
      });

      // Finalize if still a draft
      if (invoice.status === 'draft') {
         invoice = await stripe.invoices.finalizeInvoice(invoiceId, {
            expand: ['payments.data.payment.payment_intent']
         });
      }

      // 8. Resolve clientSecret across all Stripe API versions:
      //    - Legacy:        invoice.payment_intent (object or string ID)
      //    - Dahlia (2026+): invoice.payments.data[0].payment.payment_intent (object or string ID)
      let clientSecret;

      if (invoice.payment_intent) {
         const pi = typeof invoice.payment_intent === 'string'
            ? await stripe.paymentIntents.retrieve(invoice.payment_intent)
            : invoice.payment_intent;
         clientSecret = pi.client_secret;
      } else {
         const paymentWrapper = invoice.payments?.data?.[0]?.payment;
         const piRef = paymentWrapper?.payment_intent;

         if (piRef) {
            const pi = typeof piRef === 'string'
               ? await stripe.paymentIntents.retrieve(piRef)
               : piRef;
            clientSecret = pi.client_secret;
         }
      }

      if (!clientSecret) {
         return Response.json({ error: 'Payment intent not found on invoice.' }, { status: 500 });
      }

      return Response.json({ clientSecret, subscriptionId: subscription.id });
   } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
   }
}
