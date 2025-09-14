import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function UserChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(
        "/user/change-password",
        { oldPassword: oldPass, newPassword: newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("Password updated successfully!");
      setTimeout(() => navigate("/user/dashboard"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error updating password");
    }
  };

  return (
    <div className="dash-container">
      <h2>🔑 Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
