import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PurchaseOrderForm from "./components/PurchaseOrderForm";
import PurchaseOrderSaved from "./components/PurchaseOrderSaved";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PurchaseOrderForm />} />
        <Route path="/saved" element={<PurchaseOrderSaved />} />
      </Routes>
    </BrowserRouter>
  );
}
