import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://localhost:4000/api/auth";

  const submit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? `${API_URL}/login` : `${API_URL}/register`;
      const res = await axios.post(endpoint, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("✅ Success! Redirecting...", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        window.location.href = "/my-sessions";
      }, 1500);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data?.message || "Server returned an error", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (err.request) {
        toast.warning("⚠️ No response from server. Check backend connection.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("❌ Error: " + err.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] p-6">
      {/* Toast Container */}
      <ToastContainer />

      {/* Left side - Logo & Branding */}
      <div className="flex flex-col items-center justify-center md:items-start md:justify-center md:w-1/2 bg-indigo-600 text-white p-10 rounded-lg md:rounded-l-lg md:rounded-r-none h-full">
        <img
          src="https://via.placeholder.com/140"
          alt="Company Logo"
          className="mb-4 rounded-full border-4 border-white shadow-lg"
        />
        <h1 className="text-3xl font-bold mb-2">Arvyax Wellness</h1>
        <p className="text-sm opacity-90 text-center md:text-left leading-relaxed max-w-xs">
          Empowering wellness, productivity, and personal growth for everyone.
        </p>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex items-center justify-center md:w-1/2 bg-gray-50 p-10 rounded-lg md:rounded-r-lg md:rounded-l-none shadow-lg h-full">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>

          <form onSubmit={submit} className="space-y-3">
            <div className="flex items-center border rounded px-3 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full outline-none text-sm"
                required
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full outline-none text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white text-sm font-semibold py-2 rounded hover:bg-indigo-600 transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <button
            className="mt-3 text-indigo-600 hover:underline w-full text-center text-xs"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Create one"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
