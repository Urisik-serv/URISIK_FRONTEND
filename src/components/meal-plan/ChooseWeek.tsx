import CalenderChip from "./CalendarChip/CalendarChipS";

type ChooseWeekProps = {
  mealTime: "점심" | "저녁";
};

export default function ChooseWeek({ mealTime }: ChooseWeekProps) {
  const week = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div>
      <p className="text-[18px] font-medium">{mealTime} 식사</p>
      <div className="flex gap-3 pt-3">
        {week.map((day) => (
          <CalenderChip key={day} text={day} type="select" />
        ))}
      </div>
    </div>
  );
}
