import MenuChip from "./MenuChip";

type DayMenuChipProps = {
  day: string;
};
export default function DayMenuChip({ day }: DayMenuChipProps) {
  const show = day === "금" || day === "토" || day === "일";

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="flex items-center font-medium text-[18px] h-[47px]">
        {day}
      </p>
      <MenuChip />
      {show && <MenuChip />}
    </div>
  );
}
