import { useEffect, useRef, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import CalendarChipM from "../../components/meal-plan/CalendarChip/CalendarChipM";
import MenuChip from "../../components/meal-plan/MenuChip";
import BottomSheet from "../../components/meal-plan/BottomSheet";
import type { MealType, SlotItem } from "../../types/meal-plan";

type mealPlanResponse = Record<string, SlotItem[]>;

const MealPlanEditPage = () => {
  const dayKor: Record<string, string> = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };

  //수정하려고 하는 메뉴(선택된 메뉴)
  const [selected, setSelected] = useState<{
    day: string | null;
    mealType: MealType | null;
  }>({ day: null, mealType: null });

  const [open, setOpen] = useState(false);

  //바텀 시트가 열린 적이 없으면 최초 실행시에 자동으로 열리는 애니메이션
  const hasOpenedRef = useRef(false);
  useEffect(() => {
    if (selected.mealType !== null && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  //생성한 식단 데이터 가져오기
  const response = sessionStorage.getItem("mealPlan");
  if (!response) {
    alert("올바른 접근이 아닙니다. 식단 생성부터 해주세요!");
    return;
  }
  const data = JSON.parse(response) as mealPlanResponse;

  //선택한 것 확인
  const handleSelect = (day: string, mealType: MealType) => {
    const isAlreadySelected =
      selected.day === day && selected.mealType === mealType;
    if (isAlreadySelected) {
      setSelected({ day: null, mealType: null });
    } else {
      setSelected({ day, mealType });
    }
  };
  return (
    <div>
      <PublicHeader title={"식단 수정"} />
      <p className="pl-4 pt-6 font-semibold text-[24px] text-[#333333] pb-4 whitespace-pre-line">
        수정하고 싶은 요일을 선택하고,{"\n"}내가 원하는 메뉴로 바꿔요.
      </p>
      <div className="flex gap-2 pt-2 px-4 overflow-x-auto">
        <div className="flex gap-2 pt-12 pb-[27px] overflow-x-auto">
          <div className="flex flex-col items-center gap-3 font-medium text-gray-500 text-[14px]">
            <CalendarChipM text="" />
            <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
              점심
            </p>
            <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
              저녁
            </p>
          </div>
          {Object.entries(data).map(([day, slots], dayIndex) => {
            const isDaySelected = selected.day === day;

            const date = dayKor[day] ?? day;
            const lunch = slots.find((slot) => slot.mealType === "LUNCH");
            const dinner = slots.find((slot) => slot.mealType === "DINNER");
            return (
              <div className="flex flex-col items-center gap-3" key={day}>
                <CalendarChipM text={date} isSelect={isDaySelected} />
                {lunch ? (
                  <MenuChip text={lunch.title} clickable={true} isSelect />
                ) : (
                  <div className="w-[75px] h-[82px]" />
                )}
                {dinner ? (
                  <MenuChip text={dinner.title} key="slot" />
                ) : (
                  <div className="w-[75px] h-[82px]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <BottomSheet open={open} />
    </div>
  );
};

export default MealPlanEditPage;
