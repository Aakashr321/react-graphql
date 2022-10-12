import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqloperations/mutations";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  //This method onComplete is available to fire after request is made or function is called
  const [signinUser, { loading, error, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      navigate("/");
    },
  });
  // const [signinUser, { loading, error, data }] = useMutation(LOGIN_USER);
  if (loading) return <h1>...Loading</h1>;

  // if (data) {
  //   localStorage.setItem("token", data.user.token);
  //   navigate("/");
  // }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
  };

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message} </div>}
      <h5>Login !!</h5>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          name="email"
          required
          // value={email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          required
          // value={password}
          onChange={handleChange}
        />
        <Link to="/signup">
          <p>Don't have an account ? </p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
