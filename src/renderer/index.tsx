import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import configureStore from "./store/store";
import initialState from "./store/initial-state";

const store = configureStore(window["REDUX_INITIAL_DATA"] || initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
