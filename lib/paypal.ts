import paypal from "@paypal/checkout-server-sdk";

const configureEnvironment = function () {
  const clientId = process.env.PAYPAL_CLIENT_ID as string;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET as string;

  return process.env.NODE_ENV === "production"
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const paypalClient = function () {
  return new paypal.core.PayPalHttpClient(configureEnvironment());
};

export default paypalClient;
