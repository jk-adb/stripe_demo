const router = require("express").Router();

const { resolve } = require('path');

require('dotenv').config({ path: './.env' });

checkEnv();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/', function(request, response){
  response.render('./store/index');
});

router.get('/products', async function(request, response) {
  const products = await stripe.products.list({
    limit: 10,
  });
  console.log(products);
  return response.json(products);
});

router.get('/productprice', async function(request, response) {
  const priceid = request.query.priceid;
  console.log(priceid);
  const price = await stripe.prices.retrieve(
    priceid,
  );
  console.log(price);
  return await response.json(price);
});

router.get('/cart', function(request, response){
    response.render('store/cart');
});

router.get('/checkout', function(request, response){
    response.render('store/checkout');
});

router.post('/create-payment-intent', async (request, response) => {
  const { items } = request.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "jpy",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  response.send({
    clientSecret: paymentIntent.client_secret,
  });
  console.log(paymentIntent.client_secret);
});

router.get('/complete-payment', async (request, response) => {
  response.render('store/complete-payment');
});

// Fetch the Checkout Session to display the JSON result on the success page
router.get('/checkout-session', async (request, response) => {
  const { sessionId } = request.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  response.send(session);
});

const calculateOrderAmount = (items) => {

  let _items = JSON.parse(items);

  var total_amount = 0;
  if(_items != null){
    for (let i=0; i<_items.length; i++){
      console.log(_items[i].item_id);
      total_amount = parseInt(total_amount) + parseInt(_items[i].item_price);
      console.log(total_amount);
    }  
  }

  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return parseInt(total_amount);
};

router.get('/s_config.js', async (reqyest, response) => {
  response.send("const stripe = Stripe('" + process.env.STRIPE_PUBLISHABLE_KEY +"');");
});

function checkEnv() {
  const pub_key = dotenv.STRIPE_PUBLISHABLE_KEY;
  const secret_key = dotenv.STRIPE_SECRET_KEY;
  if(pub_key || secret_key) {
      console.log("You must set STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY in the environment variables. Please see the README.");
      process.exit(0);
    }  }

    /*
  router.get('/s_credentials.js', function(request, response){
  });

  app.get('/config', async (req, res) => {
  const price = await stripe.prices.retrieve(process.env.PRICE);

  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency,
  });
});
*/  
module.exports = router;