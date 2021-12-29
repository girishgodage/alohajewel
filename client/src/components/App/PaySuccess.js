import React from "react";
import { Link } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../utils/storage";
import { ProductContext } from "../../context";

const PaySuccess = () => {
  const obj = getFromStorage("jewelry_app");
  if (obj) {
    const orderId = obj.orderId;
    const payerId = obj.payerId;
    const updateOrderUrl = "/api/order/" + orderId + "/pay";

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
    <ProductContext>
      {(value) => {
        const myobj = getFromStorage("jewelry_app");
        if (myobj) {
          const orderId = myobj.orderId;
          const sendMailtoCustomer = value.sendMailtoCustomer;
          const subject = "Thanks for payment of your Order no - " + orderId;
          const message =
            "Thank you for payment of your Order no -" +
            orderId +
            ". Your order will be in process." +
            `<br/>` +
            "Thank you for shopping with us";
          sendMailtoCustomer(subject, message);
        }
        return (
          <div className="mt-5 pt-5 text-center">
            <div className="section_title mt-5 pt-5">Payment Received!</div>
            <h2 className="test_text">
              Your order is placed! Thank you for shopping with us.
            </h2>
            <Link to="/home">Click to go home</Link>
          </div>
        );
      }}
    </ProductContext>
  );
};

export default PaySuccess;
