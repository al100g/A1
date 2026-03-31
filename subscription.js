// subscription.js
// Sample code for Stripe subscription handling

const stripe = require('stripe')('your_secret_key');

async function createSubscription(customerId, priceId) {
    return await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
    });
}

module.exports = { createSubscription };