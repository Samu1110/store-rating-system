import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OwnerDashboard from "./pages/OwnerDashboard";
import ChangePassword from "./pages/ChangePassword";
import AdminDashboard from "./pages/AdminDashboard";
import AddUser from "./pages/AddUser";
import AddStore from "./pages/AddStore";
import UserList from "./pages/UserList";
import StoreList from "./pages/StoreList";
import UserDashboard from "./pages/UserDashboard";
import UserChangePassword from "./pages/UserChangePassword";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Login */}
        <Route path="/" element={<Login />} />
        
        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Store Owner Routes */}
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/change-password" element={<ChangePassword />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/add-store" element={<AddStore />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/stores" element={<StoreList />} />
        <Route path="/admin/user-details" element={<UserDetails />} />

        {/* Normal User Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/change-password" element={<UserChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
