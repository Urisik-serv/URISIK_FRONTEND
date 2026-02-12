import type { DetailRecipe, TransformedRecipe } from "../../../types/recipes";
import IngredientAndRecipe from "../../common/IngredientAndRecipe";
import SafeMark from "../../common/SafeMark";

interface DetailContentProps {
  recipe?: DetailRecipe;
  transRecipe?: TransformedRecipe;
}
const DetailContent = ({ recipe, transRecipe }: DetailContentProps) => {
  const isTrans = !!transRecipe;
  if (!recipe && !transRecipe) {
    return <div className="p-10 text-center">로딩중...</div>;
  }
  return (
    <div>
      <div className="pb-6">
        {!isTrans && (
          <div className="flex gap-1 px-3 py-2.5 bg-gray-50 rounded-lg flex-col">
            <div className="flex flex-row gap-2">
              <p className="text-gray-800 text-[14px] font-medium leading-6">
                알레르기 위험도
              </p>
              <SafeMark isSafe={!recipe?.allergyWarning.hasRisk} />
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
          <IngredientAndRecipe
            step={transRecipe.steps}
            ingredients={transRecipe.ingredients}
            type="TRANS"
          />
        ) : (
          <IngredientAndRecipe
            step={recipe!.steps}
            ingredients={recipe!.ingredients}
          />
        )}
      </div>
    </div>
  );
};

export default DetailContent;
