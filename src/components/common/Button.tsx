import Pencil from "../../assets/icons/pencil-primary-500.svg";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  bgColor?: "primary" | "white";
}

export default function Button({
  onClick,
  text,
  type,
  disabled,
  bgColor = "primary",
}: ButtonProps) {
  return (
    <button
      className={`w-[343px] px-[10px] py-[16px] flex items-center justify-center gap-[10px] rounded-xl font-semibold text-[20px] leading-[22px] text-center cursor-pointer
        ${bgColor == "primary" ? "bg-primary-700 text-white" : "bg-white text-primary-500 border border-primary-500"}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {bgColor === "white" && <img src={Pencil} />}
      {text}
    </button>
  );
}
