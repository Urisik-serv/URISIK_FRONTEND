import { useNavigate } from "react-router-dom";
import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import Rate from "../../common/Rate";
import WishlistButton from "../../common/WishlistButton";
import { postExteralRecipes } from "../../../api/recipes";

interface MealCardProps {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  rating: number;
  isWishlisted: boolean;
  type: string;
  external: {} | null;
}
const MealCard = ({
  id,
  title,
  shortDescription,
  category,
  rating,
  isWishlisted,
  type,
  external,
}: MealCardProps) => {
  const navigate = useNavigate();
  const handleOpenInfo = async () => {
    if (type === "RECIPE") {
      const numId = Number(id);
      navigate(`/menu-information/${numId}`);
    } else {
      try {
        const response = await postExteralRecipes(external as any);
        const recipeId = response.result.recipeId;

        console.log("받아온 ID:", recipeId);
        console.log("전달한 external: ", JSON.stringify(external));

        if (recipeId) {
          navigate(`/menu-information/${recipeId}`);
        } else {
          console.error("Recipe ID가 없습니다.");
        }
      } catch (error) {
        console.error("외부 레시피 저장 실패:", error);
      }
    }
  };

  return (
    <div className="flex justify-between py-4 w-86">
      <img
        src={SampleImg}
        alt="음식 사진"
        className="w-32 h-32 rounded-xl object-cover cursor-pointer"
        onClick={handleOpenInfo}
      />
      <div className="flex flex-col items-start gap-1.5 w-49">
        <h2
          className="text-zinc-800 text-sm font-semibold leading-5 cursor-pointer"
          onClick={handleOpenInfo}
        >
          {title}
        </h2>
        <div
          className="flex justify-start items-center gap-2 cursor-pointer"
          onClick={handleOpenInfo}
        >
          <p className="text-neutral-400 text-xs font-medium leading-3">
            {category}
          </p>
          <Rate px={12} rate={rating} />
        </div>
        <p
          className="text-zinc-800 text-sm font-normal cursor-pointer"
          onClick={handleOpenInfo}
        >
          {shortDescription}
        </p>
        <WishlistButton isWishList={isWishlisted} />
      </div>
    </div>
  );
};

export default MealCard;
