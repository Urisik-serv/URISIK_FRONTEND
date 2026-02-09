import { useEffect, useState } from "react";
import { type DayOfWeek, type SlotRequest } from "../../types/meal-plan";
import CalenderChip from "./CalendarChip/CalendarChipS";

type ChooseWeekProps = {
  mealTime: "점심" | "저녁";
  onChangeSelected: (slots: SlotRequest[]) => void;
};

const week: { label: string; value: DayOfWeek }[] = [
  { label: "월", value: "MONDAY" },
  { label: "화", value: "TUESDAY" },
  { label: "수", value: "WEDNESDAY" },
  { label: "목", value: "THURSDAY" },
  { label: "금", value: "FRIDAY" },
  { label: "토", value: "SATURDAY" },
  { label: "일", value: "SUNDAY" },
];

export default function ChooseWeek({
  mealTime,
  onChangeSelected,
}: ChooseWeekProps) {
  const mealType = mealTime === "점심" ? "LUNCH" : "DINNER";

  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  useEffect(() => {
    const slots: SlotRequest[] = selectedDays.map((d) => ({
      dayOfWeek: d,
      mealType,
    }));
    onChangeSelected(slots);
  }, [selectedDays, mealType, onChangeSelected]);

  return (
    <div>
      <p className="text-[18px] font-medium">{mealTime} 식사</p>
      <div className="flex gap-3 pt-3">
        {week.map((day, idx) => (
          <CalenderChip
            key={idx}
            text={day.label}
            type="select"
            isSelect={selectedDays.includes(day.value)}
            onClick={() => toggleDay(day.value)}
          />
        ))}
      </div>
    </div>
  );
}
