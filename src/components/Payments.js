import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51LrZBsSIt6wrS16c4Gqzf4MbNTuAu4pxLbccYtsv1Pv7AIInSveKdsoEyeSXkAUe1vXXXVMDazzTk4xGwPFWiKBG00bbQFozcW"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8001/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);

  useEffect(() => {
    const total = orders.reduce(
      (total, currentItem) => (total = total + currentItem.price),
      0
    );
    setTotal(total)
  }, [orders]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Bearer sk_test_51LrZBsSIt6wrS16cRp8xE39G8c4m9rQGU0FFk3D2GlGHStCBMhW1ouNr6WP4eA3Y1pyS2lVu0X0xfxnL3gsvKXS500wRD95XRl",
      },
      body: new URLSearchParams({
        amount: total,
        currency: "inr",
        // payment_method_types: ["card"],
        statement_descriptor: "Custom descriptor",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret);
      });
  }, [total]);


  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm order={orders} />
        </Elements>
      )}
    </div>
  );
}
