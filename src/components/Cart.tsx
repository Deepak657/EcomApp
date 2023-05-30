import React, { useCallback, useMemo } from "react";
import Button from "@mui/material/Button";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useGSelector } from "../redux/store";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { deleteToCart, itemCount } from "../redux/actions/ProductAction";
import { cartProps } from "./ProductInfo";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const loginUser = useGSelector((state) => state.userState.loginUser);
  const loginPermission = useGSelector((state) => state.userState.permission);
  const navigate = useNavigate();

  const carts = useGSelector(
    (state) =>
      state.userState.userDetails.find(
        (user) => user.userName === loginUser && user.admin === loginPermission
      )?.carts
  );
  const cartSearch = useGSelector((state) => state.searchState.text);

  const totalCartItem = useMemo(() => {
    if (!carts || carts.length === 0) {
      return;
    }
    return carts
      .map((product) => product.quantity)
      .reduce((sum, current) => {
        if (!sum || !current) {
          return undefined;
        } else {
          return sum + current;
        }
      });
  }, [carts]);

  const subTotal = useMemo(() => {
    if (!carts || carts.length === 0) {
      return;
    }
    return carts
      .map((product) => {
        if (!product.quantity || !product.price) {
          return undefined;
        } else {
          return product.quantity * product.price;
        }
      })
      .reduce((sum, current) => {
        if (!sum || !current) {
          return undefined;
        } else {
          return sum + current;
        }
      });
  }, [carts]);
  const Tax = useMemo(() => {
    if (!carts || carts.length === 0) {
      return;
    }
    return carts
      .map((product) => {
        if (!product.quantity || !product.price || !product.tax) {
          return undefined;
        } else {
          return product.quantity * product.price * 10 * 0.01;
        }
      })
      .reduce((sum, current) => {
        if (!sum || !current) {
          return undefined;
        } else {
          return sum + current;
        }
      });
  }, [carts]);
  console.log(Tax);

  const dispatch = useDispatch();
  const handleDeleteCart = (productId: number | undefined) => {
    if (!productId) {
      return;
    }
    dispatch(deleteToCart(productId));
  };

  const handleRemoveItem = (product: cartProps) => {
    if (!product.quantity || !product.id) {
      return;
    }
    if (product.quantity > 1) {
      dispatch(
        itemCount({
          ...product,
          quantity: product?.quantity - 1,
        })
      );
    } else {
      dispatch(deleteToCart(product.id));
    }
  };

  const handleAddItem = (product: cartProps) => {
    if (!product.quantity) {
      return;
    }
    dispatch(
      itemCount({
        ...product,
        quantity: product?.quantity + 1,
      })
    );
  };

  const handleBuy = useCallback(() => {
    navigate(`/paypalCheckOutButton/${subTotal}`);
  }, [subTotal, navigate]);
  const filteredCart = useMemo(() => {
    if (!carts) {
      return;
    }
    return carts.filter((item) => {
      if (!item.name) {
        return undefined;
      } else {
        return (
          item.name.toLowerCase().includes(cartSearch.toLowerCase()) ||
          cartSearch.toLowerCase().includes(item.name.toLowerCase())
        );
      }
    });
  }, [carts, cartSearch]);

  return (
    <div className="cart-container">
      <div className="leftCart">
        {filteredCart &&
          filteredCart.map((product) => (
            <div className="cart" key={product.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                {product.productImages && (
                  <img
                    src={product.productImages[0]}
                    alt=""
                    width="100"
                    height="80"
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => navigate(`/productInfo/${product.id}`)}
                  />
                )}
                <div style={{ margin: "0" }}>
                  <IconButton onClick={() => handleRemoveItem(product)}>
                    <RemoveIcon />
                  </IconButton>
                  {product.quantity}
                  <IconButton onClick={() => handleAddItem(product)}>
                    <AddIcon />
                  </IconButton>
                </div>

                <h4 style={{ margin: "0" }}>{product.name}</h4>
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span>
                  <CurrencyRupeeIcon fontSize="inherit" />
                  {product.price}.00
                </span>
                <IconButton onClick={() => handleDeleteCart(product.id)}>
                  <DeleteForeverIcon color="error" />
                </IconButton>
              </div>
            </div>
          ))}
      </div>

      <div className="payment">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            paddingBottom: "15px",

            borderBottom: "1px solid #e4e7ed",
          }}
        >
          <span>PRICE DETAILS</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <p>
            Price ( <span>{totalCartItem}</span> items )
          </p>
          <span style={{ fontWeight: "400" }}>
            <CurrencyRupeeIcon fontSize="inherit" />
            {subTotal}.00
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <p>Tax </p>

          <span style={{ fontWeight: "400", color: "green" }}>
            <CurrencyRupeeIcon fontSize="inherit" />
            {Tax}.00
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: "1px solid #e4e7ed",
          }}
        >
          <p>Delivery Charges</p>
          <span style={{ color: "green" }}>Free</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <h4>Total Amount </h4>
          <span style={{ fontWeight: "400" }}>
            <CurrencyRupeeIcon fontSize="inherit" />
            {subTotal && Tax && subTotal + Tax}.00
          </span>
        </div>
        <span>
          <Button color="warning" variant="contained" onClick={handleBuy}>
            proceed to buy
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Cart;
