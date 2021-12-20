import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
    //fancy firebase login shit
  };

  const register = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        // Successfully create login
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            className="login__email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            className="login__password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
