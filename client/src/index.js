import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  authenticationReducer,
  snackBarReducer,
} from "./Store/Reducers/Reducers";

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

const rootReducer = combineReducers({
  userAuth: authenticationReducer,
  snackBar: snackBarReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
