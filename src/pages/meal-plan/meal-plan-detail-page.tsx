import { useSearchParams } from "react-router-dom";
import PublicHeader from "../../components/header/PublicHeader";
import { useEffect, useState } from "react";
import { getDetailRecipe, getTransRecipe } from "../../api/recipes";
import IngredientAndRecipe from "../../components/common/IngredientAndRecipe";
import type { RecipeStep } from "../../types/meal-plan";
import type { DetailRecipeStep } from "../../types/recipes";

const MealPlanDetailPage = () => {
  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("menuId");
  const type = searchParams.get("type");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [step, setStep] = useState<RecipeStep[] | DetailRecipeStep[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "RECIPE") {
          const data = await getDetailRecipe(Number(recipeId));
          setIngredients(data.result.ingredients);
          setStep(data.result.steps);
        } else {
          const data = await getTransRecipe(Number(recipeId));
          setIngredients(data.result.ingredients);
          setStep(data.result.steps);
        }
      } catch (error) {
        console.log("레시피 로딩 실패: ", error);
      }
    };
    fetchData();
  }, [recipeId, type]);

  const recipeType = type === "RECIPE" ? "ELSE" : "TRANS";

  return (
    <div>
      <PublicHeader title={"레시피"} />
      <div className="p-4 pt-2">
        <IngredientAndRecipe
          ingredients={ingredients}
          step={step}
          type={recipeType}
        />
      </div>
    </div>
  );
};

export default MealPlanDetailPage;
