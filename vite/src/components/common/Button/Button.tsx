import { PropsWithChildren } from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "danger";

export type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}>;

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  const className = `btn btn--${variant} ${disabled ? "btn--disabled" : ""}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
