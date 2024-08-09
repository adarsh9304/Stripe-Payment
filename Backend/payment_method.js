const stripe = require("stripe")(
  "sk_test_51PlOQFJYGJE7rFcczcNeKVZyeMMP2tezcbXtanS36boEufWs6sR4lh9YDpcED2giHVPXtp8tK8gaIQrffZccgtO300MwL6jCsL"
);

exports.stripePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: 'tok_visa', 
      }
    });

    res.status(200).json({
      message: "Payment method attached and set as default successfully.",
      data:paymentMethod
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
