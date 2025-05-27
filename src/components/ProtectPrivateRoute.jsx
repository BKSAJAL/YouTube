import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectPrivateRoute({ children }) {
  const { token } = useSelector((state) => state.user.user);

  //protect private route and redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
