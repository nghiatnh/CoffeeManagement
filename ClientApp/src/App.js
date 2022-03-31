import React from "react";
import "./custom.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import TableList from "./components/table/TableList";
import ViewFood from "./components/food/ViewFood";
import ViewOrder from "./components/order/ViewOrders";
import ViewPayment from "./components/payment/ViewPayment";
import SignIn from "./components/authentication/SignIn";
import AuthorizeRoute from "./components/authentication/AuthorizeRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthorizeRoute />
    </BrowserRouter>
  );
}
