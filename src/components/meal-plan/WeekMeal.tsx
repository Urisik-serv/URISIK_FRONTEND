import useGetWeekMealPlan from "../../hooks/queries/use-get-week-meal";
import { useFamilyStore } from "../../stores/use-family-store";
import { useProfileStore } from "../../stores/use-profile-store";
import { changeAdditionalProp } from "../../utils/changeAdditionalProp";
import { getNextMonday, getThisMonday, getWeekOfMonth } from "../../utils/date";
import EmptyState from "../common/EmptyState";
import CalendarChipS from "./CalendarChip/CalendarChipS";
import DateMenuList from "./DateMenuList";
import ListHeader from "./ListHeader";

export type weekMealProps = {
  weekType: "THIS" | "NEXT";
};
export default function WeekMeal({ weekType }: weekMealProps) {
  const { familyRoomId } = useFamilyStore();
  const isLeader = useProfileStore().isLeader;
  console.log(isLeader);
  const baseDate = new Date();
  const date =
    weekType === "THIS" ? getThisMonday(baseDate) : getNextMonday(baseDate); //이번주/다음주 시작 월요일 날짜
  const { data, isError, isLoading } = useGetWeekMealPlan(familyRoomId!, date);
  if (isError) {
    return (
      <div className="pt-43">
        {isLeader ? (
          <EmptyState
            text="아직 식단이 생성되지 않았어요"
            buttonText="식단 생성"
          />
        ) : (
          <EmptyState
            text="아직 식단이 생성되지 않았어요"
            primaryText="방장이 식단을 생성하고 있어요"
          />
        )}
      </div>
    );
  }
  if (isLoading) {
    return <div>로딩스피너 추가 예정</div>;
  }
  const weekData = changeAdditionalProp(data?.result.slots || {}, "WEEK");
  const listHeaderDate =
    date + "~" + date[5] + date[6] + "." + (Number(date[8] + date[9]) + 6);
  const { month, weekKor } = getWeekOfMonth(new Date(date));

  const dayKorMap: Record<string, string> = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };
  const dayNames = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  const todayIdx = new Date().getDay();
  const adjustedIdx = todayIdx === 0 ? 6 : todayIdx - 1;
  //오늘~앞으로 날
  const futureDays = dayNames.slice(adjustedIdx).map((day) => ({
    dayKor: dayKorMap[day],
    meals: weekData[day] || [],
  }));

  //지난 날
  const pastDays = dayNames.slice(0, adjustedIdx).map((day) => ({
    dayKor: dayKorMap[day],
    meals: weekData[day] || [],
  }));
  return (
    <>
      <div className="pt-[33px] pb-[11px]">
        <ListHeader title={`${month}월 ${weekKor}`} date={listHeaderDate} />
      </div>
      <div className="flex flex-col gap-3 pb-30">
        {futureDays.map((day) => {
          if (day.meals.length > 0) {
            return (
              <div className="flex gap-3">
                <CalendarChipS text={day.dayKor} type="primary" />
                <DateMenuList isSelect={true} data={day.meals} />
              </div>
            );
          }
        })}
        {pastDays.map((day) => {
          if (day.meals.length > 0) {
            return (
              <div className="flex gap-3">
                <CalendarChipS text={day.dayKor} type="gray" />
                <DateMenuList isSelect={false} data={day.meals} />
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
