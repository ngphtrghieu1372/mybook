import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  userSigninReducer,
  userRegisterReducer,
  // userSigninGoogleReducer,
  userDetailsReducer,
  updateProfileReducer,
  userSigninQRReducer
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMineListReducer,
  orderListReducer,
  orderDeleteReducer,
  orderDeliverReducer
} from "./reducers/orderReducer";
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal"
  }
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSigninQR: userSigninQRReducer,
  // userSigninGoogleReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  // userSigninGoogle: userSigninGoogleReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
