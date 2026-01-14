import PublicHeader from "../../components/header/PublicHeader";
import TryAgain from "../../assets/icons/try-again.svg";
import DayMenuChip from "../../components/meal-plan/DayMenuChip";
import { useNavigate } from "react-router-dom";

const MealPlanResultPage = () => {
  const week = ["월", "화", "수", "목", "금", "토", "일"];
  const navigate = useNavigate();
  return (
    <div>
      <PublicHeader title={"식단표 생성"} />
      <p className="pl-4 pt-6 font-semibold text-[24px] text-[#333333] pb-4 whitespace-pre-line">
        우리가족을 위한 식단표가 {"\n"}생성되었어요.
      </p>
      <div className="flex justify-end pr-[14px]">
        <button className="flex gap-1 p-[10px] bg-[#efefef] rounded-lg font-medium text-[16px] cursor-pointer">
          <img src={TryAgain} alt="다시 생성하기 아이콘" />
          다시 생성하기
        </button>
      </div>
      <div className="flex gap-2 pt-2 px-4 overflow-x-auto">
        {week.map((day) => (
          <DayMenuChip key={day} day={day} />
        ))}
      </div>
      <div className="w-full max-w-[375px] fixed left-1/2 -translate-x-1/2 bottom-11 flex gap-3 px-4 font-semibold text-[20px]">
        <button className="w-full h-14 rounded-xl cursor-pointer bg-gray-200 text-gray-400">
          수정
        </button>
        <button
          className="w-full h-14 rounded-xl cursor-pointer bg-primary-700 text-white"
          onClick={() => navigate(`/`)}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default MealPlanResultPage;
