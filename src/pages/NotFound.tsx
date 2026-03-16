import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>404</h1>
            <p>Page not found</p>

            <button onClick={() => navigate("/")}>
                Go Home
            </button>
        </div>
    );
};

export default NotFound;
