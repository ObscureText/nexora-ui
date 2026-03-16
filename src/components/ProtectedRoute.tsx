import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
    allowedRole:
        | "INDIVIDUAL"
        | "ESTABLISHMENT_OWNER"
        | "SERVICE_PROVIDER_ADMIN";
}

const ProtectedRoute = ({ children, allowedRole }: Props) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
