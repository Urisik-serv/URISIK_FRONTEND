import { useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import CalendarChipM from "../../components/meal-plan/CalendarChip/CalendarChipM";
import IngredientsList from "../../components/meal-plan/IngredientsList";

const MealPlanIngredientsPage = () => {
  const [tab, setTab] = useState<"이번주" | "다음주">("이번주");
  const week = ["전체", "월", "화", "수", "목", "금", "토", "일"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="h-screen flex flex-col">
      <PublicHeader title={"식재료 리스트"} />
      <div className="w-full flex px-4 mt-5 font-semibold text-[18px] h-13">
        <button
          className={`flex-1 cursor-pointer border-b-2 ${tab === "이번주" ? "bg-gray-50 text-primary-700 border-primary-700" : "bg-white text-gray-300 border-gray-300"}`}
          onClick={() => setTab("이번주")}
        >
          이번주
        </button>
        <button
          className={`flex-1 cursor-pointer border-b-2 ${tab === "다음주" ? "bg-gray-50 text-primary-700 border-primary-700" : "bg-white text-gray-300 border-gray-300"}`}
          onClick={() => setTab("다음주")}
        >
          다음주
        </button>
      </div>
      <div className="flex pl-4 gap-1 pt-5 w-full overflow-x-auto">
        {week.map((day, idx) => {
          const isSelect = selectedIndex == idx;
          return (
            <CalendarChipM
              key={day}
              text={day}
              selectable={true}
              isSelect={isSelect}
              onClick={() => setSelectedIndex(idx)}
            />
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-9">
        <IngredientsList selectedIndex={selectedIndex} />
      </div>
      <div className="fixed w-[375px] bottom-0 bg-gradient-to-t from-white to-transparent h-20 z-10" />
    </div>
  );
};

export default MealPlanIngredientsPage;
