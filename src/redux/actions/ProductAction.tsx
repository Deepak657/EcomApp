import { IAdmin } from "../../components/AdminPermission";
import { IProduct } from "../../components/CreateProduct";
import { cartProps } from "../../components/ProductInfo";
import { ILogin } from "../../components/SignIn";
import { IUser } from "../../components/SignUp";

///////////  product////////////////////
export const CREATE_PRODUCT = "CREATE_PRODUCT";
interface CreateProduct {
  type: typeof CREATE_PRODUCT;
  product: IProduct;
}

export const createProduct = (product: IProduct): CreateProduct => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

export const DELETE_PRODUCT = "DELETE_PRODUCT";

interface DeleteProduct {
  type: typeof DELETE_PRODUCT;
  productId: number;
}

export const deleteProduct = (productId: number): DeleteProduct => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
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

//////////////// Cart ////////////////////

export const ADD_TO_CART = "ADD_TO_CART";
interface AddToCart {
  type: typeof ADD_TO_CART;
  product: cartProps;
}

export const addToCart = (product: cartProps): AddToCart => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const DELETE_TO_CART = "DELETE_TO_CART";

interface DeleteToCart {
  type: typeof DELETE_TO_CART;
  productId: number;
}

export const deleteToCart = (productId: number): DeleteToCart => {
  return {
    type: DELETE_TO_CART,
    productId,
  };
};

export const ITEM_COUNT = "ITEM_COUNT";

interface ItemCart {
  type: typeof ITEM_COUNT;
  product: cartProps;
}

export const itemCount = (product: cartProps): ItemCart => {
  return {
    type: ITEM_COUNT,
    product,
  };
};

///////////    Search //////////////////

export const SEARCH_TEXT = "SEARCH_TEXT";

interface SearchPorduct {
  type: typeof SEARCH_TEXT;
  productSearch: string;
}

export const searchPorduct = (productSearch: string): SearchPorduct => {
  return {
    type: SEARCH_TEXT,
    productSearch,
  };
};

//////////////////  SignUp ///////////////////////

export const CREATE_USER = "CREATE_USER";
interface CreateUser {
  type: typeof CREATE_USER;
  userInfo: IUser;
}

export const createUser = (userInfo: IUser): CreateUser => {
  return {
    type: CREATE_USER,
    userInfo,
  };
};

export const DELETE_USER = "DELETE_USER";
interface DeleteUser {
  type: typeof DELETE_USER;
  userId: number;
}

export const deleteUser = (userId: number): DeleteUser => {
  return {
    type: DELETE_USER,
    userId,
  };
};

export const UPDATE_USER = "UPDATE_USER";
interface UpdateUser {
  type: typeof UPDATE_USER;
  user: IUser;
}

export const updateUser = (user: IUser): UpdateUser => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const LOGIN_USER = "LOGIN_USER";

interface LoginUser {
  type: typeof LOGIN_USER;
  user: ILogin;
}

export const loginUser = (user: ILogin): LoginUser => {
  return {
    type: LOGIN_USER,
    user,
  };
};

export const ADMIN_PERMISSION = "ADMIN_PERMISSION";
interface AdminPermission {
  type: typeof ADMIN_PERMISSION;
  iserInfo: IAdmin;
}

export const adminPermission = (iserInfo: IAdmin): AdminPermission => {
  return {
    type: ADMIN_PERMISSION,
    iserInfo,
  };
};

export type ProductAction =
  | CreateProduct
  | UpdateProduct
  | DeleteProduct
  | AddToCart
  | DeleteToCart
  | SearchPorduct
  | CreateUser
  | DeleteUser
  | UpdateUser
  | LoginUser
  | ItemCart
  | AdminPermission;
