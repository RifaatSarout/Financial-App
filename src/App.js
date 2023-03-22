import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/scenes/dashboard";
import Team from "./pages/scenes/team";
import Transactions from "./pages/scenes/transactions";
import Category from "./pages/scenes/category";
import BarSarah from './pages/scenes/bar';
import Form from "./pages/scenes/form";
import Line from "./pages/scenes/line";
import Pie from "./pages/scenes/pie";
import TransactionForm from './pages/scenes/transactionForm';
import CategoryForm from './pages/scenes/categoryForm';
import UpdateTransactions from './pages/scenes/updateTrans';
import Geography from "./pages/scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./pages/scenes/calendar/calendar";
import Login from "./pages/login/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import { BarChart } from '@material-ui/icons';

function App() {
  const [theme, colorMode] = useMode();
  const { user } = useAuthContext()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <BrowserRouter>
          <main className="content">
          <Routes>
           <Route path="/" element={<Login />} />
           <Route path="/dashboard" 
            element={user ? <Dashboard />: <Navigate to="/" />} />
           <Route path="/team" 
            element={user ? <Team /> : <Navigate to="/" />} />
            <Route path="/updatetransactions" element={<UpdateTransactions />} />
            <Route path="/category_form"
            element={user ? <CategoryForm /> : <Navigate to="/" />} />
           <Route path="/category"
            element={user ? <Category /> : <Navigate to="/" />} />
           <Route path="/transactions"
            element={user ? <Transactions /> : <Navigate to="/" />} />
           <Route path="/form"
            element={user ? <Form /> : <Navigate to="/" />} />
           <Route path="/bar" 
            element={user ? <BarSarah /> : <Navigate to="/" />} />
           <Route path="/pie" 
            element={user ? <Pie /> : <Navigate to="/" />} />
           <Route path="/line"
            element={user ? <Line /> : <Navigate to="/" />} />
           <Route path="/transactions_form" 
            element={user ? <TransactionForm /> : <Navigate to="/" />} />
           <Route path="/calendar" 
            element={user ? <Calendar /> : <Navigate to="/" />} />
          <Route path="/geography" 
           element={user ? <Geography /> : <Navigate to="/" />} />
          </Routes>
          </main>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;