import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {}

const Button: React.FC<ButtonProps> = ({ ...props }: ButtonProps) => {
  return (
    <button
      {...props}
    >
      {props.children}
    </button>
  )
}

export default Button;
