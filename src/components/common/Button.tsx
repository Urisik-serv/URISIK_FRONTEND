interface ButtonProps {
  onClick?: () => void;
  text: String;
  type: "button" | "submit" | "reset";
}

export default function Button({ onClick, text, type }: ButtonProps) {
  return (
    <button
      className="w-[343px] px-[10px] py-[16px] flex items-center justify-center gap-[10px]  bg-[#FF885A] rounded-xl font-sans text-white font-semibold text-[20px] leading-[22px] text-center"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
