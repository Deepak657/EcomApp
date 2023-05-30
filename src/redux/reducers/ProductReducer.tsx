import { IProduct } from "../../components/CreateProduct";
import { IUser } from "../../components/SignUp";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  ProductAction,
  UPDATE_PRODUCT,
  ADD_TO_CART,
  DELETE_TO_CART,
  SEARCH_TEXT,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  LOGIN_USER,
  ITEM_COUNT,
  ADMIN_PERMISSION,
} from "../actions/ProductAction";

//////////////   Product ////////////////////

export interface ProductState {
  products: IProduct[];
}

const initState: ProductState = {
  products: [],
};

export const productReducer = (
  state: ProductState = initState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          action.product.id === product.id ? action.product : product
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.productId
        ),
      };
    default:
      return state;
  }
};

///////////////////////////  SignUp ///////////////////////////////////////

export interface UserState {
  userDetails: IUser[];
  loginUser: string | undefined;
  permission: boolean | undefined;
  userId: number;
  userName: string;
  emailAddress: string;
  password: string;
  admin: boolean;
}

const initUserState: UserState = {
  userDetails: [],
  loginUser: "",
  permission: false,
  userId: new Date().getTime(),
  userName: "Deepak",
  emailAddress: "dk6570049@gmail.com",
  password: "Deepak@123",
  admin: true,
};

export const UserReducer = (
  state: UserState = initUserState,
  action: ProductAction
): UserState => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        userDetails: [...state.userDetails, action.userInfo],
      };
    case DELETE_USER:
      return {
        ...state,
        userDetails: state.userDetails.filter(
          (user) => user.userId !== action.userId
        ),
      };
    case UPDATE_USER:
      return {
        ...state,
        userDetails: state.userDetails.map((user) =>
          user.userId === action.user.userId ? action.user : user
        ),
      };
    case LOGIN_USER:
      return {
        ...state,
        loginUser: action.user.username,
        permission: action.user.permission,
      };
    case ADD_TO_CART:
      return {
        ...state,
        userDetails: state.userDetails.map((user) => {
          if (user.userName === state.loginUser) {
            return {
              ...user,
              carts: [...user.carts, action.product],
            };
          } else {
            return user;
          }
        }),
      };

    case DELETE_TO_CART:
      return {
        ...state,
        userDetails: state.userDetails.map((user) => {
          if (user.userName === state.loginUser) {
            return {
              ...user,
              carts: user.carts.filter(
                (product) => product.id !== action.productId
              ),
            };
          } else {
            return user;
          }
        }),
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        userDetails: state.userDetails.map((user) => {
          return {
            ...user,
            carts: user.carts.map((product) =>
              product.id === action.product.id ? action.product : product
            ),
          };
        }),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userDetails: state.userDetails.map((user) => {
          return {
            ...user,
            carts: user.carts.filter(
              (product) => product.id !== action.productId
            ),
          };
        }),
      };
    case ITEM_COUNT:
      return {
        ...state,
        userDetails: state.userDetails.map((user) => {
          if (user.userName === state.loginUser) {
            return {
              ...user,
              carts: user.carts.map((product) =>
                product.id === action.product.id ? action.product : product
              ),
            };
          } else {
            return user;
          }
        }),
      };
    case ADMIN_PERMISSION:
      return {
        ...state,
        userDetails: state.userDetails.map((user) => {
          if (user.userId === action.iserInfo.id) {
            return {
              ...user,
              admin: !user.admin,
            };
          } else {
            return user;
          }
        }),
        permission:
          state.loginUser !== action.iserInfo.permissionUser
            ? !state.permission
            : state.permission,
      };

    default:
      return state;
  }
};

//////////////////////////  search  //////////////////////////

export interface SearchState {
  text: string;
}

const initSearch: SearchState = {
  text: "",
};

export const searchReducer = (
  state: SearchState = initSearch,
  action: ProductAction
): SearchState => {
  switch (action.type) {
    case SEARCH_TEXT:
      return {
        ...state,
        text: action.productSearch,
      };
    default:
      return state;
  }
};

export {};
