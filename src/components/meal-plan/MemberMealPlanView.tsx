import Background from "../../assets/icons/member-meal-background.svg";

export default function MemberMealPlanView() {
  return (
    <div className="flex flex-col items-center justify-center pt-35">
      <p className="font-semibold text-primary-700 text-[14px] pb-4">
        방장이 식단을 생성하고 있어요.
      </p>
      <p className="font-medium text-[#4d4d4d] text-[18px] text-center whitespace-pre-line pb-10">
        가족원의 위시리스트를 기반으로 {"\n"}다음주 식단이 생성돼요.
      </p>
      <img src={Background} alt="가족원 식단화면 배경 아이콘" />
    </div>
  );
}
