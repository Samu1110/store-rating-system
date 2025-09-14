import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // 🚀 Role-based redirect
      if (res.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (res.data.role === "STORE_OWNER") {
        navigate("/owner/dashboard");
      } else {
        navigate("/user/dashboard"); // normal user → store listing
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back </h2>
        <p className="auth-subtitle">Login to continue</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}
