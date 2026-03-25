type CalendarChipSProps = {
  text: string;
  type: "select" | "primary" | "gray";
  isSelect?: boolean;
  onClick?: () => void;
};

export default function CalendarChipS({
  text,
  type,
  isSelect,
  onClick,
}: CalendarChipSProps) {
  let className =
    "w-[38px] h-9 rounded-xl flex items-center justify-center font-semibold border ";

  if (type === "primary") {
    className += "bg-primary-700 text-white";
  } else if (type === "gray") {
    className += "bg-gray-50 text-gray-400 border-0";
  } else {
    // type === "select"
    if (isSelect) {
      className += "bg-primary-700 text-white cursor-pointer";
    } else {
      className +=
        "bg-white text-primary-700 border-primary-700 cursor-pointer";
    }
  }

  return (
    <button
      type="button"
      className={className}
      onClick={type === "select" ? onClick : undefined}
    >
      {text}
    </button>
  );
}
