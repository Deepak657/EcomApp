import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  ProductState,
  productReducer,
  UserReducer,
  UserState,
  searchReducer,
  SearchState,
} from "./reducers/ProductReducer";
import { shallowEqual, useSelector } from "react-redux";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

export const useGSelector = <Selected = unknown,>(
  selector: (state: Store) => Selected
): Selected => useSelector(selector, shallowEqual);

export interface Store {
  productState: ProductState;
  userState: UserState;
  searchState: SearchState;
}

const rootReducer = combineReducers({
  productState: productReducer,
  userState: UserReducer,
  searchState: searchReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(logger));

export const persistor = persistStore(store);
