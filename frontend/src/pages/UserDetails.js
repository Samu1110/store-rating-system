import { useEffect, useState } from "react";
import api from "../api";
import "./Dashboard.css";

export default function UserDetails() {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  useEffect(() => {
    fetchUsers(sortConfig);
  }, []);

  const fetchUsers = async (sortConfig) => {
    const token = localStorage.getItem("token");
    try {
      const params = new URLSearchParams({
        sortBy: sortConfig.key,
        order: sortConfig.direction,
      }).toString();

      const res = await api.get(`/admin/user-details?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch user details", err);
    }
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const newSort = { key, direction };
    setSortConfig(newSort);
    fetchUsers(newSort);
  };

  return (
    <div className="dash-container">
      <h2>📑 All User Details</h2>
      <table className="dash-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name ⬍</th>
            <th onClick={() => handleSort("email")}>Email ⬍</th>
            <th onClick={() => handleSort("address")}>Address ⬍</th>
            <th onClick={() => handleSort("role")}>Role ⬍</th>
            <th onClick={() => handleSort("avgRating")}>Rating ⬍</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
              <td>
                {u.role === "STORE_OWNER"
                  ? u.avgRating || "No ratings yet"
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
