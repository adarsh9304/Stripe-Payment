/*

PaymentIntent is like creating a plan or intention to make a payment before the payment actually happens. Think of it as setting up the details and getting everything ready for the payment.



*/

const stripe = require("stripe")(
  "sk_test_51PlOQFJYGJE7rFcczcNeKVZyeMMP2tezcbXtanS36boEufWs6sR4lh9YDpcED2giHVPXtp8tK8gaIQrffZccgtO300MwL6jCsL"
);

exports.stripeCreatePaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 250000,
      currency: "usd",
      payment_method_types: ["card"]
    });

    res.status(200).send({
        clientSecret:paymentIntent.client_secret,
        data:paymentIntent
    })

  } catch (err) {
    res.status(400).send({
      error: err.message
    });
  }
};

exports.confirmPaymentIntent = async (req, res) => {
    try {
      const confirmPaymentIntent = await stripe.paymentIntents.confirm('pi_3PmsCSJYGJE7rFcc1e6XsqIN',{
        payment_method:'pm_card_visa'
      });
  
      res.status(200).send({
          data:confirmPaymentIntent
      })
  
    } catch (err) {
      res.status(400).send({
        error: err.message
      });
    }
  };


  exports.capturePaymentIntent = async (req, res) => {
    try {
      const capturePaymentIntent = await stripe.paymentIntents.capture('pi_3PmsJQJYGJE7rFcc0lbVBT7B');
  
      res.status(200).send({
          data:capturePaymentIntent
      })
  
    } catch (err) {
      res.status(400).send({
        error: err.message
      });
    }
  };

/*

Real-Life Analogy
Imagine you’re at a restaurant, and you’re about to pay the bill. Here’s how it works:

You ask for the bill (Create PaymentIntent):

The restaurant staff calculates your total amount, including tax and tips, and brings you the bill. This is like creating a PaymentIntent—you’re telling the system that you intend to pay a specific amount.
You decide how to pay (Attach Payment Method):

You decide to pay with your credit card. The staff takes your card and checks if everything is in order. This is like attaching a payment method to the PaymentIntent—you're specifying how you want to pay.
The payment is processed (Confirm PaymentIntent):

The staff processes your payment. If everything is fine, the payment is successful. If there’s an issue (like insufficient funds or a need for PIN verification), they’ll ask you to take additional action. This step is like confirming the PaymentIntent.
You receive a receipt (Payment Succeeded):

If the payment goes through successfully, you get a receipt. This means the PaymentIntent has succeeded, and the transaction is complete.

*/
