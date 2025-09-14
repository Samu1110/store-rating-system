import { useState } from "react";
import api from "../api";
import { validateUser } from "../utils/validation";
import "./Dashboard.css";

export default function AddUser() {
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
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validateUser(form);
    if (msg) return setError(msg);

    try {
      const token = localStorage.getItem("token");
      await api.post("/admin/add-user", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User added successfully!");
      setForm({ name: "", email: "", address: "", password: "", role: "USER" });
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add user");
    }
  };

  return (
    <div className="dash-container">
      <h2>➕ Add New User</h2>
      {error && <p className="auth-error">{error}</p>}
      
      {/* 🔑 Disable browser autofill */}
      <form onSubmit={handleSubmit} className="dash-form" autoComplete="off">
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
          placeholder="User Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="new-email"   // ✅ prevents autofill
          required
        />
        <input
          className="auth-input"
          name="address"
          placeholder="User Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="User Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"  // ✅ prevents autofill
          required
        />
        <select
          className="auth-input"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="USER">Normal User</option>
          <option value="ADMIN">Admin</option>
         
        </select>
        <button type="submit" className="auth-button">
          Add User
        </button>
      </form>
    </div>
  );
}
