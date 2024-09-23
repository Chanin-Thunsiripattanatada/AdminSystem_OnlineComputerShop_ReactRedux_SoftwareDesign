import { combineReducers } from "redux";
import products from "./products";
import customers from "./customers";
import categories from "./categories";
import orders from "./orders";
import images from "./images";

export default combineReducers({
  products,
  customers,
  categories,
  orders,
  images,
});