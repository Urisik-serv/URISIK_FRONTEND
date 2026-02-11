import Right from "../../assets/icons/chevron-right-gray.svg";
import { useNavigate } from "react-router-dom";
import type { MealType } from "../../types/meal-plan";

type DateMenu = {
  dayOfWeek: string;
  id: number;
  imageUrl: string;
  ingredients: string;
  mealType: MealType;
  title: string;
  type: string;
};
type DateMenuListProps = {
  isSelect?: boolean;
  data: DateMenu[];
};

export default function DateMenuList({
  isSelect = true,
  data,
}: DateMenuListProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`w-[294px] border-[1.5px] rounded-[18px] ${isSelect ? "bg-white border-primary-700" : "bg-gray-50 border-gray-350"}`}
    >
      <div className="flex flex-col gap-[10px]">
        {data.map((data) => (
          <div className="flex flex-col gap-4 p-4">
            <div className="flex gap-[14px]">
              <img
                src={data.imageUrl}
                alt="음식 이미지"
                className="size-[66px] rounded-lg object-cover"
              />
              <div className="flex flex-1 flex-col justify-between gap-1.5">
                <p className="font-semibold text-[14px] tracking-[-0.02em] text-gray-800">
                  {data.title}
                </p>
                <p className="font-normal text-[12px] text-gray-800 leading-[18px]">
                  {data.ingredients}
                </p>
                <div className="flex justify-end pt-1.5">
                  <button
                    className="flex items-center font-semibold cursor-pointer text-[14px] text-gray-800"
                    onClick={() => navigate(`/menu-information/${data.id}`)}
                  >
                    레시피 자세히 보기 <img src={Right} alt="화살표 아이콘" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
