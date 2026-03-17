import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authServices";
import LoginWrap from "../components/loginWrap/LoginWrap";
import LoginContainer from "../components/loginContainer/LoginContainer";
import TextBox from "../components/textBox/TextBox";
import LoginButton from "../components/loginButton/LoginButton";
import LoginHeader from "../components/loginHeader/LoginHeader";
import { delay } from "../../../utils/delay";
import LoginPageHeader from "../components/loginPageHeader/LoginPageHeader";
import LoginBodyWrap from "../components/loginBodyWrap/LoginBodyWrap";

const LoginView = () => {
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
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                setEmailError("Enter a valid email address");
                valid = false;
            }
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
        await delay(600);

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
        <LoginWrap>
            <LoginPageHeader />

            <LoginBodyWrap>
                <LoginContainer>
                    <LoginHeader formError={formError} />

                    <TextBox
                        placeholder="Enter your email"
                        value={email}
                        iconPath="./ic_email.png"
                        onChange={(e) => setEmail(e.target.value)}
                        errorText={emailError}
                    />

                    <TextBox
                        placeholder="Enter your password"
                        value={password}
                        iconPath="./ic_lock.png"
                        isPassword
                        onChange={(e) => setPassword(e.target.value)}
                        errorText={passwordError}
                    />

                    <LoginButton
                        onClick={handleLogin}
                        isLoading={loading}
                        text="Login"
                    />
                </LoginContainer>
            </LoginBodyWrap>
        </LoginWrap>
    );
};

export default LoginView;
