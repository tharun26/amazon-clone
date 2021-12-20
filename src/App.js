import "./App.css";
import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./Checkout.js";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51K7zuLSBMQwtPmTQ7PpTbGvangNV2YIgm6v9v1aRxatpOBodn7XVc1NDa5DlXJS1NctnHuD3JBkvgYz0PLuJF9pR005vt2FQdQ"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log("This user is >>>>", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout></Checkout>
              </>
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
