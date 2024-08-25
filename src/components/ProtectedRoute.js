import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ loginStatus }) {
  let auth = loginStatus;
  return auth ? <Outlet /> : <Navigate to="/" />;
}
