async function retrievePaymentHistory() {
    const params = { limit: 10 };
    const query_params = new URLSearchParams(params); 

    const response = await fetch("/retrieve-payment-history?" + query_params, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await response.json();

//    displayProducts(data);
console.log(data);

}