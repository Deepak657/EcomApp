import { product } from "../actionTypes/ProductType";
import { IProduct } from "../../components/CreateProduct";

export const createProduct = (item : IProduct) => {
  return {
    type: product.CREATE_PRODUCT,
    payload: item,
  };
};
export const selectProduct = (item : IProduct) => {
  return {
    type: product.SELECT_PRODUCT,
    payload: item,
  };
};

export const updateProduct = (item : IProduct) => {
  return {
    type: product.UPDATE_PRODUCT,
    payload: item,
  };
};
export const addCart = (item : IProduct) => {
  return {
    type: product.ADD_CART,
    payload: item,
  };
};

export const deleteProduct = (id : number) => {
  return {
    type: product.DELETE_PRODUCT,
    payload: id,
  };
};
// export const login = (user) => {
//   return {
//     type: product.LOG_IN,
//     payload: user,
//   };
// };
// export const logout = () => {
//   return {
//     type: product.LOG_OUT,
//   };
// };
// export const signUp = (user) => {
//   return {
//     type: product.SIGN_UP,
//     payload: user,
//   };
// };
