// subscription.js
// Sample code for Stripe subscription handling

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing required environment variable: STRIPE_SECRET_KEY');
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createSubscription(customerId, priceId) {
    return await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
    });
}

module.exports = { createSubscription };