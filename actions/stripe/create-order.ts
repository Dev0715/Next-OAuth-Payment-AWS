import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type OrderType = {};

export const createOrder = async () => {
  const taxRate = await stripe.taxRates.create({
    display_name: "GST",
    description: "Goods & Service Tax",
    jurisdiction: "AU",
    percentage: 10,
    inclusive: false
  });
  let payment = await stripe.checkout.sessions.create({
    mode: "payment",
    client_reference_id: user._id.toString(),
    payment_method_types: ["card"],
    // customer: customer.id,
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: "AUD",
          product_data: {
            name: membership.name,
            description: membership.description,
            // description: membership.description + " - " + moment().add(membership.period, 'months').format("YYYY-MM-DD HH:mm:ss"),
            images: ["https://answersheet.au/logo.svg"]
          },
          unit_amount: Number(Math.round((membership.price / 1.1) * 100))
        },
        tax_rates: [taxRate.id],
        quantity: 1
      }
    ],
    // success_url: `${global.env.HOSTNAME}/private-membership`,
    // cancel_url: `${global.env.HOSTNAME}/private-membership`
    success_url: `${global.env.HOSTNAME}/private-billing/stripe/return?session_id={CHECKOUT_SESSION_ID}&history_id=${membershipHistory._id}`,
    cancel_url: `${global.env.HOSTNAME}/current-membership`
  });

  return res.json({
    success: true,
    redirect_url: payment.url
  });
};
