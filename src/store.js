import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Redux/auth.slice";
import dishReducer from "./Redux/dish.slice";
import userReducer from "./Redux/user.slice";
import isShowReducer from "./Redux/isShow.slice";
const rootReducer = {
  auth: authReducer,
  dish: dishReducer,
  user: userReducer,
  isShow: isShowReducer,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
