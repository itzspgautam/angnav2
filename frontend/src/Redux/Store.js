import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducers from "./Reducers/RootReducers";

const middleware = [thunk];

const store = createStore(
  RootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
