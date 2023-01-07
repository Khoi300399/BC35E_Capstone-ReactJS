import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import "./assets/scss/style.scss";

import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

export const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
      <ToastContainer />
    </HistoryRouter>
  </Provider>
);
