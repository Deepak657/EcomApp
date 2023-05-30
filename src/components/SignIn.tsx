import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/ProductAction";
import "./style.css";

export interface ILogin {
  username: string | undefined;
  permission: boolean | undefined;
}

export default function SignIn() {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Admin = useGSelector((state) => {
    if (
      state.userState.emailAddress === emailAddress &&
      state.userState.password === password &&
      state.userState.admin === true
    ) {
      return {
        username: state.userState.userName,
        permission: state.userState.admin,
      };
    }
  });

  const user = useGSelector((state) =>
    state.userState.userDetails.find(
      (user) => user.emailAddress === emailAddress && user.password === password
    )
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailAddress.trim() === "" || password.trim() === "") {
      return;
    }
    const userLoginData = {
      username: user?.userName,
      permission: user?.admin,
    };
    if (!Admin) {
      if (!user) {
        return;
      }
      setEmailAddress("");
      setPassword("");
      dispatch(loginUser(userLoginData));
      navigate("/products");
      return;
    }
    dispatch(loginUser(Admin));
    setEmailAddress("");
    setPassword("");
    navigate("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <label htmlFor="email">Email id</label>
      <input
        type="text"
        value={emailAddress}
        onChange={({ currentTarget }) => setEmailAddress(currentTarget.value)}
        autoFocus
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={password}
        onChange={({ currentTarget }) => setPassword(currentTarget.value)}
        required
      />
      <button type="submit" className="btn">
        Login
      </button>
      <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
    </form>
  );
}
