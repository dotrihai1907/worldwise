import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = (props: ButtonProps) => {
  const { children, onClick, type } = props;
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
