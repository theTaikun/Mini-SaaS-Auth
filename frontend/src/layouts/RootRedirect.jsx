import { Navigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";

export default function RootRedirect() {
      const { isAuthenticated, loading } = useAuth();

      if (loading) return null;

      return isAuthenticated
        ? <Navigate to="/dashboard" replace />
            : <Navigate to="/auth/login" replace />;
}
