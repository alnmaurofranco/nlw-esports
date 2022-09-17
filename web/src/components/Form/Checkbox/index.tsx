
import * as Check from '@radix-ui/react-checkbox';
import { Check as CheckIcon } from 'phosphor-react'
import { HTMLAttributes, useState } from 'react';


type CheckboxProps = Check.CheckboxProps & HTMLAttributes<HTMLButtonElement> & {
  iconStyle?: string;
}
const checkBoxClassNameDefault = "w-6 h-6 p-1 rounded bg-zinc-900";
const checkBoxIconClassNameDefault = "text-emerald-400";

const Checkbox: React.FC<CheckboxProps> = ({ iconStyle, ...props }: CheckboxProps) => {
  return (
    <>
      <Check.Root
        {...props}
        className={props.className ?? checkBoxClassNameDefault}
      >
        <Check.Indicator>
          <CheckIcon size={16} className={iconStyle ?? checkBoxIconClassNameDefault} />
        </Check.Indicator>
      </Check.Root>
      {props.children}
    </>
  )
}

export default Checkbox;
