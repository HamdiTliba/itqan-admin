/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { forwardRef, memo, useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues | any>;
  pattern?: string;
  defaultValue?: any;
  isHidden?: boolean;
  errors: FieldErrors | any;
  accept?: string;
  multiple?: boolean;
  className?: string;
  smallPad?: boolean;
  roundFull?: boolean;
  widthfull?: boolean;
  mediumPad?: boolean;
  noPadding?: boolean;
  value?: any;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors,
    pattern,
    defaultValue,
    isHidden,
    accept,
    multiple,
    className,
    smallPad,
    roundFull,
    widthfull,
    mediumPad,
    noPadding,
    value,
  },
  ref
) => {
  useEffect(() => {
    if (errors[id]) {
      console.log(errors[id].message);
      toast.error(errors[id].message, {
        className:
          "border border-tertiary border-neutral-200 dark:border-neutral-600 ring ring-red-500",
        id: id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors[id], id]);
  return (
    <div
      className={`${widthfull && "w-full"} relative ${isHidden && "hidden"}`}>
      <input
        autoComplete="false"
        id={id}
        disabled={disabled}
        pattern={pattern}
        defaultValue={defaultValue}
        value={value}
        placeholder={label}
        required={required}
        type={type}
        accept={accept}
        multiple={multiple}
        {...register(id)}
        className={`peer w-full outline-none font-light border-[1px] border-neutral-300 dark:border-neutral-600 focus-visible:ring-1  focus-visible:ring-sky-500  transition disabled:opacity-70  disabled:cursor-not-allowed  ${className} 
        ${roundFull ? "rounded-full" : "rounded-xl"}
        ${
          errors[id]
            ? "ring-1 ring-rose-400"
            : "focus-visible:ring-1 focus-visible:ring-secondary"
        }
        ${noPadding ? "p-[2px]" : smallPad ? "p-2" : "p-4"}
      
     
        ${mediumPad && "p-3"}

     
        `}
        ref={ref}
      />
    </div>
  );
};

export default memo(forwardRef(Input));
