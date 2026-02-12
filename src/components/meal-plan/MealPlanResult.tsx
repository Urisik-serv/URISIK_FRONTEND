import TryAgain from "../../assets/icons/try-again.svg";
import CalendarChipM from "../../components/meal-plan/CalendarChip/CalendarChipM";
import MenuChip from "../../components/meal-plan/MenuChip";
import AlertModal from "../../components/common/AlertModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SlotItem } from "../../types/meal-plan";
import { useFamilyStore } from "../../stores/use-family-store";
import { postConfirmMealPlan } from "../../api/meal-plan";
import toast from "react-hot-toast";

type MealPlanResultProps = {
  mealPlanId: number;
  onClick: () => void;
  weekParam: string | null;
  isLoading;
};

type mealPlanResponse = Record<string, SlotItem[]>;
const dayKor: Record<string, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

export default function MealPlanResult({
  mealPlanId,
  onClick,
  weekParam,
  isLoading,
}: MealPlanResultProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const response = sessionStorage.getItem("mealPlan");
  if (isLoading) return null;
  if (!response) {
    toast.error("올바른 접근이 아닙니다. 식단 생성부터 해주세요!");
    return;
  }
  const data = JSON.parse(response) as mealPlanResponse;
  console.log(data);

  const handleButton = () => {
    setIsOpen(true);
  };
  const { familyRoomId } = useFamilyStore.getState();

  const handleClick = async () => {
    try {
      if (familyRoomId == null) {
        alert("familyRoomId 없음");
        return;
      }
      await postConfirmMealPlan({
        familyRoomId: familyRoomId,
        mealPlanId: mealPlanId,
      });
      if (weekParam === "THIS") {
        navigate(`/meal-plan?tab=THIS`);
      } else {
        navigate(`/meal-plan?tab=NEXT`);
      }
      navigate(`/meal-plan?tab=nextWeek`);
    } catch (error) {
      toast.error("주간 식단 확정 실패" + error);
    }
  };
  return (
    <div>
      {isOpen && (
        <AlertModal
          title=""
          boldContent={`생성을 완료하시겠어요?`}
          mediumContent={`완료된 식단표는 [다음주 식단]에 \n저장됩니다.`}
          buttonText="확인"
          outsideText="탭해서 닫기"
          onClick={handleClick}
          handleModal={() => setIsOpen(false)}
        />
      )}
      <p className="pl-4 pt-6 font-semibold text-[24px] text-gray-800 pb-4 whitespace-pre-line">
        우리가족을 위한 식단표가 {"\n"}생성되었어요.
      </p>
      <div className="flex justify-end pr-[14px]">
        <button
          className="flex gap-1 p-[10px] bg-gray-200 rounded-lg font-medium text-[16px] cursor-pointer"
          onClick={onClick}
        >
          <img src={TryAgain} alt="다시 생성하기 아이콘" />
          다시 생성하기
        </button>
      </div>
      <div className="flex gap-2 pt-12 pb-[27px] overflow-x-auto pr-4">
        <div className="flex flex-col items-center gap-3 font-medium text-gray-500 text-[14px]">
          <CalendarChipM text="" />
          <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
            점심
          </p>
          <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
            저녁
          </p>
        </div>
        {Object.entries(data).map(([day, slots]) => {
          const date = dayKor[day] ?? day;
          const lunch = slots.find((slot) => slot.mealType === "LUNCH");
          const dinner = slots.find((slot) => slot.mealType === "DINNER");
          return (
            <div className="flex flex-col items-center gap-3" key={day}>
              <CalendarChipM text={date} />
              {lunch ? (
                <MenuChip text={lunch.title} key="slot" />
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
      <div className="w-full max-w-[375px] fixed left-1/2 -translate-x-1/2 bottom-11 flex gap-3 px-4 font-semibold text-[20px]">
        <button
          className="w-full h-14 rounded-xl cursor-pointer text-primary-700 border border-primary-700"
          onClick={() => navigate(`/meal-plan/edit?week=${weekParam}`)}
        >
          수정
        </button>
        <button
          className="w-full h-14 rounded-xl cursor-pointer bg-primary-700 text-white"
          onClick={handleButton}
        >
          완료
        </button>
      </div>
    </div>
  );
}
