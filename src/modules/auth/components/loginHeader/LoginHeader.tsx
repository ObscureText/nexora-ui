import styles from "./loginHeader.module.css";

interface LoginHeaderProps {
    formError: string;
}

const LoginHeader = ({ formError }: LoginHeaderProps) => {
    return (
        <div className={styles.header}>
            <div className={styles.welcome}>Welcome back</div>
            <div className={styles.login}>Login</div>

            {formError && <div className={styles.error}>{formError}</div>}
        </div>
    );
};

export default LoginHeader;
