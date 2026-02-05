import TryAgain from "../../assets/icons/try-again.svg";
import CalendarChipM from "../../components/meal-plan/CalendarChip/CalendarChipM";
import MenuChip from "../../components/meal-plan/MenuChip";
import AlertModal from "../../components/common/AlertModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type MealPlanResultProps = {
  onClick: () => void;
};

type slotItem = {
  id: number;
  title: string;
  mealType: "LUNCH" | "DINNER";
  dayOfWeek: string;
};
type mealPlanResponse = Record<string, slotItem[]>;
const dayKor: Record<string, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};
export default function MealPlanResult({ onClick }: MealPlanResultProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const response = sessionStorage.getItem("mealPlan");
  if (!response) {
    alert("올바른 접근이 아닙니다. 식단 생성부터 해주세요!");
    return;
  }
  const data = JSON.parse(response) as mealPlanResponse;
  console.log(data);

  const handleButton = () => {
    navigate(`/meal-plan?tab=nextWeek`);
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
          onClick={handleButton}
          handleModal={() => navigate(`/`)}
        />
      )}
      <p className="pl-4 pt-6 font-semibold text-[24px] text-[#333333] pb-4 whitespace-pre-line">
        우리가족을 위한 식단표가 {"\n"}생성되었어요.
      </p>
      <div className="flex justify-end pr-[14px]">
        <button
          className="flex gap-1 p-[10px] bg-[#efefef] rounded-lg font-medium text-[16px] cursor-pointer"
          onClick={onClick}
        >
          <img src={TryAgain} alt="다시 생성하기 아이콘" />
          다시 생성하기
        </button>
      </div>
      <div className="flex gap-2 pt-2 px-4 overflow-x-auto">
        {Object.entries(data).map(([day, slots]) => {
          const date = dayKor[day] ?? day;
          return (
            <div className="flex flex-col items-center gap-3" key={day}>
              <CalendarChipM text={date} />
              {slots.map((slot) => (
                <MenuChip text={slot.title} key="slot" />
              ))}
            </div>
          );
        })}
      </div>
      <div className="w-full max-w-[375px] fixed left-1/2 -translate-x-1/2 bottom-11 flex gap-3 px-4 font-semibold text-[20px]">
        <button
          className="w-full h-14 rounded-xl cursor-pointer bg-gray-200 text-gray-400"
          onClick={() => navigate(`/meal-plan/edit`)}
        >
          수정
        </button>
        <button
          className="w-full h-14 rounded-xl cursor-pointer bg-primary-700 text-white"
          onClick={() => setIsOpen(true)}
        >
          완료
        </button>
      </div>
    </div>
  );
}
