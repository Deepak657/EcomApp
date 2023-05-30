import React, { useState, useCallback } from "react";
import { IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./style.css";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useGSelector } from "../redux/store";

import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions/ProductAction";

type Base64DataType = string | ArrayBuffer | null;

interface Props {
  images: Base64DataType[];
  id: number;
}

const Image = ({ images, id }: Props) => {
  const dispatch = useDispatch();

  const loginUserName = useGSelector((state) => state.userState.loginUser);
  const loginPermission = useGSelector((state) => state.userState.permission);
  const navigate = useNavigate();
  const [imgIndex, setImgIndex] = useState<number>(0);

  const editProduct = (productId: number) => {
    navigate(`/create-product/${productId}`);
  };

  const handleDeleteProduct = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  const handleBack = useCallback(() => {
    if (imgIndex <= 0) {
      setImgIndex(images.length - 1);
    } else {
      setImgIndex((prev) => prev - 1);
    }
  }, [images, imgIndex]);

  const handleNext = useCallback(() => {
    if (imgIndex >= images.length - 1) {
      setImgIndex(0);
    } else {
      setImgIndex((prev) => prev + 1);
    }
  }, [images, imgIndex]);

  const handleProductinfo = (productId: number) => {
    navigate(`/productInfo/${productId}`);
  };
  return (
    <>
      <div className="img-container" onClick={() => handleProductinfo(id)}>
        <img src={images[imgIndex]} alt="" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={handleBack}>
          <ArrowCircleLeftIcon color="primary" />
        </IconButton>

        {loginUserName && loginPermission && (
          <>
            <IconButton onClick={() => editProduct(id)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => handleDeleteProduct(id)}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </>
        )}

        <IconButton onClick={handleNext}>
          <ArrowCircleRightIcon color="primary" />
        </IconButton>
      </div>
    </>
  );
};

export default Image;
