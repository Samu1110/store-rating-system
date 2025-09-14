import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import "./Dashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/admin/stats", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setStats(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dash-container">
      <h2>🛠️ Admin Dashboard</h2>
      <div className="stats-box">
        <p><b>Total Users:</b> {stats.users}</p>
        <p><b>Total Stores:</b> {stats.stores}</p>
        <p><b>Total Ratings:</b> {stats.ratings}</p>
      </div>

      <nav className="dash-nav">
        <Link to="/admin/add-user">➕ Add User</Link>
        <Link to="/admin/add-store">🏬 Add Store</Link>
        <Link to="/admin/users">👥 User List</Link>
        <Link to="/admin/stores">🏪 Store List</Link>
        <Link to="/admin/user-details">📑 User Details</Link>
      </nav>

      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
}
