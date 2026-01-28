import CalendarChipS from "./CalendarChip/CalendarChipS";
import DateMenuList from "./DateMenuList";
import ListHeader from "./ListHeader";

export default function ThisWeekMeal() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <>
      <div className="pt-[33px] pb-[11px]">
        <ListHeader title="1월 첫째주" date="2026.1.2~1.7" />
      </div>
      <div className="flex flex-col gap-3 pb-30">
        {week.map((day) => (
          <div className="flex gap-3">
            {day == "일" ? (
              <CalendarChipS text={day} type="primary" />
            ) : (
              <CalendarChipS text={day} type="gray" />
            )}
            {day == "일" ? <DateMenuList /> : <DateMenuList isSelect={false} />}
          </div>
        ))}
      </div>
    </>
  );
}
