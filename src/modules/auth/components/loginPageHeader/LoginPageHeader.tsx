import styles from "./loginPageHeader.module.css";

const LoginPageHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.brand}>
                <img src="./nexora_logo.png" className={styles.logo} />
                <div className={styles.name}>Nexora</div>
            </div>
        </div>
    );
};

export default LoginPageHeader;
