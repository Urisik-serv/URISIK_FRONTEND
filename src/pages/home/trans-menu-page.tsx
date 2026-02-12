import { useEffect, useState } from "react";
import type { DetailRecipe, TransformedRecipe } from "../../types/recipes";
import { useParams } from "react-router-dom";
import PublicHeader from "../../components/header/PublicHeader";
import { getDetailRecipe, getTransRecipe } from "../../api/recipes";
import usePostWishList from "../../hooks/mutations/use-post-wishlist";
import { useFamilyStore } from "../../stores/use-family-store";
import ImageIndicator from "../../components/home/detailPage/ImageIndicator";
import DetailContent from "../../components/home/detailPage/DetailContent";
import WishlistButton from "../../components/common/WishlistButton";
import UpButton from "../../components/common/UpButton";
import Rate from "../../components/common/Rate";
import {
  getWishlistKey,
  useMyWishlistIds,
} from "../../hooks/queries/use-my-wishlist-ids";
import { useMyProfileStore } from "../../stores/use-my-profile-store";
import useDeleteProfileWishLists from "../../hooks/mutations/use-delete-profile-wishlists";
import Chevron from "../../components/common/icon/Chevron";

const removeLeadingNumber = (text: string) => {
  return text.replace(/^\d+[\.\)]\s*/, "");
};

const TransMenuPage = () => {
  const { menuId } = useParams();
  const recipeId = Number(menuId);
  const [transRecipe, setTransRecipe] = useState<TransformedRecipe>();
  const [recipe, setRecipe] = useState<DetailRecipe>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transData = await getTransRecipe(recipeId);
        if (transData.result.steps) {
          transData.result.steps = transData.result.steps.map((step) => ({
            ...step,
            description: removeLeadingNumber(step.description),
          })) as any;
        }
        setTransRecipe(transData.result);

        const data = await getDetailRecipe(transData.result.baseRecipeId);
        if (data.result.steps) {
          data.result.steps = data.result.steps.map((step) => ({
            ...step,
            description: removeLeadingNumber(step.description),
          })) as any;
        }
        setRecipe(data.result);
      } catch (error) {
        console.log("레시피 로딩 실패: ", error);
      }
    };
    fetchData();
  }, [recipeId]);

  // 내 정보, 내 roomId
  const roomId = useFamilyStore.getState().familyRoomId;
  const profileId = useMyProfileStore((state) => state.myProfileId);

  const { mutate: addWishList } = usePostWishList(roomId);
  const { mutate: deleteWishList } = useDeleteProfileWishLists(roomId);

  const [showOrigin, setShowOrigin] = useState(false);

  // 위시리스트 포함여부 로직
  const { data: wishlistIds } = useMyWishlistIds(roomId, profileId);
  const wishKey = getWishlistKey(
    "TRANSFORMED",
    transRecipe?.transformedRecipeId,
  );
  const isWishList = wishlistIds?.has(wishKey);

  const handleClick = async () => {
    const currentRecipeId = transRecipe?.transformedRecipeId;

    const directPayload = {
      recipeId: [],
      transformedRecipeId: currentRecipeId ? [currentRecipeId] : [],
    };
    if (isWishList) {
      deleteWishList(directPayload);
    } else {
      addWishList(directPayload);
    }
  };

  return (
    <div>
      <PublicHeader title={"메뉴 정보"} />
      <ImageIndicator
        imgUrl={recipe?.images.small || recipe?.images.large}
        name={recipe?.title}
        wishCount={recipe?.wishCount}
      />

      <div className="px-4 pt-8 rounded-t-3xl -mt-10 relative z-10 bg-white">
        <div>
          <div className="pb-20">
            <h1 className="text-2xl font-semibold pb-3 leading-9 text-gray-800">
              {transRecipe?.title}
            </h1>
            <div className="flex justify-start gap-2 pb-10">
              <p className="text-gray-400 text-base font-medium leading-6">
                {recipe?.category}
              </p>
              <Rate px={16} rate={transRecipe?.avgScore} />
            </div>
            <div
              className="flex flex-col"
              onClick={() => setShowOrigin(!showOrigin)}
            >
              <div className="flex pb-7">
                <p
                  className={`text-base font-semibold leading-6 ${showOrigin ? "text-gray-800" : "text-gray-500"}`}
                >
                  원형 메뉴 보기
                </p>
                {showOrigin ? <Chevron rotate={180} /> : <Chevron />}
              </div>
              {showOrigin && (
                <div className="pb-7">
                  <div className="p-3 rounded-lg outline-1 outline-gray-200">
                    <DetailContent recipe={recipe} />
                  </div>
                </div>
              )}
            </div>
            <DetailContent transRecipe={transRecipe} />
          </div>
          <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-[375px] px-4 pb-3 z-50 bottom-0">
            <WishlistButton
              onClick={handleClick}
              isSafe={true}
              isWishList={isWishList}
            />
          </div>
          <UpButton />
        </div>
      </div>
    </div>
  );
};
export default TransMenuPage;
