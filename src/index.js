import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

import { MaterialUIControllerProvider } from "context";
import { TransactionProvider } from './context/transaction';

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
     <TransactionProvider>
      <App />
     </TransactionProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
