import type { ReactNode } from "react";
import styles from "./loginContainer.module.css";

const LoginContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.loginContainer}>
            {children}
        </div>
    );
};

export default LoginContainer;
