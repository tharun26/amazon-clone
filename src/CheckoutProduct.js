import { React, forwardRef } from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = forwardRef(
  ({ id, image, title, rating, price, hide }, ref) => {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    };

    return (
      <div ref={ref} className="checkoutProduct">
        <div className="checkoutProduct__left-section">
          <img src={image}></img>
        </div>
        <div className="checkoutProduct__right-section">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>$</small>
            <stong>{price}</stong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>⭐</p>
              ))}
          </div>
          {!hide && (
            <button onClick={removeFromBasket}>Remove from basket</button>
          )}
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
