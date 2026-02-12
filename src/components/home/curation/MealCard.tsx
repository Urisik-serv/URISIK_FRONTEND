import { useNavigate } from "react-router-dom";
import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import Rate from "../../common/Rate";
import { postExternalRecipes } from "../../../api/recipes";
import type { SearchRecipesItem } from "../../../types/recipes";
import SafeMark from "../../common/SafeMark";
import HeartFull from "../../../assets/icons/heart-full.svg";
import HeartOutline from "../../../assets/icons/heart-outline.svg";
import {
  getWishlistKey,
  useMyWishlistIds,
  type WishReqType,
} from "../../../hooks/queries/use-my-wishlist-ids";
import { useFamilyStore } from "../../../stores/use-family-store";
import { useMyProfileStore } from "../../../stores/use-my-profile-store";
import useDeleteProfileWishLists from "../../../hooks/mutations/use-delete-profile-wishlists";
import usePostWishList from "../../../hooks/mutations/use-post-wishlist";

interface MealCardProps {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  rating: number;
  img: string;
  type: string;
  typeBool?: boolean;
  isSafe?: boolean;
  external: SearchRecipesItem["external"] | null;
}
const MealCard = ({
  id,
  title,
  shortDescription,
  category,
  rating,
  img,
  type,
  typeBool,
  isSafe,
  external,
}: MealCardProps) => {
  const navigate = useNavigate();

  if (typeBool !== undefined) {
    if (typeBool) type = "TRANSFORMED";
    else type = "RECIPE";
  }

  const numId = Number(id);
  const handleOpenInfo = async () => {
    if (type === "RECIPE") {
      navigate(`/menu-information/${numId}?type=RECIPE`);
    } else if (type === "TRANSFORMED") {
      navigate(`/menu-information/${numId}?type=TRANSFORMED`);
    } else {
      try {
        const response = await postExternalRecipes(external as any);
        const recipeId = response.result.recipeId;

        console.log("받아온 ID:", recipeId);
        console.log("전달한 external: ", JSON.stringify(external));
        navigate(`/menu-information/${recipeId}?type=RECIPE`);
      } catch (error) {
        console.error("외부 레시피 저장 실패:", error);
      }
    }
  };

  // 내 정보
  const roomId = useFamilyStore((state) => state.familyRoomId);
  const profileId = useMyProfileStore((state) => state.myProfileId);

  // mutation
  const { mutate: deleteWishList } = useDeleteProfileWishLists(roomId);
  const { mutate: addWishList } = usePostWishList(roomId);

  // 위시리스트 포함여부 로직
  const { data: wishlistIds } = useMyWishlistIds(roomId, profileId);
  const wishKey = getWishlistKey(type as WishReqType, numId);
  const isWishList = wishlistIds?.has(wishKey);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const directPayload = {
      recipeId: type === "RECIPE" ? [numId] : [],
      transformedRecipeId: type === "TRANSFORMED" ? [numId] : [],
    };
    if (isWishList) {
      deleteWishList(directPayload);
    } else {
      addWishList(directPayload);
    }
  };

  return (
    <div className="flex py-4 w-full gap-5">
      <div className="relative w-32 h-32 shrink-0 cursor-pointer">
        <img
          src={img ? img : SampleImg}
          alt="음식 사진"
          className="w-full h-full rounded-xl object-cover"
          onClick={handleOpenInfo}
        />

        <button
          onClick={handleClick}
          className="absolute top-2 right-2 w-6 h-6 flex justify-center items-center z-10"
        >
          <img
            src={isWishList ? HeartFull : HeartOutline}
            alt="찜하기"
            className="w-7 h-7 drop-shadow-md"
          />
        </button>
      </div>
      <div className="flex flex-col items-start gap-1.5 flex-1 min-w-0">
        <h2
          className="text-gray-800 text-base font-semibold leading-5 cursor-pointer truncate w-full"
          onClick={handleOpenInfo}
        >
          {title}
        </h2>
        <div
          className="flex justify-start items-center gap-2 cursor-pointer pb-2"
          onClick={handleOpenInfo}
        >
          <p className="text-neutral-400 text-[14px] font-medium leading-3">
            {category}
          </p>
          <Rate px={12} rate={rating} />
        </div>
        <SafeMark isSafe={isSafe} />
        <p
          className="text-gray-600 text-base font-normal cursor-pointer line-clamp-2 w-full leading-6"
          onClick={handleOpenInfo}
        >
          {shortDescription}
        </p>
      </div>
    </div>
  );
};

export default MealCard;
