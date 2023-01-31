import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { persister, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "./theme.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import "antd/dist/antd.css";
import "react-multi-carousel/lib/styles.css"

import App from "./App";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
