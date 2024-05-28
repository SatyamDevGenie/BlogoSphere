import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import {
  blogCreateReducer,
  blogDeleteReducer,
  blogDetailsReducer,
  blogListReducer,
  blogReviewCreateReducer,
  blogUpdateReducer,
} from "./reducers/blogReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  blogList: blogListReducer,
  blogDetails: blogDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  blogReviewCreate: blogReviewCreateReducer,
  blogCreate: blogCreateReducer,
  blogUpdate: blogUpdateReducer,
  blogDelete: blogDeleteReducer,
});

// saved user info in local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
