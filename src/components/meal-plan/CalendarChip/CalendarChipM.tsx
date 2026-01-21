type CalendarChipMProps = {
  text: string;
  selectable?: boolean;
  isSelect?: boolean;
  onClick?: () => void;
};

export default function CalendarChipM({
  text,
  selectable,
  isSelect = false,
  onClick,
}: CalendarChipMProps) {
  return (
    <button
      className={`flex justify-center items-center w-[49px] h-[47px] font-medium text-[18px] rounded-lg shrink-0
        ${isSelect ? "bg-primary-700 text-white" : "bg-white text-black"}
        ${selectable ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
