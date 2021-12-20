import React from "react";
import Subtotal from "./Subtotal.js";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct.js";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonDevices/PSWDec/ILM_Below._CB650898267_.jpg"
          alt=""
        />
        <div className="checkout__products">
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          <FlipMove>
            {basket.map((item) => {
              return (
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  rating={item.rating}
                  price={item.price}
                  image={item.image}
                  hide={false}
                />
              );
            })}
          </FlipMove>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
