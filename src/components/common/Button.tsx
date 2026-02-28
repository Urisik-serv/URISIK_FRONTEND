import type { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonType {
  children: ReactElement | string;
  size: "Btn_L" | "Btn_M" | "Btn_S";
  variant: "primary" | "gray" | "transparent";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className: string;
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

const Button = ({
  children = "",
  size = "Btn_M",
  variant = "primary",
  disabled = false,
  onClick,
  type,
  className,
}: ButtonType) => {
  const sizeClass = SIZES[size];
  const variantClass = VARIANTS[variant];
  const disabledClass = disabled && "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={twMerge(
        `rounded-xl flex justify-center items-center ${sizeClass} ${variantClass} ${disabledClass} ${className}`,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
