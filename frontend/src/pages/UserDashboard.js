import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import StarRating from "../components/StarRating";
import "./Dashboard.css";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [pendingRatings, setPendingRatings] = useState({}); // temporary ratings before submit
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Load stores
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/user/stores", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setStores(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  // Submit rating
  const handleSubmitRating = async (storeId) => {
    const rating = pendingRatings[storeId];
    if (!rating) return;

    const token = localStorage.getItem("token");
    try {
      await api.post(
        "/user/rate",
        { storeId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg(`Your rating (${rating}) has been saved for store #${storeId}`);
      setTimeout(() => setMsg(""), 2000);

      // refresh stores
      const res = await api.get("/user/stores", { headers: { Authorization: `Bearer ${token}` } });
      setStores(res.data);

      // clear pending rating for this store
      setPendingRatings((prev) => ({ ...prev, [storeId]: undefined }));
    } catch (err) {
      setMsg(err.response?.data?.msg || "Failed to submit rating");
    }
  };

  // Search filter
  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dash-container">
      <h2>🏪 Store Listings</h2>
      <input
        placeholder="Search stores by name or address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {msg && <p style={{ color: "green", marginTop: "10px" }}>{msg}</p>}

      <table className="dash-table">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Overall Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{s.avgRating || "No ratings yet"}</td>
              <td>
                <StarRating
                  value={pendingRatings[s.id] ?? s.userRating ?? 0}
                  onChange={(rating) =>
                    setPendingRatings((prev) => ({ ...prev, [s.id]: rating }))
                  }
                />
              </td>
              <td>
  <button
    className="rating-btn"
    onClick={() => handleSubmitRating(s.id)}
    disabled={!pendingRatings[s.id]}
  >
    {s.userRating ? "Update Rating" : "Submit Rating"}
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
<div className="action-buttons">
      <button onClick={() => navigate("/user/change-password")} className="password-btn">
  Change Password
</button>
<button onClick={handleLogout} className="logout-btn">
  Logout
</button>
</div>
    </div>
  );
}
