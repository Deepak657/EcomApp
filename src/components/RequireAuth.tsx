import { useGSelector } from "../redux/store";
import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const user = useGSelector((state) => state.userState.loginUser);
  return user ? <Outlet /> : <Navigate to="/signIn" />;
};

export default RequireAuth;
