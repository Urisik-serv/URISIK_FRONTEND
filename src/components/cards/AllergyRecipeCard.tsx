import SampleImg from "../../assets/sample/shrimp-mushroom.png";
import HeartFull from "../../assets/icons/heart-full.svg";
import { useNavigate } from "react-router-dom";
import type { SafeRecipe } from "../../types/recipes";

interface AllergyRecipeCardProps {
  recipe: SafeRecipe;
}
const AllergyRecipeCard = ({ recipe }: AllergyRecipeCardProps) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const numId = Number(recipe.id);
    if (recipe.transformed === false) {
      navigate(`/menu-information/${numId}?type=RECIPE`);
    } else {
      navigate(`/menu-information/${numId}?type=TRANSFORMED`);
    }
  };
  return (
    <div className="py-3 px-2.5 rounded-xl border-2 border-[#ECECEC]">
      <div className="flex justify-between items-center h-32">
        <div className="w-44 h-full flex flex-col justify-between">
          <div className="pb-4" onClick={handleClick}>
            <h1 className="text-zinc-800 text-[15px] font-semibold leading-6 pb-2 cursor-pointer">
              {recipe.title}
            </h1>
            <p className="text-neutral-500 text-xs font-medium leading-5 cursor-pointer line-clamp-2">
              {recipe.description}
            </p>
          </div>
          <div className="flex gap-0.5 items-center" onClick={handleClick}>
            <img src={HeartFull} alt="좋아요" className="h-3.5 w-3.5" />
            <p className="text-primary-500 text-xs font-semibold leading-4">
              {recipe.wishCount}가구가 선택했어요
            </p>
          </div>
        </div>
        <img
          src={recipe.imageUrl || SampleImg}
          alt="음식 이미지"
          className="w-32 h-32 rounded-lg object-cover cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default AllergyRecipeCard;
