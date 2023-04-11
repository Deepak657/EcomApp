import { applyMiddleware, combineReducers, createStore } from "redux"
import { ProductState, productReducer } from "./reducers/ProductReducer"
import { shallowEqual, useSelector } from "react-redux";
import logger from 'redux-logger';

export const useGSelector = <Selected = unknown>(
    selector: (state: Store) => Selected,
): Selected => useSelector(selector, shallowEqual);

export interface Store {
    productState: ProductState;
}

export const rootReducer = createStore(combineReducers({
    productState: productReducer
}), applyMiddleware(logger));