import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useParams } from "react-router-dom";

const PaypalCheckoutButton = () => {
  const { price } = useParams();
  console.log(price);

  //   const onSuccess = (payment: any) => {
  //     console.log("payment success", payment);
  //   };

  const onCancel = (data: any) => {
    console.log("payment cancle", data);
  };

  const onError = (error: any) => {
    console.log("payment error", error);
  };

  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AfIy5Mt8wOa0Nexy9GYvJ6Em8E1nEHkfhFzJt1-c97IKnSqMkfCZ06P4S6siHSpzEVwFrWSN4He9SoUd",
          currency: "USD",
        }}
      >
        <PayPalButtons onError={onError} onCancel={onCancel} />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalCheckoutButton;
