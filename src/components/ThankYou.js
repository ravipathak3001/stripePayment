import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ThankYou(props) {
    const { success, orders } = useParams();
    console.log(success);
    console.log(orders, "thankyou");
  return (
    <>
      <div class="alert alert-success" role="alert">
        Payment was Successfull, Thank you for your order.
      </div>
      <div>Thank You</div>
    </>
  );
}
