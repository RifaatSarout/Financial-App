import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import { AdminsContextProvider } from './context/AdminContext';
import { CategoriesContextProvider } from "./context/CategoryContext";
import { TransactionsContextProvider } from "./context/TransactionContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminsContextProvider>  
        <CategoriesContextProvider>
          <TransactionsContextProvider>
          <App />
          </TransactionsContextProvider>
        </CategoriesContextProvider> 
      </AdminsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
  );
