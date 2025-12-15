import { Navigate } from "react-router-dom";
import Unauthorized from "./Unauthorized";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Unauthorized />;
  }

  return children;
};
