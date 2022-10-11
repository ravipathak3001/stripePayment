import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Products from "./Products";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [orders, setOrders] = useState(props.order);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment(
        {
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/thankyou",
      },
      
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <Products orders={orders} />
        </div>
        <div className="col-6">
          <div className="col align-self-center">
            <h2 style={{ textAlign: "center" }}>Shipping & Payment</h2>
          </div>
          <div className="row">
            <div className="col align-self-center">
              <form id="payment-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="shipping" className="form-label">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shipping"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.value);
                    }}
                  />
                </div>

                <PaymentElement id="payment-element" />
                <br />
                <button
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                  className="btn btn-primary"
                >
                  <span id="button-text">
                    {isLoading ? (
                      <div className="spinner" id="spinner"></div>
                    ) : (
                      "Pay now"
                    )}
                  </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
