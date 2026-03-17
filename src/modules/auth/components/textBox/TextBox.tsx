import type { ChangeEvent } from "react";
import { useState } from "react";
import styles from "./textBox.module.css";

interface TextBoxProps {
    placeholder?: string;
    errorText?: string;
    isPassword?: boolean;
    value: string;
    iconPath: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextBox = ({
    placeholder,
    errorText,
    isPassword,
    value,
    iconPath,
    onChange,
}: TextBoxProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.textBoxContainer}>
            <div className={styles.inputWrapper}>
                <img src={iconPath} className={styles.icon} />

                <input
                    type={isPassword && !showPassword ? "password" : "text"}
                    placeholder={placeholder}
                    className={styles.inputField}
                    onChange={onChange}
                    value={value}
                />

                {isPassword && (
                    <img
                        src={showPassword
                            ? "./ic_eye_cross.png"
                            : "./ic_eye.png"}
                        className={styles.eyeIcon}
                        onClick={togglePassword}
                    />
                )}
            </div>

            {errorText && <div className={styles.errorText}>{errorText}</div>}
        </div>
    );
};

export default TextBox;
