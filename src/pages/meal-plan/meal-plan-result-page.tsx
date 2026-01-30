import PublicHeader from "../../components/header/PublicHeader";
import TryAgain from "../../assets/icons/try-again.svg";
import { useNavigate } from "react-router-dom";
import CalendarChipM from "../../components/meal-plan/CalendarChip/CalendarChipM";
import MenuChip from "../../components/meal-plan/MenuChip";
import AlertModal from "../../components/common/AlertModal";
import { useState } from "react";

const MealPlanResultPage = () => {
  const data = [
    { day: "월", menus: ["바나나", "김밥"] },
    { day: "화", menus: ["귤", "김밥", "김밥"] },
    { day: "수", menus: ["귤", "김밥", "김밥"] },
    { day: "목", menus: ["귤"] },
    { day: "금", menus: ["김밥"] },
    { day: "토", menus: ["귤", "김밥", "김밥"] },
    { day: "일", menus: ["귤", "김밥"] },
  ]; //임시 데이터
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <PublicHeader title={"식단표 생성"} />
      {isOpen && (
        <AlertModal
          title=""
          boldContent={`[다음주 식단]에\n저장되었습니다.`}
          mediumContent="식단표로 이동하시겠습니까?"
          buttonText="확인"
          outsideText="탭해서 닫기"
          onButtonClick={() => navigate(`/meal-plan`)}
          onOutsideClick={() => navigate(`/`)}
        />
      )}
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
        {data.map((data) => {
          return (
            <div className="flex flex-col items-center gap-3">
              <CalendarChipM text={data.day} />
              {data.menus.map((menu) => {
                return <MenuChip text={menu} />;
              })}
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
};

export default MealPlanResultPage;
