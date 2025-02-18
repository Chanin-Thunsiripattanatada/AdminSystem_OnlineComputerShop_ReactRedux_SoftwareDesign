import { combineReducers } from "redux";
import products from "./products";
import customers from "./customers";
import categories from "./categories";
import orders from "./orders";

export default combineReducers({
  products,
  customers,
  categories,
  orders,
});