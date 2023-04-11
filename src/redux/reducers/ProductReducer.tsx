// import { product } from "../actionTypes/ProductType";
// import { IProduct } from "../../components/CreateProduct";

// const initialProductState = {
//   products: [],
// };
// const initialCartState = {
//   items: [],
// };

// export const productReducer = (state = initialProductState, action : IProduct) => {
//   switch (action.type) {
//     case product.CREATE_PRODUCT:
//       return {
//         ...state,
//         products: [...state.products, action.payload],
//       };
//     case product.SELECT_PRODUCT:
//       const proArr = state.products.filter(
//         (item) => item.id === action.payload
//       );
//       return { ...state, proArr };
//     case product.UPDATE_PRODUCT:
//       const { editId, editItem } = action.payload;

//       const updateProduct = state.products.map((item) => {
//         if (item.id === editId) {
//           item.item.name = editItem.name;
//           item.item.price = editItem.price;
//           item.item.description = editItem.description;
//           item.item.tax = editItem.tax;
//           // item.item.img = editItem.img;
//         }
//         return item;
//       });
//       return {
//         products: updateProduct,
//       };
//     case product.DELETE_PRODUCT:
//       const newProduct = state.products.filter(
//         (item) => item.id !== action.payload
//       );
//       return {
//         ...state,
//         products: newProduct,
//       };

//     default:
//       return state;
//   }
// };
// export const cartReducer = (state = initialCartState, action) => {
//   switch (action.type) {
//     case product.ADD_CART:
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//       };
//     default:
//       return state;
//   }
// };

