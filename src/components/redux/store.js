import { configureStore } from "@reduxjs/toolkit";
import spotlightReducer from "./slices/spotlightSlice.js";
import addToCartReducer from "./slices/addToCartSlice.js";
import userLoginReducer from "./slices/userLoginSlice.js";
import addressReducer from "./slices/addressSlice.js";

const store = configureStore({
  reducer: {
    spotlight: spotlightReducer,
    cart: addToCartReducer,
    user_login: userLoginReducer,
    address: addressReducer
  },
});

export default store;
