import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let valid = true;

        setEmailError("");
        setPasswordError("");

        if (!email.trim()) {
            setEmailError("Email is required");
            valid = false;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            valid = false;
        }

        return valid;
    };

    const handleLogin = async () => {
        setFormError("");

        if (!validate()) {
            return;
        }

        setLoading(true);

        const result = await login(email, password);

        if (result.type === "success") {
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("role", result.data.role);
            navigate("/");
        } else {
            if (result.error.type === "WITH_MESSAGE") {
                setFormError(result.error.message);
            }
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Login</h2>

            {formError && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                    {formError}
                </div>
            )}

            <div>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                        {emailError}
                    </div>
                )}
            </div>

            <br />

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                        {passwordError}
                    </div>
                )}
            </div>

            <br />

            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
};

export default Login;
