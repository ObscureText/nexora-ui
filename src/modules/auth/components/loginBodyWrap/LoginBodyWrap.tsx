import styles from "./loginBodyWrap.module.css";

const LoginBodyWrap = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.body}>{children}</div>;
};

export default LoginBodyWrap;
