// import "./Button.css";
import styles from "./Button.module.css";

const Button = ({ type = "button", role = "primary", children, onClick }) => {
  const buttonClass = `${styles.btn} ${styles[role]}`;

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
