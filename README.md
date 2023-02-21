# Getting started with demo application

## How to run locally
### 1. Prerequirement
- Make sure you have Node.js v18.14.1 installed locally.
```
$ node -v
```

### 2. Clone and configure the demo
```
## Clone from git repository
$ git clone https://github.com/jk-adb/stripe_demo.git
$ cd stripe_demo

## Add your stripe api keys to config file
$ echo STRIPE_PUBLISHABLE_KEY="INPUT YOUR STRIPE PUBLISH KEY" >> .env
$ echo STRIPE_SECRET_KEY="INPUT YOUR STRIPE SECRET KEY" >> .env

## Run demo application
$ npm install
$ npm start
```

### 3. Create product data from Stripe dashboard
- Choose JPY in price currency option.


### 4. Visit the demo store
- http://localhost:3000
<img width="1127" alt="image" src="https://user-images.githubusercontent.com/51877498/220267931-5f5b8e63-1554-4a9e-80e0-7632985c5617.png">![画面収録_2023-02-21_17_47_20_AdobeExpress](https://user-images.githubusercontent.com/51877498/220298163-66663c4b-e845-49ac-8add-ee1adeded4bd.gif)
![画面収録_2023-02-21_17_47_20_AdobeExpress](https://user-images.githubusercontent.com/51877498/220298163-66663c4b-e845-49ac-8add-ee1adeded4bd.gif)

![画面収録_2023-02-21_17_47_20_AdobeExpress](https://user-images.githubusercontent.com/51877498/220297901-0208af79-b7c5-42d7-ae1c-d727bb0f9857.gif)


## Notes
- Product items are fetched from Stripe.
- Cart object is store in client's local storage.
