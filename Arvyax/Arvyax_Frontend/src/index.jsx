import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginRegister from "./pages/LoginRegister";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/MySessions";
import SessionEditor from "./pages/SessionEditor";
import "./styles/styles.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<LoginRegister />} />
        <Route path="my-sessions" element={<MySessions />} />
        <Route path="editor/:id?" element={<SessionEditor />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
