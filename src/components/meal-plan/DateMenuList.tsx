import ShrimpMushroom from "../../assets/sample/shrimp-mushroom.png";
import Right from "../../assets/icons/chevron-right-gray.svg";
import { useNavigate } from "react-router-dom";

type DateMenuListProps = {
  isSelect?: boolean;
};

export default function DateMenuList({ isSelect = true }: DateMenuListProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`w-[294px] h-[190px] p-4 flex flex-col gap-4 border-[1.5px] rounded-[18px] ${isSelect ? "bg-white border-primary-700" : "bg-gray-50 border-gray-350"}`}
    >
      <div className="flex gap-[14px]">
        <img
          src={ShrimpMushroom}
          alt="음식 이미지"
          className="size-[66px] rounded-lg object-cover"
        />
        <div className="flex flex-1 flex-col justify-between">
          <p className="font-semibold text-[14px] tracking-[-0.02em]">
            새우대신 고소한 병아리콩 볶음밥!
          </p>
          <p className="font-normal text-[12px] text-gray-800">
            새우볶음밥 느낌 그대로, 갑각류 없이도 씹는 맛은 살렸어요.
          </p>
        </div>
      </div>
      <div className="flex gap-[22px]">
        <p className="shrink-0 w-[56px] h-[21px] font-semibold tracking-[-0.02em] text-center text-[14px]">
          식재료
        </p>
        <p className="font-normal text-[12px] text-gray-600">
          바나나 한묶음, 코코넛 밀크 3개, 해바라기 소스 3개, 땅콩 3개
        </p>
      </div>
      <div className="flex justify-end">
        <button
          className="flex items-center font-semibold cursor-pointer text-[14px]"
          onClick={() => navigate("/menu-information/101")}
        >
          레시피 자세히 보기 <img src={Right} alt="화살표 아이콘" />
        </button>
      </div>
    </div>
  );
}
