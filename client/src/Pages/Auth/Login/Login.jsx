import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Link, useHistory } from "react-router-dom";

import "./Login.css";
import { useAuth } from "../../../context/AuthContext";

import axios from "axios";

const Login = () => {
  const { login, loginWithGoogle, resetPass } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();

  // const handleRedirect = async () => {
  //   const check = await JSON.parse(localStorage.getItem("usuario"));
  //   if (check) {
  //     history.push("/profile");
  //   }
  // };
  // useEffect(() => {
  //   handleRedirect();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const credentials = await login(user.email, user.password);

      const userInDb = await axios.post(`http://localhost:3001/auth/login`, {
        id: credentials.user.uid,
        name: credentials.user.displayName,
        email: credentials.user.email,
        image: credentials.user.photoURL,
      });
      if (userInDb.data[0].banned) return alert("Baneado lince");
      if (credentials.user.uid) {
        localStorage.setItem("usuario", JSON.stringify(credentials.user.uid));
      }

      history.push("/profile");
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/weak-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Invalid credentials");
      } else setError(error.message);
    }
  }; //auth/invalid-email auth/weak-password

  const handleGoogle = async () => {
    try {
      const credentials = await loginWithGoogle();

      const userInDb = await axios.post(`http://localhost:3001/auth/login`, {
        id: credentials.user.uid,
        name: credentials.user.displayName,
        email: credentials.user.email,
        image: credentials.user.photoURL,
      });
      if (userInDb.data[0].banned) return alert("Baneado lince");
      if (credentials.user.uid) {
        localStorage.setItem("usuario", JSON.stringify(credentials.user.uid));
      }

      history.push("/profile");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleResetPass = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset your Password");
    try {
      await resetPass(user.email);
      alert("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <section id="login-window">
        <h1>LOGIN</h1>
        <p className="error" id="username-error">
          {error && <span className="error"> {error} </span>}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="form-input"
            type="password"
            placeholder="********"
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button className="login-btn" type="submit">
            {" "}
            Login
          </button>
        </form>

        <div className="social">
          <button onClick={handleGoogle}>
            <i className="fa fa-google">
              <FcGoogle />
            </i>{" "}
            Google
          </button>
        </div>

        <p className="form-footer">
          <a href="#!" onClick={handleResetPass}>
            Forgot Password?
          </a>
          <br />
          Not a member ? <Link to="/register"> Sign Up</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
