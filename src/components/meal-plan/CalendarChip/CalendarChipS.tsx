import { useState } from "react";

type CalendarChipSProps = {
  text: string;
  type: "select" | "primary" | "gray";
};

export default function CalendarChipS({ text, type }: CalendarChipSProps) {
  const [select, setSelect] = useState(false);
  let className =
    "w-[38px] h-9 rounded-xl flex items-center justify-center font-semibold border ";

  if (type === "primary") {
    className += "bg-primary-700 text-white";
  } else if (type === "gray") {
    className += "bg-gray-400 text-gray-50";
  } else {
    // type === "select"
    if (select) {
      className += "bg-primary-700 text-white cursor-pointer";
    } else {
      className +=
        "bg-white text-primary-700 border-primary-700 cursor-pointer";
    }
  }

  const handleClick = () => {
    if (type === "select") setSelect(!select);
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {text}
    </button>
  );
}
