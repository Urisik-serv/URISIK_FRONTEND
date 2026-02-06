interface SmallButtonProps {
  onClick?: () => void;
  text: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function SmallButton({
  onClick,
  text,
  type,
  disabled,
}: SmallButtonProps) {
  return (
    <button
      className="w-[237px] h-[42px] px-[10px] py-[16px] flex items-center justify-center gap-[10px]  bg-[#FF885A] rounded-xl  text-white font-semibold text-[16px] leading-[24px] text-center cursor-pointer"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
