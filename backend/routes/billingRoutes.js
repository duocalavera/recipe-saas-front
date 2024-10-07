import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// Get user's current subscription
router.get('/subscription', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      billingPlan: user.billingPlan,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionEndDate: user.subscriptionEndDate
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription info' });
  }
});

// Create a checkout session for subscription
router.post('/create-checkout-session', auth, async (req, res) => {
  try {
    const { priceId } = req.body;
    const user = await User.findById(req.userId);

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/billing/cancelled`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating checkout session' });
  }
});

// Handle webhook events from Stripe
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      await updateUserSubscription(subscription);
      break;
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      await cancelUserSubscription(deletedSubscription);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

async function updateUserSubscription(subscription) {
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (user) {
    user.subscriptionStatus = subscription.status;
    user.subscriptionEndDate = new Date(subscription.current_period_end * 1000);
    user.billingPlan = getPlanFromProductId(subscription.items.data[0].price.product);
    await user.save();
  }
}

async function cancelUserSubscription(subscription) {
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (user) {
    user.subscriptionStatus = 'cancelled';
    user.billingPlan = 'free';
    await user.save();
  }
}

function getPlanFromProductId(productId) {
  // Map your Stripe product IDs to your plan names
  const productMap = {
    'prod_basic': 'basic',
    'prod_pro': 'pro',
    'prod_enterprise': 'enterprise'
  };
  return productMap[productId] || 'free';
}

export default router;