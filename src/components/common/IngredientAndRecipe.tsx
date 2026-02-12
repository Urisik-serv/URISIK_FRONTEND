import type { RecipeStep } from "../../types/meal-plan";
import type { DetailRecipeStep } from "../../types/recipes";

interface IngredientAndRecipeProps {
  ingredients: string[] | string;
  step: RecipeStep[] | DetailRecipeStep[];
  type?: "TRANS" | "ELSE";
}
const IngredientAndRecipe = ({
  ingredients,
  step,
  type = "ELSE",
}: IngredientAndRecipeProps) => {
  const stepData = step.map((step) => {
    if ("stepOrder" in step) {
      return {
        stepOrder: step.stepOrder,
        description: step.description,
        imageUrl: step.imageUrl,
      };
    } else {
      return {
        stepOrder: step.order,
        description: step.description,
        imageUrl: step.imageUrl,
      };
    }
  });

  return (
    <>
      <div className="flex flex-col gap-3 text-[14px] pb-6">
        <p className="font-medium text-gray-800 text-[16px]">재료</p>
        <p className="text-sm font-medium text-gray-600 leading-6">
          {Array.isArray(ingredients) ? ingredients.join(", ") : ingredients}
        </p>
      </div>
      <p className="font-medium text-gray-800 text-[16px] pb-4">레시피</p>
      <div className="flex flex-col gap-4">
        {stepData.map((step, idx) => (
          <div
            key={idx}
            className="h-full flex justify-between text-[14px] font-semibold gap-3"
          >
            <div>
              <div className="flex flex-col gap-[1px] pb-3">
                <p className="text-gray-350 font-medium">{step.stepOrder}</p>
                {/* <p className=" text-[20px] ">재료손질</p> */}
              </div>
              <p className="font-medium text-gray-600">
                {type === "TRANS"
                  ? step.description
                  : step.description.slice(3)}
              </p>
            </div>
            <img
              src={step.imageUrl}
              alt={`${step.stepOrder}단계 이미지`}
              className="w-36 h-26 shrink-0 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default IngredientAndRecipe;
