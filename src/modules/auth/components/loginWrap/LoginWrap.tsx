import type { ReactNode } from "react";
import styles from "./loginWrap.module.css";

const LoginWrap = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.pageWrap}>
            {children}
        </div>
    );
};

export default LoginWrap;
