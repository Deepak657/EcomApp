import React, { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useGSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { addToCart, itemCount } from "../redux/actions/ProductAction";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./style.css";

type Base64DataType = string | ArrayBuffer | null;

export interface cartProps {
  quantity: number | undefined;
  id?: number | undefined;
  name?: string | undefined;
  description?: string | null | undefined;
  price?: number | undefined;
  tax?: number | null | undefined;
  productImages?: Base64DataType[] | undefined;
  productCategory?: string | undefined;
}

const ProductInfo = () => {
  const { id } = useParams<"id">();

  const dispatch = useDispatch();
  const product = useGSelector((state) =>
    state.productState.products.find((item) => item.id === parseInt(id || ""))
  );
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [quantityState, setQyantityState] = useState<number | undefined>(
    product?.quantity
  );

  const loginUserName = useGSelector((state) => state.userState.loginUser);
  const loginPermission = useGSelector((state) => state.userState.permission);

  const result = useGSelector((state) =>
    state.userState.userDetails
      .find(
        (item) =>
          item.userName === loginUserName && item.admin === loginPermission
      )
      ?.carts.find((item) => item.id === parseInt(id || ""))
  );
  const updatedProduct = useMemo(() => {
    return {
      ...product,
      quantity: quantityState,
    };
  }, [product, quantityState]);

  const handleRemoveItem = useCallback(() => {
    if (!updatedProduct.quantity) {
      return;
    }

    if (updatedProduct.quantity > 1) {
      setQyantityState((prev) => {
        if (!prev) {
          return;
        } else {
          return prev - 1;
        }
      });
    } else {
      return;
    }
  }, [updatedProduct]);

  const handleAddCart = (product: cartProps) => {
    if (!result) {
      dispatch(addToCart(product));
    } else if (!product || !result?.quantity || !product.quantity) {
      return;
    } else {
      dispatch(
        itemCount({
          ...product,
          quantity: result.quantity + product.quantity,
        })
      );
    }
  };
  const handleImageChange = (index: number) => {
    setImgIndex(index);
  };

  return (
    <>
      {updatedProduct && updatedProduct.productImages && (
        <>
          <div className="product">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="filterImg">
                {updatedProduct.productImages.map((img, index) => (
                  <img
                    src={img}
                    key={index}
                    alt=""
                    width="40"
                    height="60"
                    onClick={() => handleImageChange(index)}
                  />
                ))}
              </div>
              <div className="item1">
                <img
                  src={updatedProduct.productImages[imgIndex]}
                  alt=""
                  width="300"
                  height="400"
                />
              </div>
            </div>
            <div className="item2">
              <h4>
                <b>
                  NAME:{" "}
                  <span style={{ fontWeight: "450" }}>
                    {updatedProduct.name}
                  </span>
                </b>
              </h4>
              <h4>
                CATEGORY:{" "}
                <span style={{ fontWeight: "450" }}>
                  {updatedProduct.productCategory}
                </span>
              </h4>
              <h4>
                DESCRIPTION:{" "}
                <span style={{ fontWeight: "450" }}>
                  {updatedProduct.description}
                </span>
              </h4>

              <h4>
                PRICE:{" "}
                <span style={{ fontWeight: "450" }}>
                  {updatedProduct.price} Rs.
                </span>
              </h4>
              <h4>
                TAX:{" "}
                <span style={{ fontWeight: "450" }}>
                  {updatedProduct.tax} %
                </span>
              </h4>
              {loginUserName && !loginPermission && (
                <>
                  <Stack direction="row" spacing={2} marginBottom="10px">
                    <IconButton onClick={handleRemoveItem}>
                      <RemoveIcon />
                    </IconButton>
                    <h2>{updatedProduct.quantity}</h2>
                    <IconButton
                      onClick={() =>
                        setQyantityState((prev) => {
                          if (!prev) {
                            return;
                          } else {
                            return prev + 1;
                          }
                        })
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={() => handleAddCart(updatedProduct)}
                    >
                      Add to Cart
                    </Button>
                    <Button color="warning" variant="contained">
                      Buy now
                    </Button>
                  </Stack>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductInfo;
