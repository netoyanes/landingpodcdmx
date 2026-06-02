import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { guests, name, email } = req.body;
  const pricePerPerson = 150000; // $1,500 MXN in centavos
  const amount = pricePerPerson * parseInt(guests, 10);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'mxn',
      metadata: { name, email, guests: String(guests) },
      receipt_email: email,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
