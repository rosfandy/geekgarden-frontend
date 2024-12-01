import { Navigate, Route, Routes } from "react-router-dom";
import { AuthMiddleware } from "./components/middleware";
import { Forbidden, Home } from "./pages";
import { Login, Register } from "./pages/auth";
import { Dashboard, Products, Profile, Users } from "./pages/dashboard";

const ROLES = {
  Admin: 'Admin',
  All: 'All'
};

export default function App() {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forbidden" element={<Forbidden />} />

      <Route element={<AuthMiddleware guard={[ROLES.All]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<AuthMiddleware guard={[ROLES.Admin]} />}>
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
      </Route>

    </Routes>
  );
}