import type { DetailRecipe, TransformedRecipe } from "../../../types/recipes";
import MenuInfo from "../../common/MenuInfo";

interface DetailContentProps {
  recipe?: DetailRecipe;
  transRecipe?: TransformedRecipe;
}
const DetailContent = ({ recipe, transRecipe }: DetailContentProps) => {
  const isTrans = !!transRecipe;

  return (
    <div>
      <div className="pb-6">
        {!isTrans && (
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
            {recipe?.allergyWarning.hasRisk && (
              <p className="text-[13px] text-gray-500 font-medium leading-5">
                우리가족 버전으로 변경하면, 다른 식재료로 대체됩니다. 다만,
                원재료와는 맛이 다를 수 있습니다.
              </p>
            )}
          </div>
        )}
      </div>
      <div className="pb-12">
        {isTrans ? (
          <MenuInfo title="재료" sentences={transRecipe.ingredients} />
        ) : (
          <MenuInfo title="재료" sentences={recipe?.ingredients} />
        )}
      </div>
      <div>
        {isTrans ? (
          <MenuInfo title="레시피" recipes={transRecipe.steps} />
        ) : (
          <MenuInfo title="레시피" recipes={recipe?.steps} />
        )}
      </div>
    </div>
  );
};

export default DetailContent;
