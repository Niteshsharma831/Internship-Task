import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import MySessions from "./pages/MySessions.jsx";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SessionEditor from "./pages/SessionEditor.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<LoginRegister />} />

          {/* ✅ Protect these routes */}
          <Route
            path="my-sessions"
            element={
              <ProtectedRoute>
                <MySessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="editor/:id?"
            element={
              <ProtectedRoute>
                <SessionEditor />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
