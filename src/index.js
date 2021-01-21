import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import MainHomePage from "./Containers/MainHomePage";
import dashboardReducer from "../src/store/dashboard-reducer";
import 'bootstrap/dist/css/bootstrap.min.css';

// BACKEND ENDPOINT BASE URL
console.log("(process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL);
const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log(next(action));
      console.log(store.getState());
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  dashboardReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainHomePage />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
