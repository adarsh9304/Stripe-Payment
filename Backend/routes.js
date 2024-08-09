const express=require('express');
const { createCheckout } = require('./create_checkout');
const { stripeAddCustomer, stripeAttachPaymentMethod } = require('./customer_stripe');
const {  stripeOneOffCreatePrice, stripeGoldPlanCreatePrice, stripeSilverPlanCreatePrice } = require('./price_stripe');
const { stripeAddProduct } = require('./products_stripe');
const { stripeUserSubscription } = require('./subscription_stripe');
const { stripePaymentMethod } = require('./payment_method');

const router=express.Router();

router.post('/create-checkout-session',createCheckout)
router.post('/stripe-add-customer',stripeAddCustomer)
router.post('/stripe-create-product',stripeAddProduct)
router.post('/stripe-create-oneoff-price',stripeOneOffCreatePrice)
router.post('/stripe-user-subscription',stripeUserSubscription)
router.post('/stripe-payment-method-add',stripePaymentMethod)
router.post('/stripe-attach-payment-method',stripeAttachPaymentMethod)
router.post('/stripe-create-goldplan-price',stripeGoldPlanCreatePrice)
router.post('/stripe-create-silverplan-price',stripeSilverPlanCreatePrice)


module.exports=router