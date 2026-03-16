import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProfile } from "../services/userService";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    useEffect(() => {
        const load = async () => {
            const result = await getAdminProfile();

            switch (result.type) {
                case "error":
                    switch (result.error.type) {
                        case "UNAUTHORIZED":
                            logout();
                            break;

                        case "WITH_MESSAGE":
                            // show toast
                            console.error(result.error.message);
                            break;
                    }
                    break;

                case "success":
                    setData(result.data);
                    break;
            }

            setLoading(false);
        };

        load();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Admin Dashboard</h2>

            <button onClick={logout}>Logout</button>

            <h3>User</h3>
            <p>ID: {data.user.id}</p>
            <p>Email: {data.user.email}</p>
            <p>Role: {data.user.role}</p>

            <h3>Service Provider</h3>
            <p>Name: {data.service_provider.name}</p>
            <p>Email: {data.service_provider.email}</p>
            <p>Mobile: {data.service_provider.mobile_number}</p>
            <p>Address: {data.service_provider.address}</p>
        </div>
    );
};

export default AdminDashboard;
