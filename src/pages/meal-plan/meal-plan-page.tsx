import { useEffect, useState } from "react";
import HomeHeader from "../../components/header/HomeHeader";
import TodayMeal from "../../components/meal-plan/TodayMeal";
import WeekMeal from "../../components/meal-plan/WeekMeal";
import { useSearchParams } from "react-router-dom";
import selectedSun from "../../assets/icons/sun-selected.svg";
import unselectedSun from "../../assets/icons/sun-unselected.svg";
import selectedMoon from "../../assets/icons/moon-selected.svg";
import unselectedMoon from "../../assets/icons/moon-unselected.svg";
import useGetTodayMealPlan from "../../hooks/queries/use-get-today-meal-plan";
import { useFamilyStore } from "../../stores/use-family-store";
import EmptyState from "../../components/common/EmptyState";

const MealPlanPage = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [tab, setTab] = useState<"오늘의 식단" | "이번주 식단" | "다음주 식단">(
    tabParam === "nextWeek" ? "다음주 식단" : "오늘의 식단",
  );
  const [todayTab, setTodayTab] = useState<"점심" | "저녁">("점심");
  const { familyRoomId } = useFamilyStore.getState();

  const { data: todayData, isError } = useGetTodayMealPlan(familyRoomId);
  console.log(todayData);
  useEffect(() => {
    if (todayData?.result?.meals.length == 1) {
      if (todayData.result.meals[0].mealType === "DINNER") setTodayTab("저녁");
    }
  }, [todayData?.result?.meals]);

  const lunchData = todayData?.result.meals.find(
    (data) => data.mealType === "LUNCH",
  );
  const dinnerData = todayData?.result.meals.find(
    (data) => data.mealType === "DINNER",
  );
  const tabData = todayTab === "점심" ? lunchData : dinnerData;
  return (
    <div>
      <HomeHeader />
      <div className="p-4 mt-1">
        <div className="w-full flex font-medium text-[14px] h-[42px]">
          <button
            className={`flex-1 cursor-pointer border-b-1 ${tab === "오늘의 식단" ? "bg-primary-700 border-primary-700 rounded-t-lg text-white" : "bg-white text-gray-300 border-gray-300"}`}
            onClick={() => setTab("오늘의 식단")}
          >
            오늘의 식단
          </button>
          <button
            className={`flex-1 cursor-pointer border-b-1 ${tab === "이번주 식단" ? "bg-primary-700 border-primary-700 rounded-t-lg text-white" : "bg-white text-gray-300 border-gray-300"}`}
            onClick={() => setTab("이번주 식단")}
          >
            이번주 식단
          </button>
          <button
            className={`flex-1 cursor-pointer border-b-1 ${tab === "다음주 식단" ? "bg-primary-700 border-primary-700 rounded-t-lg text-white" : "bg-white text-gray-300 border-gray-300"}`}
            onClick={() => setTab("다음주 식단")}
          >
            다음주 식단
          </button>
        </div>
        {tab === "오늘의 식단" && (
          <>
            <div className="flex pt-4 w-full font-[14px] font-medium">
              <button
                className={`py-2 w-full rounded-lg flex flex-col items-center ${todayTab === "점심" ? "bg-primary-100 text-primary-700" : "text-gray-350 cursor-pointer"}`}
                onClick={() => setTodayTab("점심")}
              >
                <img
                  src={todayTab === "점심" ? selectedSun : unselectedSun}
                  className="size-5"
                />
                점심
              </button>
              <button
                className={`py-2 w-full rounded-lg flex flex-col items-center ${todayTab === "저녁" ? "bg-primary-100 text-primary-700" : "text-gray-350 cursor-pointer"}`}
                onClick={() => setTodayTab("저녁")}
              >
                <img
                  src={todayTab === "저녁" ? selectedMoon : unselectedMoon}
                  className="size-5"
                />
                저녁
              </button>
            </div>
            {isError || tabData === undefined ? (
              <div className="pt-27">
                <EmptyState text={`${todayTab}식단이 생성되지 않았어요.`} />
              </div>
            ) : (
              <TodayMeal data={tabData} />
            )}
          </>
        )}
        {tab == "이번주 식단" && <WeekMeal weekType="THIS" />}
        {tab == "다음주 식단" && <WeekMeal weekType="NEXT" />}
      </div>
    </div>
  );
};

export default MealPlanPage;
