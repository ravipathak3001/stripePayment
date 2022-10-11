import logo from "./logo.svg";
import "./App.css";
// import { Routes, Route, Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";
import Products from "./components/Products";
import Payment from "./components/Payments";
import ThankYou from "./components/ThankYou";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51LrZBsSIt6wrS16c4Gqzf4MbNTuAu4pxLbccYtsv1Pv7AIInSveKdsoEyeSXkAUe1vXXXVMDazzTk4xGwPFWiKBG00bbQFozcW"
);

function App() {
  // const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("https://api.stripe.com/v1/payment_intents", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization:
  //         "Bearer sk_test_51LrZBsSIt6wrS16cRp8xE39G8c4m9rQGU0FFk3D2GlGHStCBMhW1ouNr6WP4eA3Y1pyS2lVu0X0xfxnL3gsvKXS500wRD95XRl",
  //     },
  //     body: new URLSearchParams({
  //       amount: 1099,
  //       currency: "inr",
  //       // payment_method_types: ["card"],
  //       statement_descriptor: "Custom descriptor",
  //     }),
  //     // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.client_secret, "clientSecreate >>>>567");
  //       setClientSecret(data.client_secret)});
  // }, []);

  // console.log(clientSecret, "clientSecrete >>>>>>>.");

  // const appearance = {
  //   theme: "stripe",
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  return (
    // <div className="App">
    //   {clientSecret && (
    //     <Elements options={options} stripe={stripePromise}>
    //       <CheckoutForm />
    //     </Elements>
    //   )}
    // </div>

    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Cart />}/> */}
        <Route path="/" element={<Products />}></Route>
        <Route path="/payments" element={<Payment />}></Route>
        <Route path="/thankyou" element={<ThankYou />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
