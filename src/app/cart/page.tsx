import  getMyToken  from "@/utilities/token";
import React from "react";

const Cart = async () => {
  const token = await getMyToken();
  console.log(token);

  return <div>cart</div>;
};
export default Cart;
