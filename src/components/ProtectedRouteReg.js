import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteReg({ loginStatus }) {
  console.log("LOGINSTATUS", loginStatus);
  let auth = loginStatus;
  return auth ? <Navigate to="/home" /> : <Outlet />;
}
