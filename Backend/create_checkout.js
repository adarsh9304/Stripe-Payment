const stripe = require('stripe')('sk_test_51PlOQFJYGJE7rFcczcNeKVZyeMMP2tezcbXtanS36boEufWs6sR4lh9YDpcED2giHVPXtp8tK8gaIQrffZccgtO300MwL6jCsL');

exports.createCheckout =async(req,res)=>{
    console.log('inside backend of checkout')
    try {
        const DOMAIN = 'http://localhost:3000';
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // most important is priceID , from that it will decide whether the product is recurring or one-off
            price: 'price_1PlPoAJYGJE7rFcc4BDr9Yfa',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${DOMAIN}?success=true`,
        cancel_url: `${DOMAIN}?canceled=true`,
      });
      console.log(session.url)
      res.status(200).json({
        success:true,
        data:session.url
      })
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
