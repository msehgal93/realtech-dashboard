// import Stripe from 'stripe';

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//   apiVersion: '2023-10-16',
//   typescript: true,
// });

// export const getStripeSession = async (priceId: string, tenantId: string, userId: string) => {
//   if (!process.env.STRIPE_SECRET_KEY) {
//     console.warn("Stripe secret key not found");
//     return null;
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: 'subscription',
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         tenantId,
//         userId,
//       },
//       success_url: `${process.env.NEXTAUTH_URL}/dashboard/settings?success=true`,
//       cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/settings?canceled=true`,
//     });

//     return session;
//   } catch (error) {
//     console.error("Error creating Stripe session:", error);
//     throw error;
//   }
// };

export const handleStripeWebhook = async (req: Request) => {
  // Webhook handling logic would go here
  // Verifying signature, updating database, etc.
  console.log("Stripe webhook received");
};
