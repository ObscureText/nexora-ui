import styles from "./loginButton.module.css";

interface ButtonProps {
    text: string;
    isLoading: boolean;
    onClick: () => void;
}

const LoginButton = ({ text, isLoading, onClick }: ButtonProps) => {
    const handleClick = () => {
        if (!isLoading) {
            onClick();
        }
    };

    return (
        <button className={styles.button} onClick={handleClick}>
            {isLoading ? <span className={styles.loader}></span> : text}
        </button>
    );
};

export default LoginButton;
