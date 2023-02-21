# Getting started with demo application

## How to run locally
### 1. Prerequirement
- Make sure you have Node.js v18.14.1 installed locally.

### 2. Clone and configure the demo
```
## Clone from git repository
$ git clone https://github.com/jk-adb/stripe_demo.git
$ mv stripe_demo

## Add your stripe api keys to config file
$ echo STRIPE_PUBLISHABLE_KEY=<INPUT YOUR STRIPE PUBLISH KEY> >> .env
$ echo STRIPE_SECRET_KEY=<INPUT YOUR STRIPE SECRET KEY> >> .env

## Run demo application
$ npm install
$ npm start
```

### 3. Create product data from Stripe dashboard
- Choose JPY in price currency option.


### 4. Visit the demo store
- http://localhost:3000


## Notes
cart object is store in client's local storage

