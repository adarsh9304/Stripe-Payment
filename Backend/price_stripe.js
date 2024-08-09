const stripe = require('stripe')('sk_test_51PlOQFJYGJE7rFcczcNeKVZyeMMP2tezcbXtanS36boEufWs6sR4lh9YDpcED2giHVPXtp8tK8gaIQrffZccgtO300MwL6jCsL');


exports.stripeOneOffCreatePrice = async (req, res) => {
  try {
    const price = await stripe.prices.create({

      unit_amount: 250000, 
        currency: 'usd',
        product: 'prod_Qd67qLAOvuz4xo',
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

exports.stripeGoldPlanCreatePrice = async (req, res) => {
    try {
      const price = await stripe.prices.create({
  
        unit_amount: 31000, 
        currency: 'usd',
        recurring: { interval: 'month' }, 
        product: 'prod_Qd67qLAOvuz4xo',
        nickname: 'Gold Plan',
      });
  
      console.log(price);
  
      res.status(201).json({
        message: "sucessfully add recurring ",
        data: price
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  };

  exports.stripeSilverPlanCreatePrice = async (req, res) => {
    try {
      const price = await stripe.prices.create({
  
        unit_amount: 14000,
        currency: 'usd',
        recurring: { interval: 'month' },
        product: 'prod_Qd67qLAOvuz4xo',
        nickname: 'Silver Plan',
      });
  
      console.log(price);
  
      res.status(201).json({
        message: "sucessfully add customer",
        data: price
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  };

