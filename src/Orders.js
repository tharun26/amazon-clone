import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import {
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      console.log("hi2");
      const usersCollectionRef = collection(db, "users/");
      const userDocumentRef = doc(usersCollectionRef, user?.uid + "/");
      const ordersCollectionRef = collection(userDocumentRef, "orders/");
      const q = query(ordersCollectionRef, orderBy("created", "desc"));
      onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });
    } else {
      console.log("Hi1");
      setOrders([]);
    }
  }, []);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {console.log(orders)}
        {orders?.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
