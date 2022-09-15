import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {}

const inputClassNameDefault = 'bg-zinc-900 rounded px-4 py-3 text-white text-sm placeholder-zinc-400'

const Input: React.FC<InputProps> = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={props.className ?? inputClassNameDefault}
    />
  )
}

export default Input;
