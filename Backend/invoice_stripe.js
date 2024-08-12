const stripe = require("stripe")(
  "sk_test_51PlOQFJYGJE7rFcczcNeKVZyeMMP2tezcbXtanS36boEufWs6sR4lh9YDpcED2giHVPXtp8tK8gaIQrffZccgtO300MwL6jCsL"
);

exports.stripeCreateInvoiceItem = async (req, res) => {
  try {
    const invoiceItem = await stripe.invoiceItems.create({
      customer: "cus_Qd0yjhM9oKv4uJ",
      amount: 27500, // Amount in cents
      currency: "usd",
      description: "Book sub invoice",
      email: "pateladarsh9558@gmail.com"
    });

    res.status(201).json({
      message: "sucessfully add customer",
      data: invoiceItem
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.stripeCreateInvoice = async (req, res) => {
  try {
    const invoice = await stripe.invoices.create({
      customer: "cus_Qd0yjhM9oKv4uJ",
      auto_advance: false,
      description: "Book subscription",
      due_date: Math.floor(Date.now() / 1000) + 604800, // Due in 7 days
      footer: "Thank is footer"
    });

    res.status(201).json({
      message: "sucessfully add customer",
      data: invoice
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};



exports.stripeFinalizeInvoice = async (req, res) => {
    try {
      const finalizedInvoice = await stripe.invoices.finalizeInvoice();
  
      res.status(201).json({
        message: "sucessfully add customer",
        data: finalizedInvoice
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  };


  exports.stripeSendInvoice = async (req, res) => {
    try {
      const sentInvoice = await stripe.invoices.sendInvoice(invoiceId);
  
      res.status(201).json({
        message: "sucessfully add customer",
        data: sentInvoice
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  };






