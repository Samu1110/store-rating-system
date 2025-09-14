import { useEffect, useState } from "react";
import api from "../api";
import { validateStore } from "../utils/validation";
import "./Dashboard.css";

export default function AddStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
    ownerName: "",
    ownerEmail: "",
    ownerPassword: "",
  });
  const [owners, setOwners] = useState([]);
  const [mode, setMode] = useState(""); // "EXISTING" | "NEW"
  const [error, setError] = useState("");

  // Fetch existing owners
  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/admin/owners", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setOwners(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validateStore(form, mode);
    if (msg) return setError(msg);

    try {
      const token = localStorage.getItem("token");
      await api.post("/admin/add-store", { ...form, mode }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Store added successfully!");
      setForm({ name: "", email: "", address: "", ownerId: "", ownerName: "", ownerEmail: "", ownerPassword: "" });
      setMode("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add store");
    }
  };

  return (
    <div className="dash-container">
      <h2>🏬 Add New Store</h2>
      {error && <p className="auth-error">{error}</p>}

      {/* First ask admin to choose mode */}
      <div className="owner-choice">
        <label>
          <input
            type="radio"
            value="EXISTING"
            checked={mode === "EXISTING"}
            onChange={() => setMode("EXISTING")}
          />{" "}
           <span>Assign to Existing Owner</span>
        </label>
        <label>
          <input
            type="radio"
            value="NEW"
            checked={mode === "NEW"}
            onChange={() => setMode("NEW")}
          />{" "}
          <span>Create New Owner</span>
        </label>
      </div>

      {mode && (
        <form onSubmit={handleSubmit} className="dash-form">
          {/* Store Fields */}
          <input
            className="auth-input"
            name="name"
            placeholder="Store Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {/* <input
            className="auth-input"
            name="email"
            placeholder="Store Email"
            value={form.email}
            onChange={handleChange}
            required
          /> */}
          <input
            className="auth-input"
            name="address"
            placeholder="Store Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          {/* Existing Owner */}
          {mode === "EXISTING" && (
            <select
              className="auth-input"
              name="ownerId"
              value={form.ownerId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Existing Owner --</option>
              {owners.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name} ({o.email})
                </option>
              ))}
            </select>
          )}

          {/* New Owner */}
          {mode === "NEW" && (
            <>
              <input
                className="auth-input"
                name="ownerName"
                placeholder="Owner Name"
                value={form.ownerName}
                onChange={handleChange}
                required
                autoComplete="off"  
              />
              <input
                className="auth-input"
                name="ownerEmail"
                placeholder="Owner Email"
                value={form.ownerEmail}
                onChange={handleChange}
                required
                 autoComplete="new-email"
              />
              <input
                className="auth-input"
                type="password"
                name="ownerPassword"
                placeholder="Owner Password"
                value={form.ownerPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </>
          )}

          <button type="submit" className="auth-button">
            Add Store
          </button>
        </form>
      )}
    </div>
  );
}
