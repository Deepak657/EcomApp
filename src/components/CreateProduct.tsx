import React, { useState } from "react";
export interface IProduct {
  name: string;
  description: string | null;
  price: number;
  tax: number;
}

const CreateProduct : React.FC= () => {
  const [product, setProduct] = useState<IProduct>({
    name: "",
    description: "",
    price: 0,
    tax: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent):void => {
    e.preventDefault();
    const date = new Date();
    const time = date.getTime();
    const createItem = {
      id: time,
      name: product.name,
      description: product.description,
      price: product.price,
      tax: product.tax,
    };

    console.log(createItem);
    
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        {/* <input
          type="file"
          accept="image/*"
          name="img"
          onChange={handleChange}
        /> */}
        <input
          type="text"
          name="name"
          placeholder="name"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={product.description || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="price"
          value={product.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="tax"
          placeholder="tax"
          value={product.tax}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>
    </>
  );
};

export default CreateProduct;
