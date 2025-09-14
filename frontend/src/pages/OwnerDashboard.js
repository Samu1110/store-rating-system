import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // optional styling

export default function OwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/owner/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setRatings(res.data.ratings);
        setAvgRating(res.data.avgRating);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dash-container">
      <h2>📊 Store Owner Dashboard</h2>

      <h3>Average Rating: {avgRating || "No ratings yet"}</h3>

      <table className="dash-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
<div className="action-buttons">
<button onClick={() => navigate("/owner/change-password")} className="password-btn">
  Change Password
</button>
     
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
    </div>
  );
}
