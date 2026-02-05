import type { DetailRecipeStep } from "../../types/recipes";

interface MenuInfoProps {
  title: string;
  sentences?: string[];
  recipes?: DetailRecipeStep[];
}

const MenuInfo = ({ title, sentences = [], recipes = [] }: MenuInfoProps) => {
  const isIngredients = title === "재료";
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-base font-medium text-primary-700 leading-6">
        {title}
      </h1>
      {isIngredients ? (
        <p className="text-sm font-medium text-gray-800 leading-6">
          {sentences.join(", ")}
        </p>
      ) : (
        recipes.map((recipe) => (
          <p className="text-sm font-medium text-gray-800 leading-6">
            {recipe.description}
          </p>
        ))
      )}
    </div>
  );
};

export default MenuInfo;
