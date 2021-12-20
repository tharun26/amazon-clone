import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState();
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState();
  const [clientSecret, setClientSecret] = useState(true);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // const usersCollectionRef = collection(db, "users");
        // const userDocumentRef = doc(usersCollectionRef, user?.id);
        // const ordersCollectionRef = collection(userDocumentRef, "orders");

        // setDoc(
        //   doc(
        //     usersCollectionRef,
        //     user?.id,
        //     "users",
        //     "orders",
        //     paymentIntent.id
        //   ),
        //   {
        //     basket: basket,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.created,
        //   }
        // );
        const usersCollectionRef = collection(db, "users/");
        const userDocumentRef = doc(usersCollectionRef, user?.uid + "/");
        const ordersCollectionRef = collection(userDocumentRef, "orders/");
        const paymentIntentRef = doc(
          ordersCollectionRef,
          paymentIntent.id + "/"
        );
        setDoc(paymentIntentRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        // setDoc(doc(usersCollectionRef, paymentIntent.id), {
        //   basket: basket,
        //   amount: paymentIntent.amount,
        //   created: paymentIntent.created,
        // });
        // db.collection("users")
        //   .doc(user?.id)
        //   .collection("orders")
        //   .doc(paymentIntent.id)
        //   .set({
        //     basket: basket,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.created,
        //   });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  useEffect(() => {
    //generate stripe secret from
    const getClientSecret = async () => {
      console.log("sending post");
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("SECRET,", clientSecret);

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/*Payment section */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p> 123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/*Payment section */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => {
              return (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>

        {/*Payment section */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandsSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
