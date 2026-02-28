import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "Btn_L" | "Btn_M" | "Btn_S";
  variant?: "primary" | "gray" | "transparent";
}

const SIZES = {
  Btn_L: "px-[10px] py-[16px]",
  Btn_S: "px-[24px] py-[6px]",
  Btn_M: "px-[10px] py-[16px]", // padding을 className에 직접 지정 가능
};
const VARIANTS = {
  primary: "bg-primary-700 text-white",
  gray: "bg-gray-100",
  transparent: "bg-transparent border-1 border-primary-700",
};

const Button = forwardRef<HTMLButtonElement, ButtonType>(
  (
    { children, size = "Btn_L", variant = "primary", className, ...props },
    ref,
  ) => {
    const sizeClass = SIZES[size];
    const variantClass = VARIANTS[variant];
    const disabledClass = props.disabled ? "opacity-50 cursor-not-allowed" : "";
    return (
      <button
        ref={ref}
        className={twMerge(
          "rounded-xl flex justify-center items-center transition-colors",
          sizeClass,
          variantClass,
          disabledClass,
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
export default Button;
