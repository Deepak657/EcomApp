import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../redux/actions/ProductAction";
import { useGSelector } from "../redux/store";
import { cartProps } from "./ProductInfo";
import "./style.css";

export interface IUser {
  userId: number;
  userName: string;
  emailAddress: string;
  password: string;
  carts: cartProps[];
  admin: boolean;
}

export default function SignUp() {
  const [userName, setUserName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const { userId } = useParams<"userId">();
  const navigate = useNavigate();
  const User = useGSelector((state) =>
    state.userState.userDetails.find(
      (user) => user.userId === parseInt(userId || "")
    )
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      userName.trim() === "" ||
      emailAddress.trim() === "" ||
      password.trim() === ""
    ) {
      return;
    }
    dispatch(
      createUser({
        userId: new Date().getTime(),
        userName,
        emailAddress,
        password,
        carts: [],
        admin: false,
      })
    );
    setUserName("");
    setEmailAddress("");
    setPassword("");
    navigate("/signIn");
  };
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!User) {
      return;
    }
    dispatch(
      updateUser({
        ...User,
        userName,
        emailAddress,
        password,
      })
    );
    navigate("/users");
  };
  useEffect(() => {
    if (!User) {
      return;
    }
    setUserName(User.userName);
    setEmailAddress(User.emailAddress);
    setPassword(User.password);
  }, [User]);

  return (
    <form
      onSubmit={userId ? handleUpdate : handleSubmit}
      className="formContainer"
    >
      <label htmlFor="uname">User Name</label>
      <input
        type="text"
        value={userName}
        onChange={({ currentTarget }) => setUserName(currentTarget.value)}
        autoFocus
        required
      />
      <label htmlFor="email">Email id</label>
      <input
        type="text"
        value={emailAddress}
        onChange={({ currentTarget }) => setEmailAddress(currentTarget.value)}
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
        {!userId ? "signUp" : "UpdateUser"}
      </button>
      {!userId && (
        <Link to="/signIn">{"Already have an account? Sign In"}</Link>
      )}
    </form>
  );
}
