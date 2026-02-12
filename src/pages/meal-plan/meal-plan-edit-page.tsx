import { useEffect, useRef, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import CalendarChipM from "../../components/meal-plan/CalendarChip/CalendarChipM";
import MenuChip from "../../components/meal-plan/MenuChip";
import BottomSheet from "../../components/meal-plan/BottomSheet";
import { useSearchParams } from "react-router-dom";
import {
  type Updates,
  type DayOfWeek,
  type MealType,
  type SlotItem,
} from "../../types/meal-plan";
import { useFamilyStore } from "../../stores/use-family-store";
import { patchEditMealPlans, postConfirmMealPlan } from "../../api/meal-plan";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type mealPlanResponse = Record<string, SlotItem[]>;

const MealPlanEditPage = () => {
  const [updates, setUpdates] = useState<Updates[]>([]);
  const { familyRoomId } = useFamilyStore.getState();
  const mealPlanId = Number(sessionStorage.getItem("mealPlanId"));
  const navigate = useNavigate();

  //생성한 식단 가져오기
  const [mealPlan, setMealPlan] = useState<mealPlanResponse | null>(() => {
    const response = sessionStorage.getItem("mealPlan");
    if (!response) return null;

    try {
      return JSON.parse(response) as mealPlanResponse;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const response = sessionStorage.getItem("mealPlan");
    if (!response) {
      toast.error("올바른 접근이 아닙니다. 식단 생성부터 해주세요.");
      navigate("/");
    }
  }, [navigate]);

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

  //바텀 시트 열고 닫기
  const [open, setOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const weekParam = searchParams.get("week");

  //바텀 시트가 열린 적이 없으면 최초 실행시에 자동으로 열리는 애니메이션
  const hasOpenedRef = useRef(false);
  useEffect(() => {
    if (selected.mealType !== null && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      const timer = setTimeout(() => {
        setOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selected]);

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

  //바꾸기 눌렀을 때 ui 수정/정보 저장
  const changeMenu = (
    id: number,
    title: string,
    type: "RECIPE" | "TRANSFORMED_RECIPE",
  ) => {
    if (!selected.day || !selected.mealType) return; //기존의 메뉴 선택x경우

    //ui
    setMealPlan((prev) => {
      if (!prev) return prev;
      const changeDay = selected.day as string;
      const changeSlot = prev[changeDay].map((slot) =>
        slot.mealType === selected.mealType ? { ...slot, title } : slot,
      ); //제목 교체

      return { ...prev, [changeDay]: changeSlot }; //선택한 슬롯만 제목 change
    });

    //update
    setUpdates((prev) => {
      const newUpdate: Updates = {
        selectedSlot: {
          mealType: selected.mealType as MealType,
          dayOfWeek: selected.day as DayOfWeek,
        },
        selectedRecipe: { type, id },
      }; //객체로 묶기
      const filter = prev.filter(
        (prev) =>
          !(
            prev.selectedSlot.dayOfWeek === selected.day &&
            prev.selectedSlot.mealType === selected.mealType
          ), // 이미 있는 경우 제외
      );
      return [...filter, newUpdate];
    });
    setOpen(false);
  };

  const handleSubmit = async () => {
    const updateList = updates;
    try {
      if (familyRoomId == null || mealPlanId == null) {
        return;
      }
      await patchEditMealPlans({
        familyRoomId: familyRoomId,
        mealPlanId: mealPlanId,
        updates: updateList,
      });
      await postConfirmMealPlan({
        familyRoomId: familyRoomId,
        mealPlanId: mealPlanId,
      });
      sessionStorage.removeItem("mealPlan");
      navigate(`/meal-plan?tab=nextWeek`);
    } catch (e) {
      toast.error("다시 시도해주세요" + e);
    }
  };

  return (
    <div>
      <PublicHeader title={"식단 수정"} />
      <p className="pl-4 pt-6 font-semibold text-[24px] text-[#333333] pb-11 whitespace-pre-line">
        수정하고 싶은 요일을 선택하고,{"\n"}내가 원하는 메뉴로 바꿔요.
      </p>
      <div className="flex gap-2 pb-[27px] overflow-x-auto pr-4">
        <div className="flex flex-col items-center gap-3 font-medium text-gray-500 text-[14px]">
          <CalendarChipM text="" />
          <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
            점심
          </p>
          <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
            저녁
          </p>
        </div>
        {mealPlan &&
          Object.entries(mealPlan).map(([day, slots]) => {
            const isDaySelected = selected.day === day;
            const isLunchSelected = selected.mealType === "LUNCH";
            const isDinnerSelected = selected.mealType === "DINNER";

            const date = dayKor[day] ?? day;
            const lunch = slots.find((slot) => slot.mealType === "LUNCH");
            const dinner = slots.find((slot) => slot.mealType === "DINNER");
            return (
              <div className="flex flex-col items-center gap-3" key={day}>
                <CalendarChipM text={date} isSelect={isDaySelected} />
                {lunch ? (
                  <MenuChip
                    text={lunch.title}
                    clickable={true}
                    isSelect={isDaySelected && isLunchSelected}
                    onClick={() => handleSelect(day, "LUNCH")}
                  />
                ) : (
                  <div className="w-[75px] h-[82px]" />
                )}
                {dinner ? (
                  <MenuChip
                    text={dinner.title}
                    clickable={true}
                    isSelect={isDaySelected && isDinnerSelected}
                    onClick={() => handleSelect(day, "DINNER")}
                  />
                ) : (
                  <div className="w-[75px] h-[82px]" />
                )}
              </div>
            );
          })}
      </div>
      <BottomSheet
        open={open}
        weekParam={weekParam}
        changeMenu={changeMenu}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MealPlanEditPage;
