import { useEffect, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import { useNavigate, useParams } from "react-router-dom";
import UpButton from "../../components/common/UpButton";
import WishlistButton from "../../components/common/WishlistButton";
import { getDetailRecipe, postTransRecipe } from "../../api/recipes";
import type { DetailRecipe } from "../../types/recipes";
import { useFamilyStore } from "../../stores/use-family-store";
import usePostWishList from "../../hooks/mutations/use-post-wishlist";
import ImageIndicator from "../../components/home/detailPage/ImageIndicator";
import DetailContent from "../../components/home/detailPage/DetailContent";
import Rate from "../../components/common/Rate";
import {
  getWishlistKey,
  useMyWishlistIds,
} from "../../hooks/queries/use-my-wishlist-ids";
import { useMyProfileStore } from "../../stores/use-my-profile-store";
import useDeleteProfileWishLists from "../../hooks/mutations/use-delete-profile-wishlists";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

const removeLeadingNumber = (text: string) => {
  return text.replace(/^\d+[\.\)]\s*/, "");
};

const MenuInformationPage = () => {
  const { menuId } = useParams();
  const [recipe, setRecipe] = useState<DetailRecipe>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const recipeId = Number(menuId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailRecipe(recipeId);
        console.log("get 요청 성공: ", data);
        if (data.result.steps) {
          data.result.steps = data.result.steps.map((step) => ({
            ...step,
            description: removeLeadingNumber(step.description),
          })) as any;
        }
        setRecipe(data.result);
      } catch (error) {
        console.log("일반 레시피 로딩 실패: ", error);
      }
    };
    fetchData();
  }, [recipeId]);

  // 내 정보
  const roomId = useFamilyStore.getState().familyRoomId;
  const profileId = useMyProfileStore((state) => state.myProfileId);

  const { mutate: addWishList } = usePostWishList(roomId);
  const { mutate: deleteWishList } = useDeleteProfileWishLists(roomId);

  const isSafe = recipe?.allergyWarning.hasRisk ? false : true;

  // 위시리스트 포함여부 로직
  const { data: wishlistIds } = useMyWishlistIds(roomId, profileId);
  const wishKey = getWishlistKey("RECIPE", recipe?.recipeId);
  const isWishList = wishlistIds?.has(wishKey);

  const handleClick = async () => {
    const currentRecipeId = recipe?.recipeId;

    const directPayload = {
      recipeId: currentRecipeId ? [currentRecipeId] : [],
      transformedRecipeId: [],
    };

    if (isSafe && isWishList) {
      deleteWishList(directPayload);
    } else if (isSafe) {
      addWishList(directPayload);
    } else {
      setIsLoading(true); //로딩 시작
      try {
        const transData = await postTransRecipe(recipeId);
        navigate(
          `/menu-information/${transData.result.transformedRecipeId}?type=TRANSFORMED`,
        );
      } catch (error) {
        console.log("우리가족 버전 생성 실패", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <PublicHeader title={"메뉴 정보"} />
      {isLoading ? (
        <div className="flex flex-1 h-[calc(100vh-60px)] justify-center items-center">
          <LoadingSpinner text="AI가 사용자에 맞춰서 레시피를 생성하고 있어요" />
        </div>
      ) : (
        <>
          <ImageIndicator
            imgUrl={recipe?.images.small || recipe?.images.large}
            name={recipe?.title}
            wishCount={recipe?.wishCount}
          />

          <div className="px-4 pt-8 rounded-t-3xl -mt-10 relative z-10 bg-white">
            <div className="pb-20">
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
                <DetailContent recipe={recipe} />
              </div>
              <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-[375px] px-4 pb-3 z-50 bottom-0">
                <WishlistButton
                  onClick={handleClick}
                  isSafe={isSafe}
                  isWishList={isWishList}
                />
              </div>
              <UpButton />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuInformationPage;
