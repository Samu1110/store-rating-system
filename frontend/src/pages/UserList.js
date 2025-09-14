import { useEffect, useState } from "react";
import api from "../api";
import "./Dashboard.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  useEffect(() => {
    fetchUsers(filters, sortConfig);
  }, []);

  const fetchUsers = async (filters, sortConfig) => {
    const token = localStorage.getItem("token");
    try {
      const params = new URLSearchParams({
        ...filters,
        sortBy: sortConfig.key,
        order: sortConfig.direction,
      }).toString();

      const res = await api.get(`/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    fetchUsers(newFilters, sortConfig);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const newSort = { key, direction };
    setSortConfig(newSort);
    fetchUsers(filters, newSort);
  };

  return (
    <div className="dash-container">
      <h2>👥 User List</h2>

      <div className="filter-container">
        <input
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          name="email"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <input
          name="address"
          placeholder="Filter by Address"
          value={filters.address}
          onChange={handleFilterChange}
        />
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      <table className="dash-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name ⬍</th>
            <th onClick={() => handleSort("email")}>Email ⬍</th>
            <th onClick={() => handleSort("address")}>Address ⬍</th>
            <th onClick={() => handleSort("role")}>Role ⬍</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
