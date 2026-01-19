type CalendarChipMProps = {
  text: string;
  isSelect: boolean;
};

export default function CalendarChipM({ text, isSelect }: CalendarChipMProps) {
  return (
    <button
      className={`flex justify-center items-center w-[49px] h-[47px] font-medium text-[18px] rounded-lg
        ${isSelect ? "bg-primary-700 text-white" : "bg-white text-black"}`}
    >
      {text}
    </button>
  );
}
