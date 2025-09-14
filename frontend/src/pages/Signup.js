import { useState } from "react";
import api from "../api";
import { validateUser } from "../utils/validation"; // ✅ Import here
import "./Auth.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "USER",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validateUser(form);
    if (msg) return setError(msg);

    try {
      await api.post("/auth/signup", form);
      alert("Signup successful! Please login.");
      setForm({ name: "", email: "", address: "", password: "", role: "USER" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account ✨</h2>
        <p className="auth-subtitle">Join us today</p>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
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
          <button type="submit" className="auth-button">Signup</button>
        </form>
        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
