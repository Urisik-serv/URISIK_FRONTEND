import { useState } from "react";

type CalendarChipSProps = {
  text: string;
};

export default function CalendarChipS({ text }: CalendarChipSProps) {
  const [select, setSelect] = useState(false);
  return (
    <button
      className={`w-[38px] h-9 border border-primary-700 rounded-xl flex items-center justify-center font-semibold cursor-pointer
        ${select ? "bg-primary-700 text-white" : "bg-white text-primary-700"}`}
      onClick={() => setSelect((prev) => !prev)}
    >
      {text}
    </button>
  );
}
