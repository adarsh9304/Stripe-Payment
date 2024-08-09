const stripe = require('stripe')('sk_test_51PlOQFJYGJE7rFcczcNeKVZyeMMP2tezcbXtanS36boEufWs6sR4lh9YDpcED2giHVPXtp8tK8gaIQrffZccgtO300MwL6jCsL');

exports.stripeAddCustomer=async (req,res)=>{
    try{

        const customer = await stripe.customers.create({
            name:req.body.name,
            email:req.body.email
        })

        console.log(customer)

        res.status(201).json({
            message:"sucessfully add customer",
            data:customer
        })

    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}

exports.stripeListCustomers=async (req,res)=>{
    try{

        const customers = await stripe.customers.list({
            limit:req.body.limit
        })

        console.log(customers)

        res.status(201).json({
            message:"sucessfully Got customers",
            data:customers
        })

    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}

exports.stripeDeleteCustomer=async (req,res)=>{
    try{

        const customer = await stripe.customers.del(
            req.body.customerID
        )

        console.log(customer)

        res.status(201).json({
            message:"sucessfully delete customer",
            data:customer
        })

    }
    catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}

exports.stripeAttachPaymentMethod = async (req, res) => {
    try {
        const customerId= 'cus_Qd0yjhM9oKv4uJ'
        const paymentMethodId='pm_1PlrIIJYGJE7rFcciqgZfarG'

        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });

        await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        res.status(200).json({
            message: 'Payment method attached and set as default successfully.',
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};
