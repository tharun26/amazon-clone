import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct.js";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => {
        return (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            rating={item.rating}
            price={item.price}
            image={item.image}
            hide={true}
          />
        );
      })}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Total ({order.data.basket.length} items): <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandsSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
