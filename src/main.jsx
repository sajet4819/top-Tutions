import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import { store } from "./redux/store.js"; // Correctly import the store we just created
import "./index.css";
const basename = import.meta.env.MODE === 'production' ? '/top-Tutions' : '/'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provide the Redux store to the entire application */}
    <Provider store={store}>
      {/* Provide routing capabilities to the entire application */}
      <BrowserRouter >
  <App />
</BrowserRouter>
    </Provider>
  </React.StrictMode>
);
