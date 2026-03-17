import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token) {
            navigate("/login");
            return;
        }

        if (!role) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
        }

        switch (role) {
            case "INDIVIDUAL":
                navigate("/individual/dashboard");
                break;

            case "ESTABLISHMENT_OWNER":
                navigate("/establishment/dashboard");
                break;

            case "SERVICE_PROVIDER_ADMIN":
                navigate("/admin/dashboard");
                break;

            default:
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/login");
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Landing;
