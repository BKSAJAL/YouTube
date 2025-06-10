import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedPublicRoute({ children }) {
  const { token } = useSelector((state) => state.user);

  //protect public route and redirect to home page
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
