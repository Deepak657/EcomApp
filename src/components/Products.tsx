// import React, { useState } from "react";
import { useGSelector } from "../redux/store";

import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Image from "./Image";
// import Rating from "@mui/material/Rating";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import "./style.css";
import { useMemo } from "react";

const Products = () => {
  const products = useGSelector((state) => state.productState.products);
  const textSearch = useGSelector((state) => state.searchState.text);

  const { category } = useParams();
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (item) =>
          item.name.toLowerCase().includes(textSearch.toLowerCase()) ||
          textSearch.toLowerCase().includes(item.name.toLowerCase())
      )
      .filter((item) => {
        if (category?.toLowerCase() === "mobiles") {
          return item.productCategory === "mobiles";
        } else if (category?.toLowerCase() === "fashion") {
          return item.productCategory === "fashion";
        } else if (category?.toLowerCase() === "electronics") {
          return item.productCategory === "electronics";
        } else if (category?.toLowerCase() === "sweets") {
          return item.productCategory === "sweets";
        } else {
          return true;
        }
      });
  }, [products, textSearch, category]);

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "auto",
      }}
    >
      <Stack
        direction="row"
        display="flex"
        justifyContent="center"
        spacing={2}
        marginTop="10px"
        marginBottom="10px"
        flexWrap="wrap"
      >
        <Button variant="outlined" onClick={(e: any) => navigate(`/products`)}>
          all
        </Button>
        <Button
          variant="outlined"
          onClick={(e: any) => navigate(`/products/${e.target.innerText}`)}
        >
          mobiles
        </Button>
        <Button
          variant="outlined"
          onClick={(e: any) => navigate(`/products/${e.target.innerText}`)}
        >
          fashion
        </Button>
        <Button
          variant="outlined"
          onClick={(e: any) => navigate(`/products/${e.target.innerText}`)}
        >
          electronics
        </Button>
        <Button
          variant="outlined"
          onClick={(e: any) => navigate(`/products/${e.target.innerText}`)}
        >
          sweets
        </Button>
      </Stack>
      <div className="container">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <div className="img">
              <Image images={product.productImages} id={product.id} />
            </div>
            <h4 style={{ margin: 0 }}> {product.name}</h4>
            <p style={{ color: "red", marginTop: "6px" }}>
              <CurrencyRupeeIcon fontSize="inherit" />
              {product.price}.00
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
