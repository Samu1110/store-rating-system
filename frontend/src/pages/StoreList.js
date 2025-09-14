import { useEffect, useState } from "react";
import api from "../api";
import "./Dashboard.css";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  useEffect(() => {
    fetchStores(filters, sortConfig);
  }, []);

  const fetchStores = async (filters, sortConfig) => {
    const token = localStorage.getItem("token");
    try {
      const params = new URLSearchParams({
        ...filters,
        sortBy: sortConfig.key,
        order: sortConfig.direction,
      }).toString();

      const res = await api.get(`/admin/stores?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data);
    } catch (err) {
      console.error("Failed to fetch stores", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    fetchStores(newFilters, sortConfig);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const newSort = { key, direction };
    setSortConfig(newSort);
    fetchStores(filters, newSort);
  };

  return (
    <div className="dash-container">
      <h2>🏪 Store List</h2>

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
      </div>

      <table className="dash-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name ⬍</th>
            <th onClick={() => handleSort("email")}>Email ⬍</th>
            <th onClick={() => handleSort("address")}>Address ⬍</th>
            <th onClick={() => handleSort("rating")}>Rating ⬍</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.rating || "No ratings yet"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
