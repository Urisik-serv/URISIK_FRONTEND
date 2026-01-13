import Button from "../../components/common/Button";
import HomeHeader from "../../components/header/HomeHeader";
import ChooseWeek from "../../components/meal-plan/chooseWeek";
import MemberMealPlanView from "../../components/meal-plan/MemberMealPlanView";

const MealPlanPage = () => {
  const isMember = false; // true로 바꾸면 가족원 화면을 볼 수 있습니다.
  return (
    <div>
      <HomeHeader />
      {isMember ? (
        <MemberMealPlanView />
      ) : (
        <div className="px-4 pt-6">
          <p className="font-semibold text-[24px] text-[#333333] pb-2">
            요일별 식사 횟수를 선택해요.
          </p>
          <p className="font-medium text-[16px] text-[#929292] pb-11 whitespace-pre-line">
            가족원의 위시리스트를 기반으로 {"\n"} 다음주 식단을 생성돼요.
          </p>
          <div className="flex flex-col gap-5">
            <ChooseWeek mealTime="점심" />
            <ChooseWeek mealTime="저녁" />
          </div>
          <div className="fixed bottom-11">
            <Button text="식단 생성" type="button" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanPage;
