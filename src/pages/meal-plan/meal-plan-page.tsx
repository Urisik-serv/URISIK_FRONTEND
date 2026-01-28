import { useState } from "react";
import HomeHeader from "../../components/header/HomeHeader";
import TodayMeal from "../../components/meal-plan/TodayMeal";
import WeekMeal from "../../components/meal-plan/WeekMeal";

const MealPlanPage = () => {
  const [tab, setTab] = useState<"오늘의 식단" | "이번주 식단" | "다음주 식단">(
    "오늘의 식단",
  );
  return (
    <div>
      <HomeHeader />
      <div className="p-4 mt-1">
        <div className="w-full flex font-medium text-[14px] h-[42px]">
          <button
            className={`flex-1 cursor-pointer border-b-1 ${tab === "오늘의 식단" ? "bg-gray-50 text-primary-700 border-primary-700" : "bg-white text-gray-300 border-gray-300"}`}
            onClick={() => setTab("오늘의 식단")}
          >
            오늘의 식단
          </button>
          <button
            className={`flex-1 cursor-pointer border-b-1 ${tab === "이번주 식단" ? "bg-gray-50 text-primary-700 border-primary-700" : "bg-white text-gray-300 border-gray-300"}`}
            onClick={() => setTab("이번주 식단")}
          >
            이번주 식단
          </button>
          <button
            className={`flex-1 cursor-pointer border-b-1 ${tab === "다음주 식단" ? "bg-gray-50 text-primary-700 border-primary-700" : "bg-white text-gray-300 border-gray-300"}`}
            onClick={() => setTab("다음주 식단")}
          >
            다음주 식단
          </button>
        </div>
        {tab === "오늘의 식단" && <TodayMeal />}
        {tab == "이번주 식단" && <WeekMeal />}
        {tab == "다음주 식단" && <WeekMeal />}
      </div>
    </div>
  );
};

export default MealPlanPage;
