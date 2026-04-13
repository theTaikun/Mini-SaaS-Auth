import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function AuthLayout() {
      const { isAuthenticated, loading } = useAuth();

      if (loading) return null;

      if (isAuthenticated) {
              return <Navigate to="/dashboard" replace />;
            }

      return <Outlet />;
}
