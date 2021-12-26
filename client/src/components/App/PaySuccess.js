import React from "react";
import { Link } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../utils/storage";

const PaySuccess = () => {
  const obj = getFromStorage("jewelry_app");
  if (obj) {
    const orderId = obj.orderId;
    const payerId = obj.payerId;
    const updateOrderUrl =
      "/api/order/" + orderId + "/pay";

    fetch(updateOrderUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        payerId: payerId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage("jewelry_app", {});
        }
      });
  }

  return (
    <div className="mt-5 pt-5 text-center">
      <div className="section_title mt-5 pt-5">Payment Received!</div>
      <h2 className="test_text">
        Your order is placed! Thank you for shopping with us.
      </h2>
      <Link to="/">Click to go home</Link>
    </div>
  );
};

export default PaySuccess;
