const stripe = require("stripe")(
  "sk_test_51PlOQFJYGJE7rFcczcNeKVZyeMMP2tezcbXtanS36boEufWs6sR4lh9YDpcED2giHVPXtp8tK8gaIQrffZccgtO300MwL6jCsL"
);

exports.stripeUserSubscription = async (req, res) => {
  try {
    const price = await stripe.subscriptions.create({
      customer: "cus_Qd0yjhM9oKv4uJ",
      items: [
        {
          price: "price_1Plq3jJYGJE7rFccwyDshVpO"
        }
      ]
    });

    console.log(price);

    res.status(201).json({
      message: "sucessfully add price of oneoff",
      data: price
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
