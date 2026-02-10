import type { DetailRecipe } from "../../../types/recipes";
import MenuInfo from "../../common/MenuInfo";
import Rate from "../../common/Rate";

interface DetailContentProps {
  recipe?: DetailRecipe;
}
const DetailContent = ({ recipe }: DetailContentProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold pb-3 leading-9 text-gray-800">
        {recipe?.title}
      </h1>
      <div className="flex justify-start gap-2 pb-10">
        <p className="text-gray-400 text-base font-medium leading-6">
          {recipe?.category}
        </p>
        <Rate px={16} rate={recipe?.avgScore} />
      </div>
      <div className="pb-6">
        <div className="flex gap-1 px-3 py-2.5 bg-gray-50 rounded-lg flex-col">
          <div className="flex flex-row gap-2">
            <p className="text-gray-800 text-[14px] font-medium leading-6">
              알레르기 위험도
            </p>
            <p
              className={`text-white text-xs font-semibold leading-4 px-[7px] py-px flex items-center rounded-xl ${recipe?.allergyWarning.hasRisk ? "bg-primary-700" : "bg-teal-400"}`}
            >
              {recipe?.allergyWarning.hasRisk ? "위험" : "안전"}
            </p>
          </div>
          {recipe?.allergyWarning.hasRisk ?? (
            <p className="text-[13px] text-gray-500 font-medium leading-5">
              우리가족 버전으로 변경하면, 다른 식재료로 대체됩니다. 다만,
              원재료와는 맛이 다를 수 있습니다.
            </p>
          )}
        </div>
      </div>
      <div className="pb-5">
        <MenuInfo title="재료" sentences={recipe?.ingredients} />
      </div>
      <div className="pb-20">
        <MenuInfo title="레시피" recipes={recipe?.steps} />
      </div>
    </div>
  );
};

export default DetailContent;
