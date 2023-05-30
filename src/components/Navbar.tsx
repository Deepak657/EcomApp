import React, { useState, useMemo } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useGSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { searchPorduct } from "../redux/actions/ProductAction";
import { loginUser } from "../redux/actions/ProductAction";
import { IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import "./style.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");

  const loginUserName = useGSelector((state) => state.userState.loginUser);
  const loginPermission = useGSelector((state) => state.userState.permission);
  const cartsList = useGSelector(
    (state) =>
      state.userState.userDetails.find(
        (user) => user.userName === loginUserName
      )?.carts
  );
  const totalCartItem = useMemo(() => {
    if (!cartsList || cartsList.length === 0) {
      return;
    }
    return cartsList
      .map((product) => product.quantity)
      .reduce((sum, current) => {
        if (!sum || !current) {
          return undefined;
        } else {
          return sum + current;
        }
      });
  }, [cartsList]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    dispatch(searchPorduct(e.target.value));
  };
  return (
    <nav className="navbar">
      <div>
        {!loginUserName && !loginPermission && (
          <NavLink to="/products"> PRODUCTS</NavLink>
        )}
        {loginUserName && !loginPermission && (
          <NavLink to="/products"> PRODUCTS</NavLink>
        )}
        {loginUserName && loginPermission && (
          <>
            <NavLink to="/products"> PRODUCTS</NavLink>
            <NavLink to="/users"> USERS</NavLink>
            <NavLink to="/"> ADD PRODUCTS</NavLink>
          </>
        )}
      </div>
      <h1 style={{ fontStyle: "italic", color: "yellow" }}>Flipkart</h1>

      <div>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          value={searchText}
          onChange={handleSearch}
        />
        {loginUserName && !loginPermission && (
          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={totalCartItem} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        )}

        {!loginUserName ? (
          <NavLink to="/signIn"> LOGIN</NavLink>
        ) : (
          <>
            <button
              style={{
                border: "none",
                color: "white",
                background: "inherit",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onClick={() => {
                dispatch(loginUser({ username: "", permission: false }));
                navigate("/signIn");
              }}
            >
              LOGOUT
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
