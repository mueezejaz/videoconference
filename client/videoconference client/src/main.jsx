import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Socketconnectioncontext from "./context/Socketconnectioncontext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Socketconnectioncontext>
        <App />
      </Socketconnectioncontext>
    </BrowserRouter>
  </React.StrictMode>,
);
