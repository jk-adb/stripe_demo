const router = require("express").Router();

const { resolve } = require('path');

require('dotenv').config({ path: './.env' });

checkEnv();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/*
var nedb = require('nedb');
var db = {};
db.products = new nedb({
    filename: 'data/products.db'
});
db.products.loadDatabase();

router.get('/', function(request, response){
    db.products.find({}, function (error, result){
        if(error){
            console.log("error");
            return;
        }
        let products = {}; 
        for (let i=0; i<result.length; i++){
            products[i] = result[i]
            console.log(products[i]);
        }
        response.render('./store/index', { products: products, len: result.length});
    });
});
*/

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

function checkEnv() {
    const price = process.env.PRICE;
    if(price === "price_12345" || !price) {
      console.log("You must set a Price ID in the environment variables. Please see the README.");
      process.exit(0);
    }
  }
/*
  router.get('/s_credentials.js', function(request, response){
    response.write("const stripe = Stripe(" + STRIPE_PUBLISHABLE_KEY +");");
  });
*/  
module.exports = router;