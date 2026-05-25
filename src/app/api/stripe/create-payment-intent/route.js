import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
   try {
      const { amount, currency = 'usd' } = await request.json();

      if (!amount || typeof amount !== 'number' || amount <= 0) {
         return Response.json({ error: 'Invalid amount.' }, { status: 400 });
      }

      const paymentIntent = await stripe.paymentIntents.create({
         amount: Math.round(amount * 100), // Stripe expects cents
         currency,
         automatic_payment_methods: { enabled: true }
      });

      return Response.json({ clientSecret: paymentIntent.client_secret });
   } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
   }
}
