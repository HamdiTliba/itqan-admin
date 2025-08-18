/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { forwardRef, memo, useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues | any>;
  pattern?: string;
  defaultValue?: any;
  isHidden?: boolean;
  errors: FieldErrors | any;
  className?: string;
  smallPad?: boolean;
  roundFull?: boolean;
  mediumPad?: boolean;
  widthfull?: boolean;
  value?: any;
}

const Textarea: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  InputProps
> = (
  {
    id,
    label,
    disabled,
    required,
    register,
    errors,
    pattern,
    defaultValue,
    isHidden,
    className,
    smallPad,
    roundFull,
    mediumPad,
    widthfull,
    value,
  },
  ref
) => {
  useEffect(() => {
    if (errors[id]) {
      console.log(errors[id].message);
      toast.error(errors[id].message, {
        className:
          "border border-neutral-300 dark:border-neutral-600 border-tertiary ring ring-red-500",
        id: id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors[id], id]);
  return (
    <div
      className={`${widthfull && "w-full"} relative  ${isHidden && "hidden"}`}>
      <textarea
        autoComplete="false"
        id={id}
        disabled={disabled}
        pattern={pattern}
        defaultValue={defaultValue}
        value={value}
        placeholder={label}
        required={required}
        {...register(id)}
        className={`peer -mb-[5px] w-full outline-none font-light border-[1px] dark:border-neutral-600 min-h-[75px] max-h-[300px]  focus-visible:ring-1 focus-visible:ring-sky-500 border-neutral-300 transition disabled:opacity-70  disabled:cursor-not-allowed  ${className} 
        ${roundFull ? "rounded-full" : "rounded-[35px]"}
        ${
          errors[id]
            ? "ring-1 ring-rose-400"
            : "focus-visible:ring-1 focus-visible:ring-secondary"
        }
        ${smallPad ? "p-2" : "p-4"}
        ${mediumPad && "p-3"}
     
        `}
        ref={ref}
      />
    </div>
  );
};

export default memo(forwardRef(Textarea));
