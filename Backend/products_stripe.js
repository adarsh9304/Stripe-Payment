const stripe = require("stripe")(
  "sk_test_51PlOQFJYGJE7rFcczcNeKVZyeMMP2tezcbXtanS36boEufWs6sR4lh9YDpcED2giHVPXtp8tK8gaIQrffZccgtO300MwL6jCsL"
);

exports.stripeAddProduct = async (req, res) => {
  try {
    const customer = await stripe.products.create({
      name: "Book product",
      description: "This book is amazing",
      images: ["https://i.imgur.com/toQtUgH.jpeg"],
      metadata: {
        category: "book"
      }
    });

    console.log(customer);

    res.status(201).json({
      message: "sucessfully add customer",
      data: customer
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
