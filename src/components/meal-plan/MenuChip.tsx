type MenuChipProps = {
  clickable?: boolean;
  text: string;
  isSelect?: boolean;
  onClick?: () => void;
};

export default function MenuChip({
  clickable = false,
  text,
  isSelect,
  onClick,
}: MenuChipProps) {
  return (
    <div
      className={`w-[66px] h-[62px] rounded-xl flex justify-center items-center text-center font-medium text-[14px] whitespace-pre-line 
    ${isSelect ? "bg-primary-100 border border-[1.5px] border-primary-700" : "bg-[#f6f6f6]"}
    ${clickable ? "cursor-pointer" : ""}`}
      onClick={clickable ? onClick : undefined}
    >
      {text}
    </div>
  );
}
