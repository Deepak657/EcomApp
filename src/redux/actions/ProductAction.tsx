import { product } from "../actionTypes/ProductType";
import { IProduct } from "../../components/CreateProduct";


export const CREATE_PRODUCT = 'CREATE_PRODUCT';
interface CreateProduct {
  type: typeof CREATE_PRODUCT;
  product: IProduct;
}

export const createProduct = (product: IProduct): CreateProduct => {
  return {
    type: CREATE_PRODUCT,
    product
  };
};


export const DELETE_PRODUCT = 'DELETE_PRODUCT';

interface DeleteProduct {
  type: typeof DELETE_PRODUCT;
  productId: number;
}

export const deleteProduct = (productId: number): DeleteProduct => {
  return {
    type: DELETE_PRODUCT,
    productId
  };
}

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
interface UpdateProduct {
  type: typeof UPDATE_PRODUCT;
  product: IProduct;
}

export const updateProduct = (product: IProduct): UpdateProduct => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

export type ProductAction = CreateProduct | UpdateProduct | DeleteProduct;







export const selectProduct = (item: IProduct) => {
  return {
    type: product.SELECT_PRODUCT,
    payload: item,
  };
};


export const addCart = (item: IProduct) => {
  return {
    type: product.ADD_CART,
    payload: item,
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
