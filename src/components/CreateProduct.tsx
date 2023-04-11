import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../redux/actions/ProductAction";
import { useNavigate, useParams } from "react-router-dom";
import { useGSelector } from "../redux/store";
export interface IProduct {
  id: number;
  name: string;
  description: string | null;
  price: number;
  tax: number | null;
}

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  const product = useGSelector(state => state.productState.products.find(product => product.id === parseInt(id || '')));

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState<string | null>(null);
  const [price, setPrice] = useState(0);
  const [tax, setTax] = useState<number | null>(null);

  const saveProduct = () => {
    const product: IProduct = {
      id: new Date().getTime(),
      name: productName,
      description,
      price,
      tax
    };

    dispatch(createProduct(product));

    navigate('/products');
  };

  const handleUpdateProduct = () => {
    if (!product) {
      return;
    }
    // todo - create update action
    dispatch(updateProduct({
      ...product,
      name: productName,
      description,
      price,
      tax
    }));
  };

  return (
    <Grid container flexDirection="column" alignItems="left" item xs={12}>
      <TextField
        label="Product Name"
        value={productName}
        margin="normal"
        onChange={({ currentTarget }) => setProductName(currentTarget.value)}
      />

      <TextField
        label="Product Description"
        value={description || ''}
        margin="normal"
        onChange={({ currentTarget }) => setDescription(currentTarget.value)}
      />

      <TextField
        label="Product Price"
        value={price || ''}
        margin="normal"
        type="number"
        onChange={({ currentTarget }) => setPrice(parseFloat(currentTarget.value))}
      />

      <TextField
        label="Tax (in percentage)"
        value={tax || ''}
        margin="normal"
        onChange={({ currentTarget }) => setTax(parseFloat(currentTarget.value))}
      />

      <Button onClick={id ? handleUpdateProduct : saveProduct}>{id ? 'Update' : 'Create'} Product</Button>
    </Grid>
  );
};

export default CreateProduct;
