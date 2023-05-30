import { Button, Grid, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./style.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../redux/actions/ProductAction";
import { useNavigate, useParams } from "react-router-dom";
import { useGSelector } from "../redux/store";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Stack from "@mui/material/Stack";

type Base64DataType = string | ArrayBuffer | null;

export interface IProduct {
  id: number;
  name: string;
  description: string | null;
  price: number;
  tax: number | null;
  productImages: Base64DataType[];
  productCategory: string;
  quantity: number;
}

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams<"id">();

  const product = useGSelector((state) =>
    state.productState.products.find(
      (product) => product.id === parseInt(id || "")
    )
  );
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [productImages, setProductImages] = useState<Base64DataType[]>([]);
  const [productName, setProductName] = useState("");
  const [productCategory, setProdutCategory] = useState("");

  const [description, setDescription] = useState<string | null>(null);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState<number | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      fetch(URL.createObjectURL(e.target.files?.[i]))
        .then((res) => res.blob())
        .then((blob) => {
          const fr = new FileReader();
          fr.readAsDataURL(blob);
          fr.addEventListener("load", () => {
            //console.log(fr.result);
            setProductImages((prev) => [...prev, fr.result]);
          });
        });
    }
  };
  const saveProduct = () => {
    if (
      productName.trim() === "" ||
      description?.trim() === "" ||
      productCategory.trim() === "" ||
      productImages.length === 0 ||
      price <= 0 ||
      tax === null
    ) {
      return;
    }
    const product: IProduct = {
      id: new Date().getTime(),
      name: productName,
      description,
      price,
      tax,
      productImages,
      productCategory,
      quantity: 1,
    };

    dispatch(createProduct(product));
    navigate("/products");
  };
  const handleUpdateProduct = () => {
    if (!product) {
      return;
    }
    // todo - create update action
    dispatch(
      updateProduct({
        ...product,
        name: productName,
        description,
        price,
        tax,
        productImages,
        productCategory,
      })
    );
    navigate("/products");
  };
  useEffect(() => {
    if (!product) {
      return;
    }
    setProductName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setTax(product.tax);
    setProductImages(product.productImages);
    setProdutCategory(product.productCategory);
  }, [product]);

  const handleDeleteImage = (i: number) => {
    setProductImages(productImages.filter((item, index) => index !== i));
  };
  const handleIndexChange = (index: number) => {
    setImgIndex(index);
  };
  return (
    <>
      <Grid
        container
        flexDirection="row"
        xs={12}
        item
        display="flex"
        justifyContent="space-evenly"
      >
        <Stack alignItems="center">
          <TextField
            label="Product Name"
            value={productName}
            margin="normal"
            required
            sx={{ width: "280px" }}
            focused
            onChange={({ currentTarget }) =>
              setProductName(currentTarget.value)
            }
          />

          <TextField
            required
            label="Product Description"
            value={description || ""}
            sx={{ width: "280px" }}
            margin="normal"
            onChange={({ currentTarget }) =>
              setDescription(currentTarget.value)
            }
          />

          <TextField
            required
            label="Product Price"
            value={price || ""}
            margin="normal"
            sx={{ width: "280px" }}
            type="number"
            onChange={({ currentTarget }) =>
              setPrice(parseFloat(currentTarget.value))
            }
          />

          <TextField
            required
            label="Tax (in percentage)"
            value={tax || ""}
            margin="normal"
            sx={{ width: "280px" }}
            onChange={({ currentTarget }) =>
              setTax(parseFloat(currentTarget.value))
            }
          />
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productCategory}
            label="Category"
            onChange={(e) => setProdutCategory(e.target.value)}
          >
            <MenuItem value="mobiles">mobiles</MenuItem>
            <MenuItem value="fashion">fashion</MenuItem>
            <MenuItem value="electronics">electronics</MenuItem>
            <MenuItem value="sweets">sweets</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" alignItems="center">
          <IconButton component="label">
            <AddToPhotosIcon color="primary" />

            <input
              required
              accept="image/*"
              hidden
              multiple
              type="file"
              onChange={handleImageChange}
            />
          </IconButton>
          <div className="filterImg">
            {productImages.map((img, index) => (
              <img
                src={img}
                key={index}
                alt=""
                width="40"
                height="60"
                onClick={() => handleIndexChange(index)}
              />
            ))}
          </div>
          <div className="productImgWrapper">
            {productImages.length > 0 && (
              <img
                src={productImages[imgIndex]}
                alt=""
                width="250"
                height="300"
              />
            )}
          </div>
          <div>
            <IconButton onClick={() => handleDeleteImage(imgIndex)}>
              <DeleteForeverIcon />
            </IconButton>
          </div>
        </Stack>
      </Grid>
      <Button
        onClick={id ? handleUpdateProduct : saveProduct}
        variant="contained"
      >
        {id ? "Update" : "Create"} Product
      </Button>
    </>
  );
};

export default CreateProduct;
